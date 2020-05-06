export const displayPrice = (price) => {
  return parseFloat(price).toFixed(2)
}

const makeOrderItemGroups = (optionGroups, isEdit) => {
  const groups = optionGroups.map((g) => {
    const options = g.option_items.map((o) => {
      const quantity = o.opt_is_default && !isEdit ? 1 : 0
      const option = {
        id: o.id,
        name: o.name,
        description: o.description,
        imageUrl: o.small_image_url,
        allergens: o.allergens,
        tags: o.tags,
        price: parseFloat(o.price),
        quantity: quantity,
        isDefault: o.opt_is_default,
        increment: o.increment,
        maxQuantity: o.max_quantity,
        minQuantity: o.min_quantity,
      }
      return option
    })
    const group = {
      id: g.id,
      name: g.name,
      description: g.description,
      imageUrl: g.small_image_url,
      max: g.max_options,
      min: g.min_options,
      inc: g.included_options,
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
      const includedRemaining = Math.max(g.inc - groupQuantity, 0)
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
    groups: groups,
    quantity: item.min_quantity || 1 * item.increment,
    price: parseFloat(item.price),
    increment: item.increment,
    maxQuantity: item.max_quantity,
    minQuantity: item.min_quantity,
  }
  const pricedItem = calcPrices(orderItem)
  return pricedItem
}
