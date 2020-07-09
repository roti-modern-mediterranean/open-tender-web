import React from 'react'
import propTypes from 'prop-types'
import { BarLoader, ClipLoader } from 'react-spinners'

const loader = (type, size) => {
  switch (type) {
    case 'Clip':
      return <ClipLoader size={size} loading={true} />
    default:
      return <BarLoader size={size} loading={true} />
  }
}

const Loader = ({
  type,
  text,
  size = 100,
  className = '',
  textClass = 'ot-font-size-small',
}) => (
  <div className={`loading ${className}`}>
    <div className="container">
      <div className="loading__loader">{loader(type, size)}</div>
      {text && text.length > 0 && <p className={textClass}>{text}</p>}
    </div>
  </div>
)

Loader.displayName = 'Loader'
Loader.propTypes = {
  type: propTypes.string,
  size: propTypes.number,
  text: propTypes.string,
  textClass: propTypes.string,
}

export default Loader
