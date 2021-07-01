import BackForwardButtons from '../BackForwardButtons'
import React, { useMemo } from 'react'
import { MenuContent } from '../../../HighlightedMenu'
import { defaultForwardText, wizardStages } from '../common'

interface SelectMainsStageProps {
  setStage: React.Dispatch<React.SetStateAction<wizardStages>>
}

const SelectMainsStage = ({
  setStage
}:SelectMainsStageProps) => {

  const selectMainsOnBackClick = useMemo(()=>{
    return () => setStage("servingStyle")
  }, [setStage])

  const selectMainsOnForwardClick = useMemo(()=>{
    return () => setStage("recommendationsResult")
  }, [setStage])

  return (
    <>
      <MenuContent title="Select the mains" subtitle="How many of each mains do you want?">
      </MenuContent>
      <BackForwardButtons
        onBackClick={selectMainsOnBackClick}
        onForwardClick={selectMainsOnForwardClick}
        forwardText={defaultForwardText}
      />
    </>
  )
}

export default SelectMainsStage;
