import propTypes from 'prop-types'
import styled from '@emotion/styled'
import OptionButton from './OptionButton'
import { useCallback } from 'react'



const MenuArea = styled('div')`
  label: MenuArea;
  
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin: 2rem -0.5rem 2rem;
`

const OptionsMenu = ({options, selectedOptions, setSelectedOptions}) => {

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
        id={`${option.id}`}
        isChecked={selectedOptions.includes(option.id)}
        onChange={OptionButtonOnChange}
      />
    ))}
  </MenuArea>;
}

OptionsMenu.displayName = 'OptionsMenu'
OptionsMenu.propTypes = {
  options: propTypes.array,
  selectedOptions: propTypes.array,
  setSelectedOptions: propTypes.func,
}

export default OptionsMenu;
