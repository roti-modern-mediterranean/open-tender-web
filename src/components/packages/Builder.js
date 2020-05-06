import React, { useState } from 'react'
import propTypes from 'prop-types'
import { displayPrice, makeOrderItem, calcPrices } from './utils'
import BuilderGroupHeader from './BuilderGroupHeader'
import BuilderRadioGroup from './BuilderRadioGroup'
import BuilderQuantity from './BuilderQuantity'

const useBuilder = (menuItem) => {
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

  const setQuantity = (quantity) => {
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

  const setOptionQuantity = (groupId, optionId, quantity) => {
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

  return {
    item,
    increment,
    decrement,
    setQuantity,
    setMadeFor,
    setNotes,
    toggleOption,
    incrementOption,
    decrementOption,
    setOptionQuantity,
  }
}

const Builder = ({ menuItem, addItemToCart, renderOption }) => {
  const {
    item,
    increment,
    decrement,
    setQuantity,
    setMadeFor,
    setNotes,
    toggleOption,
    incrementOption,
    decrementOption,
    setOptionQuantity,
  } = useBuilder(menuItem)

  const handleSubmit = (evt) => {
    evt.preventDefault()
    addItemToCart(item)
    evt.target.blur()
  }

  const { groups, notes, madeFor, totalPrice } = item
  const isIncomplete = groups.filter((g) => g.quantity < g.min).length > 0
  const bgStyle = item.imageUrl
    ? { backgroundImage: `url(${item.imageUrl}` }
    : null
  return (
    <form className="builder__item">
      <div className="builder__content">
        {bgStyle && (
          <div
            className="builder__image bg-image bg-secondary-color"
            style={bgStyle}
          >
            &nbsp;
          </div>
        )}
        <div className="builder__header bg-color">
          <h2 className="ot-font-size-h3">{item.name}</h2>
          {item.description && <p>{item.description}</p>}
        </div>
        <div className="builder__body bg-secondary-color">
          <div className="builder__groups">
            {groups.map((group) => (
              <div key={group.id} className="builder__group">
                <BuilderGroupHeader group={group} />
                <div className="builder__options bg-color border-radius">
                  {group.min === 1 && group.max === 1 ? (
                    <BuilderRadioGroup group={group} handler={toggleOption} />
                  ) : (
                    <ul>
                      {group.options.map((option) => {
                        const optionProps = {
                          key: `${group.id}-${option.id}`,
                          group,
                          option,
                          adjust: (quantity) =>
                            setOptionQuantity(group.id, option.id, quantity),
                          increment: () => incrementOption(group.id, option.id),
                          decrement: () => decrementOption(group.id, option.id),
                        }
                        return renderOption(optionProps)
                      })}
                      {/* {group.options.map((option) => (
                    <BuilderOption
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
          </div>
          <div className="builder__made-for bg-color border-radius">
            <label htmlFor="made-for" className="label">
              <span className="ot-font-size-h6 heading">Made For</span>
              <input
                id="made-for"
                type="text"
                value={madeFor || ''}
                onChange={(evt) => setMadeFor(evt.target.value)}
              />
            </label>
          </div>
          <div className="builder__notes bg-color border-radius">
            <label htmlFor="item-notes" className="label">
              <span className="ot-font-size-h6 heading">Notes</span>
              <textarea
                id="item-notes"
                value={notes || ''}
                onChange={(evt) => setNotes(evt.target.value)}
              />
            </label>
          </div>
        </div>
      </div>
      <div className="builder__footer bg-color">
        <div className="builder__price heading ot-font-size-h3">
          ${displayPrice(totalPrice)}
        </div>
        <div className="builder__actions">
          <div className="builder__quantity">
            <BuilderQuantity
              item={item}
              adjust={setQuantity}
              increment={increment}
              decrement={decrement}
            />
          </div>
          <div className="builder__submit">
            <button
              className="btn btn--big"
              onClick={handleSubmit}
              disabled={isIncomplete}
            >
              Add To Cart
            </button>
          </div>
        </div>
      </div>
    </form>
  )
}

Builder.displayName = 'Builder'
Builder.propTypes = {
  menuItem: propTypes.object,
  addToCart: propTypes.func,
}

export default Builder
