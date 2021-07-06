import styled from '@emotion/styled'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllergens, selectAllergens, setSelectedAllergens } from '@open-tender/redux'
import { useCallback, useEffect, useMemo } from 'react'
import { allergenIconMap } from '../../icons/allergens'

export const CateringContent = styled.div<{hasNoShortcut?:boolean}>`
  label: CateringContent;
  
  display: grid;
  grid-template-areas: ${(props) => props.hasNoShortcut
  ? `"cateringMessage options"`
  : `"cateringMessage options" 
             "shortcut        options"`};
  
  grid-template-columns: minmax(10%, auto) minmax(36%, 36rem);
  grid-template-rows: ${(props) => props.hasNoShortcut
          ? `auto`
          : `auto 120px`};
  column-gap: 4.2rem;
  row-gap: 3rem;

  @media (max-width: ${(props) => props.theme.breakpoints.narrow}) {
    padding: ${(props) => props.theme.layout.paddingMobile};
  }

  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    flex: 0 0 auto;
    padding-top:  0;
    text-align: center;
    max-width: 44rem;
    margin: 0 auto 1rem;

    grid-template-areas: "cateringMessage"
                        "options"
                        ${(props) => !props.hasNoShortcut && `"shortcut"`};
    grid-template-columns: auto;
    grid-template-rows: auto;
  }
`

export const CateringMessage = styled('div')`
  label: CateringMessage;
  
  opacity: 0;
  animation: slide-up 0.25s ease-in-out 0.25s forwards;
  
  grid-area: cateringMessage;

  h2 {
    margin: 0 0 1rem;
    font-size: 9rem;
    line-height: 0.9;
    color: ${(props) => props.theme.colors.light};
    @media (max-width: ${(props) => props.theme.breakpoints.narrow}) {
      font-size: 6rem;
    }
    @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
      font-family: ${(props) => props.theme.fonts.preface.family};
      font-weight: 500;
      font-size: 2.8rem;
      letter-spacing: 0.01em;
    }
  }

  & > p {
    margin: 0 0 1rem;
    font-size: 2.7rem;
    line-height: 1.33333;
    color: ${(props) => props.theme.colors.light};
    @media (max-width: ${(props) => props.theme.breakpoints.narrow}) {
      font-size: 2.3rem;
    }
    @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
      font-size: 1.5rem;
      line-height: 1.45;
      font-weight: 500;
    }
  }
`
export const useManageAllergens = () => {

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
export type wizardStages =
  | 'eventType'
  | 'numberOfPeople'
  | 'bigEventForm'
  | 'sentBigEventForm'
  | 'dietaryRestrictions'
  | 'servingStyle'
  | 'selectMains'
  | 'recommendationsResult';

export const defaultForwardText = "Confirm"
