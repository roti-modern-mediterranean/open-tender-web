import BackForwardButtons from '../BackForwardButtons'
import React, { ChangeEventHandler, useCallback, useMemo } from 'react'
import { MenuContent } from '../../../HighlightedMenu'
import { defaultForwardText, wizardStages } from '../common'
import { selectServingStyle, servingStyleOptions, setServingStyle } from '../../../../slices/recommendationsSlice'
import RadioButton from '../../../inputs/RadioButton'
import { useDispatch, useSelector } from 'react-redux'

interface ServingStyleStageProps {
  setStage: React.Dispatch<React.SetStateAction<wizardStages>>
}

const ServingStyleStage = ({
  setStage
}:ServingStyleStageProps) => {

  const dispatch = useDispatch()

  const selectedServingStyle = useSelector(selectServingStyle)
  const servingStyleOnChange = useCallback<ChangeEventHandler<HTMLInputElement>>(
    (event)=> dispatch(setServingStyle(event.target.value))
    , [dispatch])

  const servingStyleOnBackClick = useMemo(()=>{
    return () => setStage("dietaryRestrictions")
  }, [setStage])

  const servingStyleOnForwardClick = useMemo(()=>{
    return () => setStage("selectMains")
  }, [setStage])

  return (
    <>
      <MenuContent title="Serving style" subtitle="Which serving format do you prefer?">
        {servingStyleOptions.map(servingStyle => (
          <RadioButton
            name="serving_style"
            value={selectedServingStyle}
            option={servingStyle}
            onChange={servingStyleOnChange}
            key={servingStyle.value}
          />
        ))}
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
