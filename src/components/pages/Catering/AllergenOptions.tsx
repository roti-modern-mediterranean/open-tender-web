import React, { useCallback, useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllergens, selectAllergens, setSelectedAllergens } from '@open-tender/redux'
import OptionsMenu from '../../OptionsMenu'
import { allergenIconMap } from '../../icons/allergens'

const useManageAllergens = () => {

  const dispatch = useDispatch();
  const { entities, selectedAllergens } = useSelector(selectAllergens)

  useEffect(()=>{
    dispatch(fetchAllergens())
  }, [dispatch])

  // Convert from Redux to AllergenOptions array (ids, names)
  const options = useMemo(
    () => (entities || []).map(
      (allergen) => ({id: `${allergen.allergen_id}`, name: allergen.name, icon: allergenIconMap[allergen.name] || null})
    ), [entities])

  // Convert from Redux to AllergenOptions array (ids)
  const selectedOptions = useMemo(()=>
    (selectedAllergens || [])
      .map((allergen) => `${allergen.allergen_id}`)
    , [selectedAllergens])

  // Convert from AllergenOptions to Redux array, and dispatch
  const setSelectedOptions = useCallback(
    (data) => dispatch(setSelectedAllergens(data.map(
      (allergenId:string) => ({allergen_id: parseInt(allergenId, 10)})))),
    [dispatch]
  )

  return {options, selectedOptions, setSelectedOptions};
}

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
