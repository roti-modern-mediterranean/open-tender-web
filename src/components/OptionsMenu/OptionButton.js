import styled from '@emotion/styled'
import { Heading } from '@open-tender/components'
import propTypes from 'prop-types'

const OptionLabel = styled('label')`
  display: block;
  width: 33.33333%;
  padding: 0.5rem;
  cursor: pointer;
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    width: 50%;
  }
`

const OptionInput = styled('input')`
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

const OptionToggle = styled(`span`)`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 4.6rem;
  padding: 0 0.5rem 0 1.75rem;
  transition: ${(props) => props.theme.links.transition};
  border-radius: ${(props) => props.theme.border.radius};
  background-color: ${(props) =>
  props.theme.bgColors[props.isChecked ? 'dark' : 'secondary']};

  &:hover {
    background-color: ${(props) =>
  props.theme.colors[props.isChecked ? 'dark' : 'cardHover']};
  }
`

const OptionToggleIcon = styled('span')`
  display: block;
  margin: 0 1rem 0 0;
  line-height: 0;
`

const OptionToggleName = styled(Heading)`
  display: block;
  font-weight: 600;
  font-size: 1.4rem;
  line-height: 1.05;
  user-select: none;
`

const OptionButton = ({ label, id, isChecked, onChange}) => {
  return (
    <OptionLabel htmlFor={id}>
      <OptionInput
        aria-label={label}
        id={id}
        type="checkbox"
        checked={isChecked}
        onChange={onChange}
      />
      <OptionToggle isChecked={isChecked}>
        <OptionToggleName>{label}</OptionToggleName>
      </OptionToggle>
    </OptionLabel>
  )
}

OptionButton.displayName = 'OptionButton'
OptionButton.propTypes = {
  label: propTypes.string,
  id: propTypes.string,
  isChecked: propTypes.array,
  onChange: propTypes.func,
}

export default OptionButton
