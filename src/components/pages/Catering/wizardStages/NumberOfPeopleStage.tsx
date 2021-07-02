import {
  numberOfPeopleOptions,
  selectNumberOfPeopleIndex, setNumberOfPeopleIndex
} from '../../../../slices/recommendationsSlice'
import BackForwardButtons from '../BackForwardButtons'
import React, { useCallback, useMemo } from 'react'
import { MenuContent } from '../../../HighlightedMenu'
import { defaultForwardText, wizardStages } from '../common'
import { useDispatch, useSelector } from 'react-redux'
import RangeSlider from '../../../RangeSlider'
import styled from '@emotion/styled'
import GroupOf3People from '../../../icons/GroupOf3People'
import GroupOf6People from '../../../icons/GroupOf6People'
import CallUsButton from '../CallUsButton'
import ChatButton from '../ChatButton'

const RangeSliderContainer = styled.div`
  label: RangeSliderContainer;
  
  height: 22rem;
`

const EmptyImage = styled.span<{size?:string}>`
  label: EmptyImage;
  
  display: block;
  height: ${(props) => props.size ?? `30px`};
  width: ${(props) => props.size ?? `30px`};
`;

interface NumberOfPeopleImageProps {
  index: number,
  size?: string,
  color?: string
}

const NumberOfPeopleImage = ({
                               index, size, color
                             }:NumberOfPeopleImageProps) => {
  if(index < 1){
    return <EmptyImage size={size}/>;
  }
  if(index < 4){
    return <GroupOf3People size={size} color={color}/>;
  }
  return <GroupOf6People size={size} color={color}/>
}

const RangeSliderMessageContainer = styled.div`
  label: RangeSliderMessageContainer;
`;

const RangeSliderMessage = styled.div`
  label: RangeSliderMessage;
  
  width: 100%;
  text-align: center;
  text-transform: uppercase;
  color: ${(props) => props.theme.colors.pepper};
  font-family: ${(props) => props.theme.fonts.headings.family};
  font-size: 24px;
  font-weight: ${(props) => props.theme.fonts.headings.weight};
  margin: 5px 0;

  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    font-size: 20px;
  }
`

const RangeSliderSubMessage = styled.div`
  label: RangeSliderSubMessage;
  
  text-align: center;
`;

const RangeSliderMessageButtons = styled.div`
  label: RangeSliderMessageButtons;
  
  display: grid;
  grid-template-columns: 48% 48%;
  gap: 4%;
  justify-content: center;
  margin-top: 1rem;
  
  
  > button, > a {
    width: 100%
  }
`;

const BigEventCTA = () => (
  <RangeSliderMessageContainer>
    <RangeSliderMessage>Nice, let's get it going!</RangeSliderMessage>
    <RangeSliderSubMessage>Contact us directly for big orders</RangeSliderSubMessage>
    <RangeSliderMessageButtons>
      <CallUsButton/>
      <ChatButton/>
    </RangeSliderMessageButtons>
  </RangeSliderMessageContainer>
)

const numberOfPeopleMessage = (index:number) =>{
  if(index < 1){
    return <RangeSliderMessage>How many are we?</RangeSliderMessage>;
  }
  if(index < 4){
    return <RangeSliderMessage>Zzz!</RangeSliderMessage>;
  }
  if(index < 6){
    return <RangeSliderMessage>Wow, it's gonna be a party!</RangeSliderMessage>;
  }
  return <RangeSliderMessage>Big, big event!!</RangeSliderMessage>
}

interface NumberOfPeopleStageProps {
  setStage: React.Dispatch<React.SetStateAction<wizardStages>>
}

const NumberOfPeopleStage = ({
  setStage
}:NumberOfPeopleStageProps) => {

  const dispatch = useDispatch()

  const _numberOfPeopleIndex = useSelector(selectNumberOfPeopleIndex)
  const _setNumberOfPeopleIndex = useCallback((numberOfPeopleIndex) => dispatch(setNumberOfPeopleIndex(numberOfPeopleIndex)), [dispatch])

  const numberOfPeopleOnBackClick = useMemo(()=>{
    return () => setStage("eventType")
  }, [setStage])

  const numberOfPeopleOnForwardClick = useMemo(()=>{
    if(_numberOfPeopleIndex < 1){
      return null;
    }
    if(_numberOfPeopleIndex > 5){
      return () => setStage("bigEventForm");
    }
    return () => setStage("dietaryRestrictions")
  }, [_numberOfPeopleIndex, setStage])

  return (
    <>
      <MenuContent title="Number of people" subtitle="How big is your group?">
        <RangeSliderContainer>
          <RangeSlider options={numberOfPeopleOptions} index={_numberOfPeopleIndex} setIndex={_setNumberOfPeopleIndex}>
            <NumberOfPeopleImage index={_numberOfPeopleIndex} size="60px"/>
          </RangeSlider>
          {numberOfPeopleMessage(_numberOfPeopleIndex)}
        </RangeSliderContainer>
      </MenuContent>
      <BackForwardButtons
        onBackClick={numberOfPeopleOnBackClick}
        onForwardClick={numberOfPeopleOnForwardClick}
        forwardText={defaultForwardText}
      />
    </>
  )
}

export default NumberOfPeopleStage;
