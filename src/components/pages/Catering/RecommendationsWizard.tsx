import { ArrowRight } from '../../icons'
import { Loading } from '../../index'
import HighlightedMenu from '../../HighlightedMenu'
import React, { useCallback, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { CateringContent, CateringMessage, wizardStages } from './common'
import styled from '@emotion/styled'
import { useSelector } from 'react-redux'
import { selectRevenueCenter } from '@open-tender/redux'
import { useTheme } from '@emotion/react'
import RecommendationsResult from './RecommendationsResult'
import EventTypeStage from './wizardStages/EventTypeStage'
import NumberOfPeopleStage from './wizardStages/NumberOfPeopleStage'
import BigEventFormStage from './wizardStages/BigEventFormStage'
import SentBigEventFormStage from './wizardStages/SentBigEventFormStage'
import DietaryRestrictionsStage from './wizardStages/DietaryRestrictionsStage'
import ServingStyleStage from './wizardStages/ServingStyleStage'
import SelectMainsStage from './wizardStages/SelectMainsStage'

const SkipRecommendations = styled.button`
  label: SkipRecommendations;

  opacity: 0;
  animation: ${(props) => props.theme.animations.fast};

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
    animation: ${(props) => props.theme.animations.fast};
    
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
    animation: ${(props) => props.theme.animations.fast};
    
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
  animation: ${(props) => props.theme.animations.fast};
  display: flex;
  flex-direction: column;
  
  grid-area: options;

  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    position: relative;
    flex: 1 1 auto;
    max-width: none;
  }
`;

const SkipIcon = styled.span`
  display: inline-flex;
  width: 12px;
  margin-left: 10px;
`

interface RecommendationsWizardProps{
  goBack: () => void
}

const RecommendationsWizard = ({
  goBack
}:RecommendationsWizardProps) => {

  const history = useHistory()
  const theme = useTheme()

  const [stage, setStage] = useState<wizardStages>("eventType")

  const revenueCenter =
    useSelector(selectRevenueCenter)

  const skipRecommendationsOnCLick = useCallback(()=>{
    if(revenueCenter){
      history.push(`/menu/${revenueCenter.slug}`)
    }
  }, [history, revenueCenter])

  return (
    <>
      {stage !== "recommendationsResult"
        ? (
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
                <EventTypeStage goBack={goBack} setStage={setStage}/>
              }
              {stage === "numberOfPeople" &&
                <NumberOfPeopleStage setStage={setStage}/>
              }
              {stage === "bigEventForm" &&
                <BigEventFormStage setStage={setStage}/>
              }
              {stage === "sentBigEventForm" &&
                <SentBigEventFormStage />
              }
              {stage === "dietaryRestrictions" &&
                <DietaryRestrictionsStage setStage={setStage}/>
              }
              {stage === "servingStyle" &&
                <ServingStyleStage setStage={setStage}/>
              }
              {stage === "selectMains" &&
                <SelectMainsStage setStage={setStage}/>
              }
            </AnimatedHighlightedMenu>
          </CateringContent>)
        : <RecommendationsResult/>
      }
    </>
  )
}

export default RecommendationsWizard;
