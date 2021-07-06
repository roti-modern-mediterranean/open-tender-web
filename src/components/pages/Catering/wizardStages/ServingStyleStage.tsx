import BackForwardButtons from '../BackForwardButtons'
import React, { useMemo } from 'react'
import { MenuContent } from '../../../HighlightedMenu'
import { defaultForwardText, wizardStages } from '../common'
import {
  selectServingStyle,
  servingStyleOptions,
  setServingStyle
} from '../../../../slices/recommendationsSlice'
import OptionsMenu from '../../../OptionsMenu'
import { useSetSingleOption, useSingleOption } from '../../../../slices/utils/hooks'

interface ServingStyleStageProps {
  setStage: React.Dispatch<React.SetStateAction<wizardStages>>
}

const ServingStyleStage = ({
  setStage
}:ServingStyleStageProps) => {

  const selectedServingStyle = useSingleOption(selectServingStyle)
  const setSelectedServingStyle = useSetSingleOption(setServingStyle)

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
