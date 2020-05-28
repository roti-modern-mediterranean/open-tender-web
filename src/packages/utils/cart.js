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

/* cart validation */

// convert menu items to order items for validation but only include
// items that are already in the cart to save wasted effort
const makeItemLookup = (categories, itemIds) => {
  let itemLookup = {}
  categories.forEach((category) => {
    category.items.forEach((item) => {
      if (itemIds.includes(item.id)) {
        itemLookup[item.id] = makeOrderItem(item, true)
      }
    })
    category.children.forEach((child) => {
      child.items.forEach((item) => {
        if (itemIds.includes(item.id)) {
          itemLookup[item.id] = makeOrderItem(item, true)
        }
      })
    })
  })
  return itemLookup
}

const makeGroupsLookup = (item) => {
  return item.groups.reduce((grpObj, i) => {
    grpObj[i.id] = i.options.reduce((optObj, o) => {
      optObj[o.id] = o
      return optObj
    }, {})
    return grpObj
  }, {})
}

export const validateCart = (cart, categories, soldOut) => {
  const itemIds = cart.map((item) => item.id)
  const itemLookup = makeItemLookup(categories, itemIds)
  // console.log('itemLookup', itemLookup)
  let errors = null,
    missingItems = [],
    invalidItems = []
  let newCart = cart.map((oldItem) => {
    const newItem = itemLookup[oldItem.id]
    if (!newItem || soldOut.includes(oldItem.id)) {
      missingItems.push(oldItem)
      return null
    }
    let invalidGroups = [],
      requiredGroups = [],
      missingOptions = [],
      invalidOptions = []
    const oldGroupsLookup = makeGroupsLookup(oldItem)
    newItem.groups.map((group) => {
      const oldOptions = oldGroupsLookup[group.id]
      if (!oldOptions) {
        // if the existing item doesn't have any options in this option group but the
        // group is required (due to having a non-zero minumum), this item is invalid
        if (group.min > 0) requiredGroups.push(group)
      } else {
        group.options.map((option) => {
          const oldOption = oldOptions[option.id]
          option.quantity = oldOption ? oldOption.quantity : 0
          // check to see if option quantity is valid relative to option min & max
          // ignore the option increment setting for the time being
          if (
            (option.max && option.quantity > option.max) ||
            (option.min && option.quantity < option.min)
          ) {
            console.log(
              option.name,
              option.quantity,
              option.min,
              option.max,
              option.quantity > option.max,
              option.quantity < option.mi
            )
            invalidOptions.push(option)
          }
          return option
        })
        const optionCount = group.options.reduce((t, i) => (t += i.quantity), 0)
        // check to see if the option group has a max and the option count exceeds this
        if (group.max > 0 && optionCount > group.max) invalidGroups.push(group)
        const newOptionIds = group.options.map((i) => i.id.toString())
        // check to see if any OLD options aren't avaiilable on the current menu
        // or if any of the options are currently sold out
        missingOptions = Object.keys(oldOptions).filter(
          (id) => !newOptionIds.includes(id) || soldOut.includes(id)
        )
      }
      return group
    })
    if (
      requiredGroups.length ||
      invalidGroups.length ||
      missingOptions.length ||
      invalidOptions.length
    ) {
      const invalidItem = {
        ...oldItem,
        requiredGroups,
        invalidGroups,
        missingOptions,
        invalidOptions,
      }
      invalidItems.push(invalidItem)
      return null
    } else {
      newItem.quantity = oldItem.quantity
      // check to see if this item's quantity is below the min or
      // above the max from the current menu
      if (
        (newItem.max && newItem.quantity > newItem.max) ||
        (newItem.min && newItem.quantity < newItem.min)
      ) {
        invalidItems.append(newItem)
        return null
      }
      const pricedItem = calcPrices(newItem)
      pricedItem.notes = oldItem.notes
      pricedItem.madeFor = oldItem.made_for
      return pricedItem
    }
  })
  newCart = newCart.filter((i) => i !== null)
  if (missingItems.length || invalidItems.length) {
    errors = { missingItems, invalidItems }
  }
  return { newCart, errors }
}

export const printCart = (cart) => {
  cart.forEach((item) => {
    console.log(item.name, item.price, item.quantity, item.totalPrice)
    item.groups.forEach((group) => {
      console.log('  ', group.name)
      group.options.forEach((option) => {
        if (option.quantity > 0) {
          console.log(
            '    ',
            option.name,
            option.price,
            option.quantity,
            option.totalPrice
          )
        }
      })
    })
  })
}

/* order submission */

export const prepareOrder = (data) => {
  data = data || {}
  const requestedIso =
    !data.requestedAt || data.requestedAt === 'asap'
      ? new Date().toISOString()
      : data.requestedAt
  const order = {
    location_id: data.locationId || null,
    service_type: data.serviceType || 'PICKUP',
    requested_at: requestedIso,
    cart: data.cart ? makeSimpleCart(data.cart) : [],
  }
  if (data.customer) order.customer = data.customer
  // if (data.details) order.details = data.details
  if (data.details) {
    const details = { ...data.details }
    // person_count must be submitted as integer
    if (details.person_count)
      details.person_count = parseInt(details.person_count)
    order.details = { ...details }
  }
  if (data.discounts) order.discounts = data.discounts
  if (data.promoCodes) order.promo_codes = data.promoCodes
  if (data.tip) order.tip = data.tip
  if (data.tenders) order.tenders = data.tenders
  if (data.address) order.address = data.address
  return order
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
