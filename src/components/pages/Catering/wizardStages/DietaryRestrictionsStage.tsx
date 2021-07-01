import BackForwardButtons from '../BackForwardButtons'
import React, { useMemo } from 'react'
import { MenuContent } from '../../../HighlightedMenu'
import { defaultForwardText, wizardStages } from '../common'
import AllergenOptions from '../AllergenOptions'

interface DietaryRestrictionsStageProps {
  setStage: React.Dispatch<React.SetStateAction<wizardStages>>
}

const DietaryRestrictionsStage = ({
  setStage
}:DietaryRestrictionsStageProps) => {

  const dietaryRestrictionsOnBackClick = useMemo(()=>{
    return () => setStage("numberOfPeople")
  }, [setStage])

  const dietaryRestrictionsOnForwardClick = useMemo(()=>{
    return () => setStage("servingStyle")
  }, [setStage])

  return (
    <>
      <MenuContent title="Dietary restrictions" subtitle="Any ingredients we should rule out?">
        <AllergenOptions/>
      </MenuContent>
      <BackForwardButtons
        onBackClick={dietaryRestrictionsOnBackClick}
        onForwardClick={dietaryRestrictionsOnForwardClick}
        forwardText={defaultForwardText}
      />
    </>
  )
}

export default DietaryRestrictionsStage;
