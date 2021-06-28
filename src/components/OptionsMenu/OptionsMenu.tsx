import styled from '@emotion/styled'
import OptionButton from './OptionButton'
import React, { useCallback } from 'react'
import { FCNoChildren, IconProps } from '../utils/types'



const MenuArea = styled('div')`
  label: MenuArea;
  
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin: 0px -0.5rem;
`

interface Option {id: string, name: string, icon?: FCNoChildren<IconProps> | null}

interface OptionsMenuProps {
  options: Option[],
  selectedOptions: string[],
  setSelectedOptions: (value:string[]) => void
}

const OptionsMenu = (
  {options,
    selectedOptions,
    setSelectedOptions
  }: OptionsMenuProps) => {

  const OptionButtonOnChange = useCallback((event) => {
    const option = event.target
    if(selectedOptions.includes(option.id)) {
      setSelectedOptions(selectedOptions.filter(optionId => optionId !== option.id))
    }
    else {
      setSelectedOptions([...selectedOptions, option.id])
    }
  }, [selectedOptions, setSelectedOptions])

  return <MenuArea>
    {options.map((option) => (
      <OptionButton
        key={option.id}
        label={option.name}
        icon={option.icon}
        id={`${option.id}`}
        isChecked={selectedOptions.includes(option.id)}
        onChange={OptionButtonOnChange}
      />
    ))}
  </MenuArea>;
}

export default OptionsMenu;
