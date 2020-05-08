export const displayPrice = (price) => {
  return parseFloat(price).toFixed(2)
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
      groupQuantity += o.quantity
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
