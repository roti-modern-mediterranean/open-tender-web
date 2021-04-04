import propTypes from 'prop-types'
import styled from '@emotion/styled'

const SwitchLabel = styled('label')`
  width: 100%;
  display: flex;
  align-items: center;
  cursor: pointer;
  // padding: ${(props) => props.theme.inputs.padding};
  // padding: 1rem 0;
  margin: 0 0 1rem;
`

const SwitchText = styled('span')`
  display: block;
  padding: 0 0 0.2rem;
  color: ${(props) => props.theme.colors[props.on ? 'primary' : 'switch']};
`

const SwitchView = styled('span')`
  display: block;
  height: 3rem;
  margin: 0 0 0 1rem;
`

const SwitchInput = styled('input')`
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

const SwitchToggle = styled('span')`
  display: inline-block;
  cursor: pointer;
  user-select: none;
  position: relative;
  display: inline-block;
  outline: 0;
  width: 5.8rem;
  height: 3rem;
  border-radius: 1.5rem;
  padding: 0.3rem;
  transition: all 0.15s ease;
  border: 0.2rem solid ${(props) => props.theme.colors.switch};
  background-color: transparent;

  &:before {
    left: 0;
    position: relative;
    display: block;
    content: '';
    width: 2rem;
    height: 2rem;
    border-radius: 1rem;
    transition: all 0.15s ease;
    background-color: ${(props) => props.theme.colors.switch};
  }

  input:checked + & {
    // background-color: ${(props) => props.theme.links.primary.color};
    border-color: ${(props) => props.theme.colors.primary};
  }

  input:checked + &:before {
    left: 2.8rem;
    background-color: ${(props) => props.theme.colors.primary};
  }

  input:focus + & {
    // outline-offset: -2px;
    // outline-color: ${(props) => props.theme.colors.primary};
    // outline-style: auto;
    // outline-width: 5px;
  }
`

const Switch = ({ label, name, value, onChange, disabled = false }) => {
  return (
    <SwitchLabel htmlFor={name}>
      <SwitchText on={value}>{label}</SwitchText>
      <SwitchView>
        <SwitchInput
          aria-label={label}
          id={name}
          type="checkbox"
          checked={value}
          onChange={onChange}
          disabled={disabled}
        />
        <SwitchToggle />
      </SwitchView>
    </SwitchLabel>
  )
}

Switch.displayName = 'Switch'
Switch.propTypes = {
  disabled: propTypes.bool,
  label: propTypes.string,
  name: propTypes.string,
  value: propTypes.bool,
  onChange: propTypes.func,
}

export default Switch
