import React from 'react'
import propTypes from 'prop-types'

const CartErrors = ({ errors, newCart }) => {
  return (
    <div className="validate">
      <div className="validate__missing">
        {errors.missingItems.length ? (
          <>
            <p>The following items are not currently available:</p>
            <ul>
              {errors.missingItems.map((item, index) => (
                <li
                  key={`${item.id}-${index}`}
                  className="font-size-big ot-bold"
                >
                  {item.name}
                </li>
              ))}
            </ul>
          </>
        ) : null}
      </div>
      <div className="validate__invalid">
        {errors.invalidItems.length ? (
          <>
            <p>The following items are no longer valid:</p>
            <ul>
              {errors.invalidItems.map((item, index) => {
                const missingOptions = item.missingOptions.length
                  ? item.missingOptions.map((option) => option.name).join(', ')
                  : null
                return (
                  <li
                    key={`${item.id}-${index}`}
                    className="font-size-big ot-bold"
                  >
                    {item.name}
                    {missingOptions ? (
                      <span>(due to missing options: {missingOptions})</span>
                    ) : null}
                  </li>
                )
              })}
            </ul>
          </>
        ) : null}
      </div>
    </div>
  )
}

CartErrors.displayName = 'CartErrors'
CartErrors.propTypes = {
  errors: propTypes.object,
  newCart: propTypes.array,
}

export default CartErrors
