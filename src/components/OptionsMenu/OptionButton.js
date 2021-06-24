import styled from '@emotion/styled'
import { Heading } from '@open-tender/components'
import propTypes from 'prop-types'

const OptionLabel = styled('label')`
  display: block;
  width: 33.33333%;
  padding: 0.5rem;
  cursor: pointer;
  @media (max-width: 370px) {
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

const OptionToggle = styled.span`
  label: OptionToggle;
  
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 4.6rem;
  padding: 0 0.5rem;
  transition: ${(props) => props.theme.links.transition};
  border-radius: ${(props) => props.theme.border.radius};
  background-color: ${(props) =>
  props.theme.bgColors[props.isChecked ? 'dark' : 'secondary']};

  &:hover {
    background-color: ${(props) =>
  props.theme.colors[props.isChecked ? 'dark' : 'cardHover']};
  }
`

const OptionToggleName = styled(Heading)`
  label: OptionToggleName;

  display: block;
  font-weight: 600;
  font-size: ${(props) => props.numCharacters < 10 ? `1.4rem` : `1.2rem` };
  line-height: 1.05;
  user-select: none;
`

const OptionToggleIconAndName = styled(Heading)`
  label: OptionToggleIconAndName;
  
  display: grid;
  justify-items: left;
  align-items: center;
  grid-template-columns: 22% minmax(min-content, max-content);
  grid-column-gap: 5px;
  width: 100%;
  font-weight: 600;
  font-size: ${(props) => props.numCharacters < 8 ? `1.4rem` : `1.2rem` };
  line-height: 1.05;
  user-select: none;

  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    font-size: ${(props) => props.numCharacters < 10 ? `1.4rem` : `1rem` };
  }
  
  > span:first-of-type{
    display: grid;
    justify-items: right;
    width: 100%;
  }
`

const OptionButton = ({ label, id, icon:Icon, isChecked, onChange}) => {
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
        {
          Icon
            ? <OptionToggleIconAndName numCharacters={label.length}>
                <span><Icon/></span>
                <span>{label}</span>
              </OptionToggleIconAndName>
            : <OptionToggleName numCharacters={label.length}>{label}</OptionToggleName>
        }
      </OptionToggle>
    </OptionLabel>
  )
}

OptionButton.displayName = 'OptionButton'
OptionButton.propTypes = {
  label: propTypes.string,
  id: propTypes.string,
  icon: propTypes.func,
  isChecked: propTypes.bool,
  onChange: propTypes.func,
}

export default OptionButton
