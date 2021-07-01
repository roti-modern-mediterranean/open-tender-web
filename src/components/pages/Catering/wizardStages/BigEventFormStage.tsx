import BackForwardButtons from '../BackForwardButtons'
import React, { useMemo } from 'react'
import { MenuContent } from '../../../HighlightedMenu'
import { wizardStages } from '../common'
import BigEventForm from '../BigEventForm'

interface BigEventFormStageProps {
  setStage: React.Dispatch<React.SetStateAction<wizardStages>>
}

const BigEventFormStage = ({
  setStage
}:BigEventFormStageProps) => {

  const bigEventFormOnBackClick = useMemo(()=>{
    return () => setStage("numberOfPeople")
  }, [setStage])

  const bigEventFormOnForwardClick = useMemo(()=>{
    return () => setStage("sentBigEventForm")
  }, [setStage])

  return (
    <>
      <MenuContent
        title="We want to get in touch with you!"
        subtitle="Leave us your details so we can contact you as soon as possible"
      >
        <BigEventForm/>
      </MenuContent>
      <BackForwardButtons
        onBackClick={bigEventFormOnBackClick}
        onForwardClick={bigEventFormOnForwardClick}
        forwardText="Send"
      />
    </>
  )
}

export default BigEventFormStage;
