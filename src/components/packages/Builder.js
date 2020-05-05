import React, { useState } from 'react'
import propTypes from 'prop-types'
import { Plus, Minus } from 'react-feather'
import { RadioButtonGroup, QuantityInput } from './BuilderInputs'

const Quantity = ({
  name,
  id,
  quantity,
  adjust,
  increment,
  decrement,
  size = null,
  classes = '',
  incrementDisabled = false,
}) => {
  return (
    <div className={`quantity ${classes}`}>
      <button
        className="btn"
        id={`decrease-${id}`}
        onClick={decrement}
        disabled={quantity === 0}
      >
        <Minus size={size} />
      </button>
      <QuantityInput
        name={name}
        id={`quantity-${id}`}
        value={quantity}
        handler={adjust}
      />
      <button
        className="btn"
        id={`increase-${id}`}
        onClick={increment}
        disabled={incrementDisabled}
      >
        <Plus size={size} />
      </button>
    </div>
  )
}

const displayPrice = (price) => {
  return parseFloat(price).toFixed(2)
}

Quantity.displayName = 'Quantity'
Quantity.propTypes = {
  name: propTypes.string,
  id: propTypes.oneOfType([propTypes.number, propTypes.string]),
  classes: propTypes.string,
  quantity: propTypes.oneOfType([propTypes.number, propTypes.string]),
  adjust: propTypes.func,
  increment: propTypes.func,
  decrement: propTypes.func,
  size: propTypes.number,
  incrementDisabled: propTypes.bool,
}

const Option = ({
  group,
  option,
  adjust,
  increment,
  decrement,
  size = null,
  classes = '',
}) => {
  const name = `${option.name} quantity in ${group.name} group`
  const isMaxedOut = group.max !== 0 && group.quantity === group.max
  return (
    <li key={option.id}>
      <span className="modal__option">
        <span className="modal__option__name">{option.name}</span>
        <span className="modal__option__price">
          ${displayPrice(option.price)}
        </span>
        <span className="modal__option__quantity">
          <Quantity
            name={name}
            id={`${group.id}-${option.id}`}
            quantity={option.quantity}
            adjust={adjust}
            increment={increment}
            decrement={decrement}
            size={size}
            classes={classes}
            incrementDisabled={isMaxedOut}
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

const Builder = ({ menuItem, addToCart }) => {
  const [item, setItem] = useState(makeOrderItem(menuItem))
  const props = {}

  const handleIncrement = (evt) => {
    evt.preventDefault()
    const newQuantity = item.maxQuantity
      ? Math.min(item.quantity + item.increment, item.maxQuantity)
      : item.quantity + item.increment
    const orderItem = { ...item, quantity: newQuantity }
    const pricedItem = calcPrices(orderItem)
    setItem(pricedItem)
    evt.target.blur()
  }

  const handleDecrement = (evt) => {
    evt.preventDefault()
    const newQuantity = Math.max(
      item.quantity - item.increment,
      item.minQuantity
    )
    const orderItem = { ...item, quantity: newQuantity }
    const pricedItem = calcPrices(orderItem)
    setItem(pricedItem)
    evt.target.blur()
  }

  const handleAdjust = (evt) => {
    const value = parseInt(evt.target.value)
    const quantity = isNaN(value) || value < 1 ? '' : value
    const orderItem = { ...item, quantity: quantity }
    const pricedItem = calcPrices(orderItem)
    setItem(pricedItem)
  }

  const handleMadeFor = (evt) => {
    setItem({ ...item, madeFor: evt.target.value })
  }

  const handleNotes = (evt) => {
    setItem({ ...item, notes: evt.target.value })
  }

  const handleRadio = (evt) => {
    const groupId = parseInt(evt.target.name)
    const optionId = parseInt(evt.target.value)
    const groups = item.groups.map((group) => {
      if (group.id === groupId) {
        group.options.map((option) => {
          option.quantity = option.id === optionId ? 1 : 0
          return option
        })
      }
      return group
    })
    const orderItem = { ...item, groups: groups }
    const pricedItem = calcPrices(orderItem)
    setItem(pricedItem)
  }

  const handleIncrementOption = (evt) => {
    evt.preventDefault()
    const [, groupId, optionId] = evt.target.id
      .split('-')
      .map((i) => parseInt(i))
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
    const orderItem = { ...item, groups: groups }
    const pricedItem = calcPrices(orderItem)
    setItem(pricedItem)
    evt.target.blur()
  }

  const handleDecrementOption = (evt) => {
    evt.preventDefault()
    const [, groupId, optionId] = evt.target.id
      .split('-')
      .map((i) => parseInt(i))
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
    const orderItem = { ...item, groups: groups }
    const pricedItem = calcPrices(orderItem)
    setItem(pricedItem)
    evt.target.blur()
  }

  const handleAdjustOption = (evt) => {
    const [, groupId, optionId] = evt.target.id
      .split('-')
      .map((i) => parseInt(i))
    const value = parseInt(evt.target.value)
    const quantity = isNaN(value) ? '' : value
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
    const orderItem = { ...item, groups: groups }
    const pricedItem = calcPrices(orderItem)
    setItem(pricedItem)
  }

  const handleSubmit = (evt) => {
    evt.preventDefault()
    props.addItemToCart()
    evt.target.blur()
  }

  const { id, name, price, quantity, totalPrice, groups, notes, madeFor } = item
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
                <RadioButtonGroup
                  id={group.id}
                  options={group.options}
                  handler={handleRadio}
                />
              ) : (
                <ul>
                  {group.options.map((option) => (
                    <Option
                      key={`${group.id}-${option.id}`}
                      group={group}
                      option={option}
                      adjust={handleAdjustOption}
                      increment={handleIncrementOption}
                      decrement={handleDecrementOption}
                    />
                  ))}
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
                name={`${name} quantity`}
                id={id}
                quantity={quantity}
                adjust={handleAdjust}
                increment={handleIncrement}
                decrement={handleDecrement}
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
              onChange={handleNotes}
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
                onChange={handleMadeFor}
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
