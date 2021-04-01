import React from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'

const RadioButtonLabel = styled('label')`
  position: relative;
  line-height: 1;
  cursor: pointer;
  width: auto;
  margin: 0 2.5rem 1rem 0;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`

const RadioButtonInput = styled('input')`
  position: absolute;
  border: 0;
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  white-space: nowrap;
`

const RadioButtonView = styled('span')`
  content: '';
  display: block;
  position: relative;
  width: 2.3rem;
  height: 2.3rem;
  padding: 0;
  border-radius: 100%;
  transition: all 0.15s ease;
  background-color: transparent;
  border: 0.2rem solid ${(props) => props.theme.colors.beet};

  input:focus + & {
    outline-color: ${(props) => props.theme.inputs.color};
    outline-style: auto;
    outline-width: 5px;
  }

  input:checked + &:before {
    content: '';
    position: absolute;
    top: 0.2rem;
    left: 0.2rem;
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 100%;
    background-color: ${(props) => props.theme.colors.beet};
  }
`

const RadioButtonDescription = styled('span')`
  display: block;
  margin: 0 0 0 0.8rem;
  font-family: ${(props) => props.theme.inputs.family};
  // font-size: ${(props) => props.theme.inputs.fontSize};
  font-size: 1.8rem;
  line-height: 1;
`

const RadioButton = ({ option, name, value, onChange }) => {
  return (
    <RadioButtonLabel htmlFor={option.value}>
      <RadioButtonInput
        id={option.value}
        name={name}
        type="radio"
        value={option.value}
        checked={option.value === value}
        onChange={onChange}
        aria-label={option.name}
      />
      <RadioButtonView />
      <RadioButtonDescription>{option.name}</RadioButtonDescription>
    </RadioButtonLabel>
  )
}

RadioButton.displayName = 'RadioButton'
RadioButton.propTypes = {
  option: propTypes.object,
  name: propTypes.string,
  value: propTypes.oneOfType([propTypes.string, propTypes.number]),
  onChange: propTypes.func,
}

export default RadioButton
