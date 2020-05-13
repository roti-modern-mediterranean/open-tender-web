import React from 'react'
import propTypes from 'prop-types'

const Toggle = ({ label, id, on = false, classes = '', handleChange }) => {
  const klass = `toggle-btn ot-transition ${
    on ? 'toggle-btn-on bg-link-color' : 'toggle-btn-off bg-secondary-color'
  } ${classes}`

  const onClick = (evt) => {
    evt.preventDefault()
    const event = {
      target: {
        id: id,
        type: 'checkbox',
        checked: !on,
      },
    }
    handleChange(event)
    evt.target.blur()
  }

  return (
    <div>
      <input
        className="toggle-input"
        type="checkbox"
        id={id}
        aria-label={label}
        defaultChecked={on}
      />
      <button className={klass} aria-label="Toggle" onClick={onClick}>
        <span className="toggle-btn-tick bg-color ot-transition" />
      </button>
    </div>
  )
}

Toggle.displayName = 'Toggle'
Toggle.propTypes = {
  locations: propTypes.array,
}

export default Toggle
