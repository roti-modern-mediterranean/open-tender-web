import React from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'

const CheckboxLabel = styled('label')`
  position: relative;
  display: block;
  width: 100%;
  margin: 0 0 2rem;
  cursor: pointer;
`

const CheckboxInput = styled('input')`
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

const CheckboxContainer = styled('span')`
  width: 100%;
  flex-grow: 1;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`

const CheckboxView = styled('span')`
  content: '';
  flex-shrink: 0;
  display: block;
  position: relative;
  width: 1.8rem;
  height: 1.8rem;
  padding: 0;
  margin: 0 1rem;
  border-radius: 0.3rem;
  background-color: transparent;
  border: 0.2rem solid ${(props) => props.theme.colors.beet};

  // input:focus + & {
  //   outline-color: ${(props) => props.theme.inputs.color};
  //   outline-style: auto;
  //   outline-width: 5px;
  // }

  &:before {
    content: '';
    position: absolute;
    width: 1rem;
    height: 0.6rem;
    background: transparent;
    top: 0.3rem;
    left: 0.2rem;
    border-width: 0.2rem;
    border-style: solid;
    border-top: none;
    border-right: none;
    transform: scale(1) rotate(-50deg);
    opacity: 0;
    color: ${(props) => props.theme.colors.beet};
  }

  input:checked + &:before {
    opacity: 1;
  }

  input:disabled + & {
    opacity: 0.5;
  }

  input:disabled + &:before {
    opacity: 0.5;
  }
`

const CheckboxDescription = styled('span')`
  display: block;
  line-height: ${(props) => props.theme.lineHeight};
  font-size: ${(props) => props.theme.fonts.sizes[props.fontSize || 'small']};
`

const Checkbox = ({ label, id, on, onChange, disabled = false }) => {
  return (
    <CheckboxLabel htmlFor={id}>
      <CheckboxContainer>
        <CheckboxInput
          aria-label={label}
          id={id}
          type="checkbox"
          checked={on}
          disabled={disabled}
          onChange={onChange}
        />
        <CheckboxView />
        <CheckboxDescription>{label}</CheckboxDescription>
      </CheckboxContainer>
    </CheckboxLabel>
  )
}

Checkbox.displayName = 'Checkbox'
Checkbox.propTypes = {
  label: propTypes.string,
  id: propTypes.string,
  on: propTypes.bool,
  onChange: propTypes.func,
  disabled: propTypes.bool,
}

export default Checkbox
