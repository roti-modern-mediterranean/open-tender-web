import React from 'react'
import OptionsMenu from '../../OptionsMenu'
import { useManageAllergens } from './common'

const AllergenOptions = () => {

  const {options, selectedOptions, setSelectedOptions} = useManageAllergens()

  return (
    <OptionsMenu
      options={options}
      selectedOptions={selectedOptions}
      setSelectedOptions={setSelectedOptions}
    />
  )
}

export default AllergenOptions;
