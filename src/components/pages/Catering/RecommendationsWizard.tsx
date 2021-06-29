import { ArrowRight } from '../../icons'
import { Loading } from '../../index'
import HighlightedMenu, { MenuContent } from '../../HighlightedMenu'
import OptionsMenu from '../../OptionsMenu'
import {
  eventTypeOptions,
  numberOfPeopleOptions,
  selectEventType,
  selectNumberOfPeopleIndex, setEventType, setNumberOfPeopleIndex
} from '../../../slices/recommendationSlice'
import RangeSlider from '../../RangeSlider'
import AllergenOptions from './AllergenOptions'
import BackForwardButtons from './BackForwardButtons'
import React, { Dispatch, SetStateAction, useCallback, useMemo } from 'react'
import { CateringContent, CateringMessage, cateringStages } from './common'
import styled from '@emotion/styled'
import CallUsButton from './CallUsButton'
import ChatButton from './ChatButton'
import Person from '../../icons/Person'
import GroupOf3People from '../../icons/GroupOf3People'
import GroupOf6People from '../../icons/GroupOf6People'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { selectRevenueCenter } from '@open-tender/redux'
import { useTheme } from '@emotion/react'
import RecommendationsResult from './RecommendationsResult'

const SkipRecommendations = styled.button`
  label: SkipRecommendations;

  opacity: 0;
  animation: slide-up 0.25s ease-in-out 0.25s forwards;

  text-align: left;
  color: ${(props) => props.theme.colors.light};
  border-top: 1px solid #ffffff50;
  padding-top: 1rem;
  width: 100%;
  cursor: pointer;
  transition: background-color 0.25s ease;
  
  grid-area: shortcut;

  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    width: auto;
    border: none;
    margin-top: 0;
  }
  
  h2 {
    opacity: 0;
    animation: slide-up 0.25s ease-in-out 0.25s forwards;
    
    font-size: 30px;
    font-weight: 500;
    
    @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
      font-family: ${(props) => props.theme.fonts.preface.family};
      font-weight: 500;
      font-size: 2.8rem;
      letter-spacing: 0.01em;
      margin: 0 0 1rem;
    }
  }
  
  p {
    opacity: 0;
    animation: slide-up 0.25s ease-in-out 0.25s forwards;
    
    font-size: 18px;
    line-height: 28px;
    
    @media (max-width: ${(props) => props.theme.breakpoints.narrow}) {
      font-size: 2.3rem;
    }
    @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
      font-size: 1.5rem;
      line-height: 1.45;
      font-weight: 500;
    }
  }
  
  span {
    color: ${(props) => props.theme.colors.paprika};
  }
`

const AnimatedHighlightedMenu = styled(HighlightedMenu)`
  label: AnimatedHighlightedMenu;

  opacity: 0;
  animation: slide-up 0.25s ease-in-out 0.25s forwards;
  display: flex;
  flex-direction: column;
  
  grid-area: options;

  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    position: relative;
    flex: 1 1 auto;
    max-width: none;
  }
`;

const RangeSliderContainer = styled.div`
  label: RangeSliderContainer;
  
  height: 22rem;
`

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
  margin: 5px 0px;

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

const SkipIcon = styled.span`
  display: inline-flex;
  width: 12px;
  margin-left: 10px;
`

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
  return (
    <RangeSliderMessageContainer>
      <RangeSliderMessage>Nice, let's get it going!</RangeSliderMessage>
      <RangeSliderSubMessage>Contact us directly for big orders</RangeSliderSubMessage>
      <RangeSliderMessageButtons>
        <CallUsButton/>
        <ChatButton/>
      </RangeSliderMessageButtons>
    </RangeSliderMessageContainer>
  )
}

interface NumberOfPeopleImageProps {
  index: number,
  size?: string,
  color?: string
}

const NumberOfPeopleImage = ({
  index, size, color
}:NumberOfPeopleImageProps) => {
  if(index < 1){
    return <Person size={size} color={color}/>;
  }
  if(index < 4){
    return <GroupOf3People size={size} color={color}/>;
  }
  return <GroupOf6People size={size} color={color}/>
}

interface RecommendationWizardProps {
  stage: cateringStages,
  setStage: Dispatch<SetStateAction<cateringStages>>
}

const RecommendationsWizard = ({
  stage,
  setStage
}:RecommendationWizardProps) => {

  const history = useHistory()
  const dispatch = useDispatch()
  const theme = useTheme()

  const revenueCenter =
    useSelector(selectRevenueCenter)

  const selectedEventTypes = useSelector(selectEventType)
  const setSelectedEventTypes = useCallback((eventType) => dispatch(setEventType(eventType)), [dispatch])
  const _numberOfPeopleIndex = useSelector(selectNumberOfPeopleIndex)
  const _setNumberOfPeopleIndex = useCallback((numberOfPeopleIndex) => dispatch(setNumberOfPeopleIndex(numberOfPeopleIndex)), [dispatch])

  const skipRecommendationsOnCLick = useCallback(()=>{
    if(revenueCenter){
      history.push(`/menu/${revenueCenter.slug}`)
    }
  }, [history, revenueCenter])

  const highlightedMenuOnBackClick = useMemo(() => {
    switch(stage){
      case "eventType":
        return () => setStage("address")
      case "numberOfPeople":
        return () => setStage("eventType")
      case "dietaryRestrictions":
        return () => setStage("numberOfPeople")
      default:
        return null
    }
  }, [stage, setStage])

  const highlightedMenuOnForwardClick = useMemo(() => {
    switch(stage){
      case "eventType":
        if(selectedEventTypes.length === 0) {
          return null;
        }
        return () => setStage("numberOfPeople")
      case "numberOfPeople":
        if(_numberOfPeopleIndex < 1){
          return null;
        }
        if(_numberOfPeopleIndex > 5){
          return null;
        }
        return () => setStage("dietaryRestrictions")
      case "dietaryRestrictions":
        return () => setStage("recommendations")
      default:
        return null
    }
  }, [stage, setStage, selectedEventTypes, _numberOfPeopleIndex])

  return (
    <>
      <CateringContent>
        <CateringMessage>
          <h2>Build the main event</h2>
          <p>
            Choose how many people you're serving, when, and where and build your own menu.
          </p>
        </CateringMessage>
        <SkipRecommendations onClick={skipRecommendationsOnCLick}>
          {
            revenueCenter
              ? (
                <>
                  <h2>Take a shortcut</h2>
                  <p>
                    Skip straight to the menu to browse all our packages and start your order
                    <SkipIcon><ArrowRight /></SkipIcon>
                  </p>
                </>)
              : <Loading text="Loading store..." color={theme.colors.tahini} />
          }
        </SkipRecommendations>
        <AnimatedHighlightedMenu>
          {stage === "eventType" &&
          <MenuContent title="Type of event" subtitle="What kind of get together are we having?">
            <OptionsMenu
              options={eventTypeOptions}
              selectedOptions={selectedEventTypes}
              setSelectedOptions={setSelectedEventTypes}
            />
          </MenuContent>
          }
          {stage === "numberOfPeople" &&
          <MenuContent title="Number of people" subtitle="How big is your group?">
            <RangeSliderContainer>
              <RangeSlider options={numberOfPeopleOptions} index={_numberOfPeopleIndex} setIndex={_setNumberOfPeopleIndex}>
                <NumberOfPeopleImage index={_numberOfPeopleIndex} size="60px"/>
              </RangeSlider>
              {numberOfPeopleMessage(_numberOfPeopleIndex)}
            </RangeSliderContainer>
          </MenuContent>
          }
          {stage === "dietaryRestrictions" &&
          <MenuContent title="Dietary restrictions" subtitle="Any ingredients we should rule out?">
            <AllergenOptions/>
          </MenuContent>
          }
          <BackForwardButtons
            onBackClick={highlightedMenuOnBackClick}
            onForwardClick={highlightedMenuOnForwardClick}
            forwardText="Confirm"
          />
        </AnimatedHighlightedMenu>
      </CateringContent>
      {stage === "recommendations" && (
        <RecommendationsResult/>
      )}
    </>
  )
}

export default RecommendationsWizard;
