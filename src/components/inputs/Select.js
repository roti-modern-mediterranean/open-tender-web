import React from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'

const SelectView = styled('span')`
  position: relative;
  display: block;
  flex-grow: 1;
`

const SelectArrow = styled('span')`
  position: absolute;
  display: block;
  content: ' ';
  z-index: 2;
  bottom: 2rem;
  right: 1.5rem;
  width: 1.1rem;
  height: 1.1rem;
  border-bottom-width: 0.2rem;
  border-bottom-style: solid;
  border-right-width: 0.2rem;
  border-right-style: solid;
  border-color: ${(props) => props.theme.colors.primary};
  transform: scale(1) rotate(45deg);
`

const Select = ({ label, name, value, onChange, disabled, options }) => (
  <SelectView>
    <select
      aria-label={label}
      id={name}
      value={value}
      onChange={onChange}
      disabled={disabled}
    >
      {options ? (
        options.map((option, index) => (
          <option key={`${option.value}-${index}`} value={option.value}>
            {option.name}
          </option>
        ))
      ) : (
        <option>loading...</option>
      )}
    </select>
    <SelectArrow />
  </SelectView>
)

Select.displayName = 'Select'
Select.propTypes = {
  label: propTypes.string,
  name: propTypes.string,
  value: propTypes.oneOfType([propTypes.string, propTypes.number]),
  onChange: propTypes.func,
  disabled: propTypes.bool,
  options: propTypes.array,
}

export default Select
