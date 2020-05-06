import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { setLocation } from '../slices/orderSlice'
import { iconMap } from '../utils/icons'
import Button from './Button'

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

// const placeholder1 =
//   'https://s3.amazonaws.com/betterboh/u/img/prod/2/1588303421_cff321067bf020a3dd8f.jpg'
const placeholder2 =
  'https://s3.amazonaws.com/betterboh/u/img/prod/2/1588303325_976877dbfac85a83d9e9.jpg'

export const Location = ({ location, classes = '', showImage, isOrder }) => {
  const [showHours, setShowHours] = useState(false)
  const dispatch = useDispatch()
  const history = useHistory()

  const { address } = location
  const bgStyle = { backgroundImage: `url(${placeholder2}` }
  const phone = address.phone ? `tel:${address.phone}` : null
  const hours = location.hours_desc
    ? location.hours_desc.replace('<p>', '').replace('</p>', '')
    : null
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
            href={address.directions_link}
            rel="noopener noreferrer"
            target="_blank"
          >
            <LocationAction icon="MapPin" text={address.street} />
          </a>
          {phone && (
            <a
              className="no-link"
              href={phone}
              rel="noopener noreferrer"
              target="_blank"
            >
              <LocationAction icon="Phone" text={address.phone} />
            </a>
          )}
          {hours && (
            <button onClick={toggleHours}>
              <LocationAction icon="Clock" text={hours} />
            </button>
          )}
        </div>
        <div className="location__order">
          {/* <button
            className="btn"
            aria-label={`Order from ${location.name}`}
            onClick={handleOrder}
          >
            <span className="btn-icon-wrapper">
              <span className="btn-icon">{iconMap['ShoppingBag']}</span>
              <span>Order Here</span>
            </span>
          </button> */}
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
