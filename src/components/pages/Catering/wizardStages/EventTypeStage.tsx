import OptionsMenu from '../../../OptionsMenu'
import {
  eventTypeOptions,
  selectEventType,
  setEventType
} from '../../../../slices/recommendationsSlice'
import BackForwardButtons from '../BackForwardButtons'
import React, { useMemo } from 'react'
import { MenuContent } from '../../../HighlightedMenu'
import { defaultForwardText, wizardStages } from '../common'
import { useSetSingleOption, useSingleOption } from '../../../../slices/utils/hooks'

interface EventTypeStageProps {
  goBack: () => void,
  setStage: React.Dispatch<React.SetStateAction<wizardStages>>
}

const EventTypeStage = ({
  goBack, setStage
}:EventTypeStageProps) => {

  const selectedEventTypes = useSingleOption(selectEventType)
  const setSelectedEventTypes = useSetSingleOption(setEventType)

  const eventTypeOnBackClick = useMemo(()=>{
    return goBack
  }, [goBack])

  const eventTypeOnForwardClick = useMemo(()=>{
    if(selectedEventTypes.length === 0) {
      return null;
    }
    return () => setStage("numberOfPeople")
  }, [selectedEventTypes, setStage])

  return (
    <>
      <MenuContent title="Type of event" subtitle="What kind of get together are we having?">
        <OptionsMenu
          options={eventTypeOptions}
          selectedOptions={selectedEventTypes}
          setSelectedOptions={setSelectedEventTypes}
          widthPercentagePerButton={100}
          hasMultiOptions={false}
        />
      </MenuContent>
      <BackForwardButtons
        onBackClick={eventTypeOnBackClick}
        onForwardClick={eventTypeOnForwardClick}
        forwardText={defaultForwardText}
      />
    </>
  )
}

export default EventTypeStage;
