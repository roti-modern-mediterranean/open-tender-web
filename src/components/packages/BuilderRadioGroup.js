import propTypes from 'prop-types'
import React from 'react'
import BuilderOptionWrapper from './BuilderOptionWrapper'
import BuilderRadio from './BuilderRadio'

const BuilderRadioGroup = ({ group, handler }) => {
  return (
    <fieldset>
      {group.options.map((option) => (
        <BuilderOptionWrapper key={`${group.id}-${option.id}`} option={option}>
          <BuilderRadio
            key={option.id}
            option={option}
            handler={() => handler(group.id, option.id)}
          />
        </BuilderOptionWrapper>
      ))}
    </fieldset>
  )
}

BuilderRadioGroup.displayName = 'BuilderRadioGroup'
BuilderRadioGroup.propTypes = {
  id: propTypes.number,
  options: propTypes.array,
  handler: propTypes.func,
}

export default BuilderRadioGroup
