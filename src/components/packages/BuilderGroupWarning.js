import React from 'react'
import propTypes from 'prop-types'

const BuilderGroupWarning = ({ quantity, min, max }) => {
  const isRadio = min === 1 && max === 1
  if (quantity < min) {
    return <span className="builder__group__warning -min">Below Minimum</span>
  } else if (quantity === max && max !== 0 && !isRadio) {
    return <span className="builder__group__warning -max">At Maximum</span>
  } else {
    return null
  }
}

BuilderGroupWarning.displayName = 'BuilderGroupWarning'
BuilderGroupWarning.propTypes = {
  group: propTypes.object,
}

export default BuilderGroupWarning
