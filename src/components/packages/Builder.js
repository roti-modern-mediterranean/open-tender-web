import React, { useState } from 'react'
import propTypes from 'prop-types'
import { RadioButtonGroup, Quantity } from './BuilderInputs'

const displayPrice = (price) => {
  return parseFloat(price).toFixed(2)
}

export const Option = ({
  group,
  option,
  adjust,
  increment,
  decrement,
  classes = '',
}) => {
  const groupAtMax = group.max !== 0 && group.quantity === group.max
  const optionAtMax = option.max !== 0 && option.quantity === option.max
  const incrementDisabled = groupAtMax || optionAtMax
  const groupAtMin = group.min !== 0 && group.quantity === group.min
  const optionAtMin = option.min !== 0 && option.quantity === option.min
  const decrementDisabled = groupAtMin || optionAtMin || option.quantity === 0
  return (
    <li>
      <span className="modal__option">
        <span className="modal__option__name">{option.name}</span>
        <span className="modal__option__price">
          ${displayPrice(option.price)}
        </span>
        <span className="modal__option__quantity">
          <Quantity
            item={option}
            adjust={adjust}
            increment={increment}
            decrement={decrement}
            incrementDisabled={incrementDisabled}
            decrementDisabled={decrementDisabled}
            classes={classes}
          />
        </span>
        <span className="modal__option__price">
          ${displayPrice(option.totalPrice)}
        </span>
      </span>
    </li>
  )
}

Option.displayName = 'Option'
Option.propTypes = {
  group: propTypes.object,
  option: propTypes.object,
  adjust: propTypes.func,
  increment: propTypes.func,
  decrement: propTypes.func,
  size: propTypes.number,
  classes: propTypes.string,
}

const GroupWarning = ({ quantity, min, max }) => {
  const isRadio = min === 1 && max === 1
  if (quantity < min) {
    return <span className="modal__group__warning -min">Below Minimum</span>
  } else if (quantity === max && max !== 0 && !isRadio) {
    return <span className="modal__group__warning -max">At Maximum</span>
  } else {
    return null
  }
}

GroupWarning.displayName = 'GroupWarning'
GroupWarning.propTypes = {
  group: propTypes.object,
}

const makeOrderItemGroups = (optionGroups, isEdit) => {
  const groups = optionGroups.map((g) => {
    const options = g.option_items.map((o) => {
      const quantity = o.opt_is_default && !isEdit ? 1 : 0
      const option = {
        id: o.id,
        name: o.name,
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
      max: g.max_options,
      min: g.min_options,
      inc: g.included_options,
      options: options,
    }
    return group
  })
  return groups
}

const calcPrices = (item) => {
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

const makeOrderItem = (item, isEdit) => {
  const groups = makeOrderItemGroups(item.option_groups, isEdit)
  const orderItem = {
    id: item.id,
    name: item.name,
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

const Builder = ({ menuItem, addItemToCart, renderOption }) => {
  const orderItem = menuItem.index ? menuItem : makeOrderItem(menuItem)
  const [item, setItem] = useState(orderItem)

  const increment = () => {
    const newQuantity = item.maxQuantity
      ? Math.min(item.quantity + item.increment, item.maxQuantity)
      : item.quantity + item.increment
    setItem(calcPrices({ ...item, quantity: newQuantity }))
  }

  const decrement = () => {
    const newQuantity = Math.max(
      item.quantity - item.increment,
      item.minQuantity
    )
    setItem(calcPrices({ ...item, quantity: newQuantity }))
  }

  const adjust = (quantity) => {
    setItem(calcPrices({ ...item, quantity: quantity }))
  }

  const setMadeFor = (madeFor) => {
    setItem({ ...item, madeFor })
  }

  const setNotes = (notes) => {
    setItem({ ...item, notes })
  }

  const toggleOption = (groupId, optionId) => {
    const groups = item.groups.map((group) => {
      if (group.id === groupId) {
        group.options.map((option) => {
          option.quantity = option.id === optionId ? 1 : 0
          return option
        })
      }
      return group
    })
    setItem(calcPrices({ ...item, groups: groups }))
  }

  const incrementOption = (groupId, optionId) => {
    const groups = item.groups.map((group) => {
      if (group.id === groupId) {
        const count = group.options
          .filter((o) => o.id !== optionId)
          .reduce((t, o) => t + o.quantity, 0)
        if (group.max !== 0 && count >= group.max) return group
        group.options.map((option) => {
          if (option.id === optionId) {
            const quantity = option.quantity + option.increment
            const quantities = [quantity]
            if (option.maxQuantity !== 0) quantities.push(option.maxQuantity)
            if (group.max !== 0) quantities.push(group.max - count)
            option.quantity = Math.min(...quantities)
          }
          return option
        })
      }
      return group
    })
    setItem(calcPrices({ ...item, groups: groups }))
  }

  const decrementOption = (groupId, optionId) => {
    const groups = item.groups.map((group) => {
      if (group.id === groupId) {
        group.options.map((option) => {
          if (option.id === optionId) {
            option.quantity = Math.max(option.quantity - option.increment, 0)
          }
          return option
        })
      }
      return group
    })
    setItem(calcPrices({ ...item, groups: groups }))
  }

  const adjustOption = (groupId, optionId, quantity) => {
    const groups = item.groups.map((group) => {
      if (group.id === groupId) {
        const count = group.options
          .filter((o) => o.id !== optionId)
          .reduce((t, o) => t + o.quantity, 0)
        if (group.max !== 0 && count >= group.max) return group
        group.options.map((option) => {
          if (option.id === optionId) {
            if (quantity === '') {
              option.quantity = ''
            } else {
              const quantities = [quantity]
              if (option.maxQuantity !== 0) quantities.push(option.maxQuantity)
              if (group.max !== 0) quantities.push(group.max - count)
              option.quantity = Math.min(...quantities)
            }
          }
          return option
        })
      }
      return group
    })
    setItem(calcPrices({ ...item, groups: groups }))
  }

  const handleSubmit = (evt) => {
    evt.preventDefault()
    addItemToCart(item)
    evt.target.blur()
  }

  const { price, totalPrice, groups, notes, madeFor } = item
  const isIncomplete = groups.filter((g) => g.quantity < g.min).length > 0
  return (
    <div className="modal__item">
      <form className="modal__groups">
        {groups.map((group) => (
          <div key={group.id} className="modal__group">
            <div className="modal__group__header">
              <h3 className="modal__group__name">{group.name}</h3>
              <p className="modal__group__settings font-size-small">
                <GroupWarning {...group} />
                <span>
                  {group.min} min, {group.max} max, {group.inc} included
                </span>
              </p>
            </div>
            <div className="modal__options">
              {group.min === 1 && group.max === 1 ? (
                <RadioButtonGroup group={group} handler={toggleOption} />
              ) : (
                <ul>
                  {group.options.map((option) => {
                    const optionProps = {
                      key: `${group.id}-${option.id}`,
                      group,
                      option,
                      adjust: (quantity) =>
                        adjustOption(group.id, option.id, quantity),
                      increment: () => incrementOption(group.id, option.id),
                      decrement: () => decrementOption(group.id, option.id),
                    }
                    return renderOption(optionProps)
                  })}
                  {/* {group.options.map((option) => (
                    <Option
                      key={`${group.id}-${option.id}`}
                      group={group}
                      option={option}
                      adjust={adjustOption}
                      increment={incrementOption}
                      decrement={decrementOption}
                    />
                  ))} */}
                </ul>
              )}
            </div>
          </div>
        ))}
        <div className="modal__quantity">
          <div className="modal__option">
            <div className="modal__option__name">Item Quantity</div>
            <div className="modal__option__price">${displayPrice(price)}</div>
            <div className="modal__option__quantity">
              <Quantity
                item={item}
                adjust={adjust}
                increment={increment}
                decrement={decrement}
              />
            </div>
            <div className="modal__option__price">
              ${displayPrice(totalPrice)}
            </div>
          </div>
        </div>
        <div className="modal__notes">
          <label htmlFor="item-notes" className="label">
            <span>Notes</span>
            <textarea
              id="item-notes"
              value={notes || ''}
              onChange={(evt) => setNotes(evt.target.value)}
            />
          </label>
        </div>
        <div className="modal__submit">
          <div className="modal__made-for">
            <label htmlFor="made-for" className="label">
              <span>Made For</span>
              <input
                id="made-for"
                type="text"
                value={madeFor || ''}
                onChange={(evt) => setMadeFor(evt.target.value)}
              />
            </label>
          </div>
          <button
            className="btn"
            onClick={handleSubmit}
            disabled={isIncomplete}
          >
            Add To Cart
          </button>
        </div>
      </form>
    </div>
  )
}

Builder.displayName = 'Builder'
Builder.propTypes = {
  menuItem: propTypes.object,
  addToCart: propTypes.func,
}

export default Builder
