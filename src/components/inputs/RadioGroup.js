import React from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'
import { RadioButton } from '.'

const RadioGroupView = styled('span')`
  width: 100%;
  padding: 0 0 0 1rem;
  margin: 0 0 2rem;
  display: flex;
  flex-direction: column;
`

const RadioGroupLabel = styled('span')`
  font-family: ${(props) => props.theme.inputs.family};
  font-weight: 300;
  font-size: 1.8rem;
  color: ${(props) => props.theme.inputs.borderColor};
  margin: 0 0 1rem;
`

const RadioGroupButtons = styled('span')`
  width: 100%;
  // margin: 0 0 0 1rem;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    flex-direction: column;
    align-items: flex-start;
  }
`

const RadioGroupComment = styled('span')`
  display: block;
  // margin: 0 0 0 1rem;
  font-size: ${(props) => props.theme.fonts.sizes.small};
`

const RadioGroup = ({
  label,
  name,
  value,
  options,
  onChange,
  showLabel,
  required,
  description,
}) => {
  return (
    <RadioGroupView>
      <RadioGroupLabel>{label}</RadioGroupLabel>
      <RadioGroupButtons>
        {options.map((option) => (
          <RadioButton
            key={option.value}
            option={option}
            name={name}
            value={value}
            onChange={onChange}
          />
        ))}
      </RadioGroupButtons>
      {description && description.length && (
        <RadioGroupComment>{description}</RadioGroupComment>
      )}
    </RadioGroupView>
  )
}

RadioGroup.displayName = 'RadioGroup'
RadioGroup.propTypes = {
  label: propTypes.string,
  name: propTypes.string,
  showLabel: propTypes.bool,
  required: propTypes.bool,
  value: propTypes.oneOfType([propTypes.string, propTypes.number]),
  onChange: propTypes.func,
  classes: propTypes.string,
  options: propTypes.array,
  description: propTypes.string,
}

export default RadioGroup
