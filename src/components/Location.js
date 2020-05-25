import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { setLocation } from '../slices/orderSlice'
import { iconMap } from '../packages/icons'
import { Button } from '../packages'
import { stripTags } from '../utils/helpers'

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

const placeholder2 =
  'https://s3.amazonaws.com/betterboh/u/img/prod/2/1588303325_976877dbfac85a83d9e9.jpg'

export const Location = ({ location, classes = '', showImage, isOrder }) => {
  const [showHours, setShowHours] = useState(false)
  const dispatch = useDispatch()
  const history = useHistory()

  // const { address } = location
  const { address, images, hours, settings } = location
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

  const handleOrder = (evt) => {
    evt.preventDefault()
    dispatch(setLocation(location))
    const rcType = location.revenue_center_type.toLowerCase()
    history.push(`/menu/${location.slug}-${rcType}`)
    evt.target.blur()
  }

  const handleChange = (evt) => {
    evt.preventDefault()
    history.push(`/locations`)
    evt.target.blur()
  }

  console.log(location.name)
  console.log(settings.first_times)

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
        <div className="location__order">
          {isOrder ? (
            <Button
              text="Order Here"
              ariaLabel={`Order from ${location.name}`}
              icon="ShoppingBag"
              onClick={handleOrder}
            />
          ) : (
            <Button
              text="Change Location"
              icon="RefreshCw"
              onClick={handleChange}
            />
          )}
        </div>
      </div>
    </div>
  )
}
