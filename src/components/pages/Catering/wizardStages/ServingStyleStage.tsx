import BackForwardButtons from '../BackForwardButtons'
import React, { useCallback, useMemo } from 'react'
import { MenuContent } from '../../../HighlightedMenu'
import { defaultForwardText, wizardStages } from '../common'
import {
  selectServingStyle,
  servingStyleOptions,
  setServingStyle
} from '../../../../slices/recommendationsSlice'
import { useDispatch, useSelector } from 'react-redux'
import OptionsMenu from '../../../OptionsMenu'

interface ServingStyleStageProps {
  setStage: React.Dispatch<React.SetStateAction<wizardStages>>
}

const ServingStyleStage = ({
  setStage
}:ServingStyleStageProps) => {

  const dispatch = useDispatch()

  const selectedServingStyle = useSelector(selectServingStyle)
  const setSelectedServingStyle = useCallback<React.Dispatch<React.SetStateAction<string[]>>>(
    (value)=> dispatch(setServingStyle(value))
    , [dispatch, setServingStyle])

  const servingStyleOnBackClick = useMemo(()=>{
    return () => setStage("dietaryRestrictions")
  }, [setStage])

  const servingStyleOnForwardClick = useMemo(()=>{
    if(selectedServingStyle.length === 0){
      return null
    }
    return () => setStage("selectMains")
  }, [selectedServingStyle, setStage])

  return (
    <>
      <MenuContent title="Serving style" subtitle="Which serving format do you prefer?">
        <OptionsMenu
          options={servingStyleOptions}
          selectedOptions={selectedServingStyle}
          setSelectedOptions={setSelectedServingStyle}
          widthPercentagePerButton={100}
          hasMultiOptions={false}
        />
      </MenuContent>
      <BackForwardButtons
        onBackClick={servingStyleOnBackClick}
        onForwardClick={servingStyleOnForwardClick}
        forwardText={defaultForwardText}
      />
    </>
  )
}

export default ServingStyleStage;
