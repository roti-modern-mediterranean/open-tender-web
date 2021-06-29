import styled from '@emotion/styled'
import { Heading } from '@open-tender/components'
import { FCNoChildren, IconProps } from '../utils/types'
import React from 'react'

const OptionLabel = styled.label<{widthPercentage?: number}>`
  display: block;
  width: ${props => props.widthPercentage 
          && props.widthPercentage > 0 
          && props.widthPercentage <= 100 
                  ? props.widthPercentage 
                  : `33.33333`}%;
  padding: 0.5rem;
  cursor: pointer;
  @media (max-width: 370px) {
    width: 50%;
  }
`

const OptionInput = styled.input`
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

const OptionToggle = styled.span<{isChecked: boolean}>`
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

const OptionToggleName = styled(Heading)<{numCharacters: number, widthPercentage?: number}>`
  label: OptionToggleName;

  display: block;
  text-align: center;
  font-weight: 600;
  font-size: ${(props) => props.numCharacters < 10
                || (props.widthPercentage
                        && props.widthPercentage >= 40
                        && props.widthPercentage <= 100)
                        ? `1.4rem` : `1.2rem` };
  line-height: 1.05;
  user-select: none;
`

const OptionToggleIconAndName = styled(Heading)<{numCharacters: number, widthPercentage?: number}>`
  label: OptionToggleIconAndName;
  
  display: grid;
  justify-items: left;
  align-items: center;
  grid-template-columns: 22% minmax(min-content, max-content);
  grid-column-gap: 5px;
  width: 100%;
  font-weight: 600;
  font-size: ${(props) => props.numCharacters < 8 
                || (props.widthPercentage 
                  && props.widthPercentage >= 40 
                    && props.widthPercentage <= 100) 
                      ? `1.4rem` : `1.2rem` };
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

interface OptionButtonProps {
  label: string,
  id: string,
  icon?: FCNoChildren<IconProps> | null,
  isChecked: boolean,
  onChange: React.InputHTMLAttributes<HTMLInputElement>["onChange"],
  widthPercentage?: number
}

const OptionButton = ({
  label,
  id,
  icon:Icon,
  isChecked,
  onChange,
  widthPercentage
}:OptionButtonProps) => {
  return (
    <OptionLabel htmlFor={id} widthPercentage={widthPercentage}>
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
            ? <OptionToggleIconAndName numCharacters={label.length} widthPercentage={widthPercentage}>
                <span><Icon/></span>
                <span>{label}</span>
              </OptionToggleIconAndName>
            : <OptionToggleName numCharacters={label.length} widthPercentage={widthPercentage}>
                {label}
              </OptionToggleName>
        }
      </OptionToggle>
    </OptionLabel>
  )
}

export default OptionButton