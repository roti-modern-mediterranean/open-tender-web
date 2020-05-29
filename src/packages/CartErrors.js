import React from 'react'
import propTypes from 'prop-types'
import { Button } from './index'
import { isoToDate } from './utils/datetimes'

const MissingItems = ({ missingItems }) => {
  return missingItems.length ? (
    <div className="validate__missing">
      <p>The following items are not currently available:</p>
      <ul>
        {missingItems.map((item, index) => (
          <li key={`${item.id}-${index}`} className="font-size-big ot-bold">
            {item.name}
          </li>
        ))}
      </ul>
    </div>
  ) : null
}

MissingItems.displayName = 'MissingItems'
MissingItems.propTypes = {
  missingItems: propTypes.array,
}

const InvalidItems = ({ invalidItems }) => {
  return invalidItems.length ? (
    <div className="validate__invalid">
      <p>The following items are no longer valid:</p>
      <ul>
        {invalidItems.map((item, index) => {
          const missingOptions = item.missingOptions.length
            ? item.missingOptions.map((option) => option.name).join(', ')
            : null
          return (
            <li key={`${item.id}-${index}`} className="font-size-big ot-bold">
              {item.name}
              {missingOptions ? (
                <span>(due to missing options: {missingOptions})</span>
              ) : null}
            </li>
          )
        })}
      </ul>
    </div>
  ) : null
}

InvalidItems.displayName = 'InvalidItems'
InvalidItems.propTypes = {
  invalidItems: propTypes.array,
}

const isCartRevertable = (previous, current, locations) => {
  const previousLocation = locations.find(
    (i) => i.location_id === previous.locationId
  )
  if (!previousLocation) return null
  const now = new Date()
  const requestedDate =
    current.requestedAt === 'asap' ? now : isoToDate(current.requestedAt)
  if (requestedDate < now) return null
  if (
    previous.locationId === current.locationId &&
    previous.serviceType === current.serviceType
  ) {
    return null
  }
  return { newLocation: previousLocation, newMenuVars: previous }
}

const CartErrors = ({
  newCart,
  errors,
  config,
  revert,
  proceed,
  locations,
  previousMenuVars,
  menuVars,
}) => {
  const isRevertable = isCartRevertable(previousMenuVars, menuVars, locations)
  const content = isRevertable ? config.revert : config.proceed

  const handleRevert = (evt) => {
    const { newLocation, newMenuVars } = isRevertable
    revert(evt, newLocation, newMenuVars)
  }

  return (
    <div className="validate">
      <MissingItems missingItems={errors.missingItems} />
      <InvalidItems invalidItems={errors.invalidItems} />
      <p>{content.message}</p>
      <div className="validate__buttons">
        {isRevertable && (
          <Button
            text={content.buttonRevert}
            icon="ChevronLeft"
            onClick={handleRevert}
            classes="btn--back"
          />
        )}
        <Button
          text={content.buttonProceed}
          icon="ChevronRight"
          onClick={proceed}
          iconEnd={true}
          classes="btn--proceed"
        />
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
