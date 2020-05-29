import React, { useState } from 'react'
import propTypes from 'prop-types'
import { iconMap } from '../packages/icons'
import { stripTags } from '../packages/utils/helpers'
import LocationOrder from './LocationOrder'

const placeholder2 =
  'https://s3.amazonaws.com/betterboh/u/img/prod/2/1588303325_976877dbfac85a83d9e9.jpg'

const LocationAction = ({ icon, text, arrow = 'ArrowRight' }) => {
  return (
    <div className="location__action">
      <div className="location__icon secondary-color">{iconMap[icon]}</div>
      <div className="location__text">
        <p className="secondary-color font-size-small">{text}</p>
      </div>
      <div className="location__arrow secondary-color">{iconMap[arrow]}</div>
    </div>
  )
}

const Location = ({ location, classes = '', showImage, isOrder }) => {
  const [showHours, setShowHours] = useState(false)

  const { address, images, hours } = location
  let smallImage = images.find((i) => i.type === 'SMALL_IMAGE')
  smallImage = smallImage ? smallImage.url : null
  const bgStyle = { backgroundImage: `url(${smallImage || placeholder2}` }
  const phoneUrl = address.phone ? `tel:${address.phone}` : null
  const hoursDesc = hours.description ? stripTags(hours.description) : null
  classes = `location bg-color border-radius ${classes}`

  const toggleHours = (evt) => {
    evt.preventDefault()
    setShowHours(!showHours)
    evt.target.blur()
  }

  const distance =
    location.distance !== null && location.distance !== undefined
      ? location.distance
      : null

  return (
    <div className={classes}>
      {showImage && (
        <div
          className="location__image bg-image bg-secondary-color"
          style={bgStyle}
        >
          &nbsp;
        </div>
      )}
      <div className="location__content">
        <div className="location__header">
          <h2 className="ot-font-size-h5">{location.name}</h2>
          {distance !== null && (
            <p className="font-size-small secondary-color">
              {distance.toFixed(2)} miles away
            </p>
          )}
        </div>
        <div className="location__actions">
          <a
            className="no-link"
            href={location.directions_url}
            rel="noopener noreferrer"
            target="_blank"
          >
            <LocationAction icon="MapPin" text={address.street} />
          </a>
          {phoneUrl && (
            <a
              className="no-link"
              href={phoneUrl}
              rel="noopener noreferrer"
              target="_blank"
            >
              <LocationAction icon="Phone" text={address.phone} />
            </a>
          )}
          {hoursDesc && (
            <button onClick={toggleHours}>
              <LocationAction icon="Clock" text={hoursDesc} />
            </button>
          )}
        </div>
        <LocationOrder location={location} isOrder={isOrder} />
      </div>
    </div>
  )
}

Location.displayName = 'Location'
Location.propTypes = {
  location: propTypes.object,
  classes: propTypes.string,
  showImage: propTypes.bool,
  isOrder: propTypes.bool,
}

export default Location
