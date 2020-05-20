import { cardNumbersRegex } from './constants'

export const getCardType = (cardNumber) => {
  const number = cardNumber
  let re
  for (const [card, pattern] of Object.entries(cardNumbersRegex)) {
    re = new RegExp(pattern)
    if (number.match(re) !== null) {
      return card
    }
  }
  return 'OTHER' // default type
}

export const displayPrice = (price) => {
  return parseFloat(price).toFixed(2)
}

export const addCommas = (x, d) => {
  return x.toFixed(d).replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

export const formatQuantity = (n) => {
  return addCommas(parseFloat(n), 0)
}

export const formatDollars = (str, space = '') => {
  const floatPrice = parseFloat(str)
  return floatPrice < 0
    ? `($${addCommas(Math.abs(floatPrice), 2)})`
    : `$${addCommas(floatPrice, 2)}${space}`
}

const getItemOptions = (item) => {
  return item.groups
    .map((group) => group.options.filter((option) => option.quantity > 0))
    .flat()
}

export const makeModifierNames = (item) => {
  return getItemOptions(item)
    .map((option) => option.name)
    .join(', ')
}

const makeOrderItemGroups = (optionGroups, isEdit) => {
  if (!optionGroups) return []
  const groups = optionGroups.map((g) => {
    const options = g.option_items.map((o) => {
      const quantity = o.opt_is_default && !isEdit ? o.min_quantity || 1 : 0
      const option = {
        id: o.id,
        name: o.name,
        description: o.description,
        imageUrl: o.small_image_url,
        allergens: o.allergens,
        tags: o.tags,
        nutritionalInfo: o.nutritional_info,
        cals: o.nutritional_info ? o.nutritional_info.calories || null : null,
        price: parseFloat(o.price),
        quantity: quantity,
        isDefault: o.opt_is_default,
        increment: o.increment,
        max: o.max_quantity,
        min: o.min_quantity,
      }
      return option
    })
    const group = {
      id: g.id,
      name: g.name,
      description: g.description,
      imageUrl: g.small_image_url,
      included: g.included_options,
      max: g.max_options,
      min: g.min_options,
      options: options,
    }
    return group
  })
  return groups
}

export const calcPrices = (item) => {
  const groups = item.groups.map((g) => {
    let groupQuantity = 0
    const options = g.options.map((o) => {
      const includedRemaining = Math.max(g.included - groupQuantity, 0)
      const priceQuantity = Math.max(o.quantity - includedRemaining, 0)
      const option = { ...o, totalPrice: priceQuantity * o.price }
      groupQuantity += o.quantity || 0
      return option
    })
    return { ...g, quantity: groupQuantity, options }
  })
  const optionsPrice = groups.reduce((t, g) => {
    return t + g.options.reduce((ot, o) => ot + o.totalPrice, 0.0)
  }, 0.0)
  const totalPrice = item.quantity * (item.price + optionsPrice)
  return { ...item, totalPrice: totalPrice, groups: groups }
}

export const makeOrderItem = (item, isEdit) => {
  const groups = makeOrderItemGroups(item.option_groups, isEdit)
  const orderItem = {
    id: item.id,
    name: item.name,
    description: item.description,
    imageUrl: item.large_image_url,
    allergens: item.allergens,
    tags: item.tags,
    nutritionalInfo: item.nutritional_info,
    cals: item.nutritional_info ? item.nutritional_info.calories || null : null,
    groups: groups,
    quantity: item.min_quantity || 1 * item.increment,
    price: parseFloat(item.price),
    increment: item.increment,
    max: item.max_quantity,
    min: item.min_quantity,
  }
  const pricedItem = calcPrices(orderItem)
  return pricedItem
}

export const calcCartCounts = (cart) => {
  return cart.reduce((obj, item) => {
    const newCount = (obj[item.id] || 0) + item.quantity
    return { ...obj, [item.id]: newCount }
  }, {})
}

export const addItem = (cart, item) => {
  if (typeof item.index === 'undefined') {
    cart.push({ ...item, index: cart.length })
  } else {
    cart[item.index] = item
  }
  const cartCounts = calcCartCounts(cart)
  return { cart, cartCounts }
}

export const removeItem = (cart, index) => {
  cart.splice(index, 1)
  cart = cart.map((i, index) => ({ ...i, index: index }))
  const cartCounts = calcCartCounts(cart)
  return { cart, cartCounts }
}

export const incrementItem = (cart, index) => {
  const item = cart[index]
  if (item.max === 0 || item.quantity < item.max) {
    let newQuantity = item.quantity + item.increment
    newQuantity = item.max === 0 ? newQuantity : Math.min(item.max, newQuantity)
    const newItem = calcPrices({ ...item, quantity: newQuantity })
    cart[index] = newItem
  }
  const cartCounts = calcCartCounts(cart)
  return { cart, cartCounts }
}

export const decrementItem = (cart, index) => {
  const item = cart[index]
  const newQuantity = Math.max(item.quantity - item.increment, 0)
  if (newQuantity === 0) {
    cart.splice(index, 1)
    cart = cart.map((i, index) => ({ ...i, index: index }))
  } else {
    const newItem = calcPrices({ ...item, quantity: newQuantity })
    cart[index] = newItem
  }
  const cartCounts = calcCartCounts(cart)
  return { cart, cartCounts }
}

const makeSimpleCart = (cart) => {
  const simpleCart = cart.map((i) => {
    const groups = i.groups.map((g) => {
      const options = g.options
        .filter((o) => o.quantity !== 0)
        .map((o) => ({ id: o.id, quantity: o.quantity }))
      return { id: g.id, options: options }
    })
    return {
      id: i.id,
      quantity: i.quantity,
      groups: groups,
      made_for: i.madeFor || '',
      notes: i.notes || '',
    }
  })
  return simpleCart
}

export const prepareOrder = (
  locationId,
  serviceType,
  requestedAt,
  cart,
  customer = {},
  discounts = [],
  promoCodes = [],
  address = null,
  isValidate = true
) => {
  const requestedIso =
    requestedAt === 'asap' ? new Date().toISOString() : requestedAt
  const data = {
    validate: isValidate,
    save: false,
    device_type: 'desktop', // TODO: need to enable device detection
    location_id: locationId,
    service_type: serviceType.toLowerCase(),
    requested_at: requestedIso,
    cart: makeSimpleCart(cart),
    address: address,
    customer: customer,
    discounts: discounts,
    promo_codes: promoCodes,
  }
  return data
}

export const handleOrderErrors = (errors, isValidate = true) => {
  return Object.entries(errors).reduce((obj, error) => {
    const [key, value] = error
    let [, entity, field] = key.split('.')
    field = field || entity
    const newErrors = obj[entity]
      ? { ...obj[entity], [field]: value.detail }
      : { [field]: value.detail }
    return { ...obj, [entity]: newErrors }
  }, {})
}

export const checkAmountRemaining = (total, tenders) => {
  const remaining =
    parseFloat(total) -
    tenders.reduce((t, i) => (t += parseFloat(i.amount)), 0.0)
  return remaining === -0.0 ? 0.0 : remaining
}

const chunks = [
  [0, 4],
  [4, 8],
  [8, 12],
  [12, 16],
]

const amexChunks = [
  [0, 4],
  [4, 10],
  [10, 15],
]

export const makeAcctNumber = (str, cardType) => {
  str = str.match(/\d+/g) // limit to numerical input, returns an array
  if (!str) return ''
  str = str.join('').replace(/\s/g, '')
  if (cardType === 'AMEX') {
    return amexChunks
      .map(([start, end]) => str.slice(start, end))
      .filter((i) => i.length)
      .join(' ')
      .slice(0, 18)
  } else {
    return chunks
      .map(([start, end]) => str.slice(start, end))
      .filter((i) => i.length)
      .join(' ')
      .slice(0, 19)
  }
}
