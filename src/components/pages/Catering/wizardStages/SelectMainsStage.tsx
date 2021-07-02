import BackForwardButtons from '../BackForwardButtons'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { MenuContent } from '../../../HighlightedMenu'
import { defaultForwardText, useManageAllergens, wizardStages } from '../common'
import BuilderOption from '../../../Builder/BuilderOption'
import styled from '@emotion/styled'
import { useSelector } from 'react-redux'
import {
  selectNumberOfPeople,
} from '../../../../slices/recommendationsSlice'

const incrementSteps = 1;

const OptionsRow = styled.div`
  label: OptionsRow;

  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  margin: 0 -0.5rem;
`

const MainsMissing = styled.div`
  label: MainsMissing;

  font-family: ${(props) => props.theme.fonts.preface.family};
  font-size: ${(props) => props.theme.fonts.preface.fontSize};
  text-transform: ${(props) => props.theme.fonts.preface.textTransform};
  font-weight: ${(props) => props.theme.fonts.preface.weight};
`

interface OptionsGroup {
  id: number,
  included: number,
  max: number,
  quantity: number
}

const optionsGroup = (numberOfPeople:number, chickenQuantity:number, beefQuantity:number, falafelQuantity:number):OptionsGroup => ({
  id: 0,
  included: numberOfPeople,
  max: numberOfPeople,
  quantity: chickenQuantity+beefQuantity+falafelQuantity
})

interface Option {
  id: number,
  name: string,
  imageUrl: string,
  allergens: string[],
  nutritionalInfo:{
    calories: number,
    cholesterol: number,
    dietary_fiber: number,
    protein: number,
    saturated_fat: number,
    serving_size: string,
    sodium: number,
    sugars: number,
    total_carbs: number,
    total_fat: number,
    trans_fat: number
  },
  cals: number,
  quantity: number,
  increment: number,
  max: number,
  min: number,
  isSoldOut: boolean,
}

const chickenOption = (chickenQuantity:number, steakQuantity:number, falafelQuantity:number, numberOfPeople: number):Option => ({
  id:0,
  name:"Chicken Roti",
  imageUrl:"//s3.amazonaws.com/betterboh/u/img/prod/46/1618540256_ChickenRoti_BYO.png",
  allergens:[
    "meat",
    "cilantro / coriander",
    "garlic"
  ],
  nutritionalInfo:{
    calories:210,
    cholesterol:150,
    dietary_fiber:1,
    protein:30,
    saturated_fat:2,
    serving_size:"3.80",
    sodium:730,
    sugars:0,
    total_carbs:2,
    total_fat:8,
    trans_fat:0
  },
  cals:210,
  quantity: chickenQuantity,
  increment: incrementSteps,
  max: numberOfPeople-steakQuantity-falafelQuantity,
  min:0,
  isSoldOut:false,
})

const steakOption = (chickenQuantity:number, steakQuantity:number, falafelQuantity:number, numberOfPeople: number):Option => ({
  id:1,
  name:"Steak Roti",
  imageUrl:"//s3.amazonaws.com/betterboh/u/img/prod/46/1618540390_SteakRoti_BYO_Overheads.png",
  allergens:[
    "meat",
    "cilantro / coriander",
    "garlic",
    "sesame"
  ],
  nutritionalInfo:{
    calories:260,
    cholesterol:85,
    dietary_fiber:0,
    protein:27,
    saturated_fat:5,
    serving_size: "3.80",
    sodium:433,
    sugars:0,
    total_carbs:3,
    total_fat:15,
    trans_fat:0
  },
  cals: 260,
  quantity: steakQuantity,
  increment: incrementSteps,
  max: numberOfPeople-chickenQuantity-falafelQuantity,
  min:0,
  isSoldOut:false,
})

const falafelOption = (chickenQuantity:number, steakQuantity:number, falafelQuantity:number, numberOfPeople: number):Option => ({
  id:2,
  name:"Falafel",
  imageUrl:"//s3.amazonaws.com/betterboh/u/img/prod/46/1618540270_Falafel_BYO.png",
  allergens:[
    "cilantro / coriander",
    "garlic"
  ],
  nutritionalInfo:{
    calories:222,
    cholesterol:0,
    dietary_fiber:6,
    protein:5,
    saturated_fat:1,
    serving_size: "4.00",
    sodium:497,
    sugars:2,
    total_carbs:24,
    total_fat:11,
    trans_fat:0
  },
  cals: 222,
  quantity: falafelQuantity,
  increment: incrementSteps,
  max: numberOfPeople-chickenQuantity-steakQuantity,
  min:0,
  isSoldOut:false,
})

const displaySettings = {
  allergens: true,
    builderImages: true,
    builderType: "DEFAULT",
    calories: true,
    madeFor: true,
    menuHero: true,
    menuHeroChild: true,
    menuHeroChildMobile: true,
    menuHeroMobile: true,
    menuImages: true,
    modifierDescription: false,
    modifierImage: true,
    notes: true,
    quickAdd: true,
    quickAddMobile: true,
    storePhone: true,
    tags: true
}

const emptyNumberArray:number[] = []

interface SelectMainsStageProps {
  setStage: React.Dispatch<React.SetStateAction<wizardStages>>
}

const SelectMainsStage = ({
  setStage
}:SelectMainsStageProps) => {

  const numberOfPeople = useSelector(selectNumberOfPeople)

  const {options, selectedOptions} = useManageAllergens()
  const selectedOptionsByName = useMemo(
    ()=>selectedOptions.map(id => options.find(option => option.id === id)?.name || "")
    , [options, selectedOptions])

  const [chickenQuantity, setChickenQuantity] = useState(0)
  const [steakQuantity, setSteakQuantity] = useState(0)
  const [falafelQuantity, setFalafelQuantity] = useState(0)

  useEffect(()=>{
    const initialNumberOfSteak = Math.floor(numberOfPeople * 0.2)
    const initialNumberOfFalafel = Math.floor(numberOfPeople * 0.2)
    setSteakQuantity(initialNumberOfSteak)
    setFalafelQuantity(initialNumberOfFalafel)
    setChickenQuantity(numberOfPeople-initialNumberOfSteak-initialNumberOfFalafel)
  }, [numberOfPeople, setSteakQuantity, setFalafelQuantity, setChickenQuantity])

  const [activeOption, setActiveOption] = useState<string|null>(null)

  const chickenIncrementOption = useCallback(
    ()=>setChickenQuantity(chickenQuantity+1)
    , [setChickenQuantity, chickenQuantity])

  const chickenDecrementOption = useCallback(
    ()=>setChickenQuantity(chickenQuantity-1)
    , [setChickenQuantity, chickenQuantity])

  const chickenSetOptionQuantity = useCallback(
    (_groupId:number, _optionId:number, quantity:number)=>setChickenQuantity(quantity)
    , [setChickenQuantity])

  const steakIncrementOption = useCallback(
    ()=>setSteakQuantity(steakQuantity+1)
    , [setSteakQuantity, steakQuantity])

  const steakDecrementOption = useCallback(
    ()=>setSteakQuantity(steakQuantity-1)
    , [setSteakQuantity, steakQuantity])

  const steakSetOptionQuantity = useCallback(
    (_groupId:number, _optionId:number, quantity:number)=>setSteakQuantity(quantity)
    , [setSteakQuantity])

  const falafelIncrementOption = useCallback(
    ()=>setFalafelQuantity(falafelQuantity+1)
    , [setFalafelQuantity, falafelQuantity])

  const falafelDecrementOption = useCallback(
    ()=>setFalafelQuantity(falafelQuantity-1)
    , [setFalafelQuantity, falafelQuantity])

  const falafelSetOptionQuantity = useCallback(
    (_groupId:number, _optionId:number, quantity:number)=>setFalafelQuantity(quantity)
    , [setFalafelQuantity])

  const selectMainsOnBackClick = useMemo(()=>{
    return () => setStage("servingStyle")
  }, [setStage])

  const selectMainsOnForwardClick = useMemo(()=>{
    if(numberOfPeople !== chickenQuantity + steakQuantity + falafelQuantity){
      return null;
    }
    return () => setStage("recommendationsResult")
  }, [numberOfPeople, chickenQuantity, steakQuantity, falafelQuantity, setStage])

  return (
    <>
      <MenuContent title="Select the mains" subtitle="How many of each mains do you want?">
        <OptionsRow>
          <BuilderOption
            perRow={3}
            group={optionsGroup(numberOfPeople, chickenQuantity, steakQuantity, falafelQuantity)}
            option={chickenOption(chickenQuantity, steakQuantity, falafelQuantity, numberOfPeople)}
            soldOut={emptyNumberArray}
            allergenAlerts={selectedOptionsByName}
            displaySettings={displaySettings}
            incrementOption={chickenIncrementOption}
            decrementOption={chickenDecrementOption}
            setOptionQuantity={chickenSetOptionQuantity}
            activeOption={activeOption}
            setActiveOption={setActiveOption}
            setActiveIndex={()=>{}}
            index={0}
            lastIndex={2}
          />
          <BuilderOption
            perRow={3}
            group={optionsGroup(numberOfPeople, chickenQuantity, steakQuantity, falafelQuantity)}
            option={steakOption(chickenQuantity, steakQuantity, falafelQuantity, numberOfPeople)}
            soldOut={emptyNumberArray}
            allergenAlerts={selectedOptionsByName}
            displaySettings={displaySettings}
            incrementOption={steakIncrementOption}
            decrementOption={steakDecrementOption}
            setOptionQuantity={steakSetOptionQuantity}
            activeOption={activeOption}
            setActiveOption={setActiveOption}
            setActiveIndex={()=>{}}
            index={1}
            lastIndex={2}
          />
          <BuilderOption
            perRow={3}
            group={optionsGroup(numberOfPeople, chickenQuantity, steakQuantity, falafelQuantity)}
            option={falafelOption(chickenQuantity, steakQuantity, falafelQuantity, numberOfPeople)}
            soldOut={emptyNumberArray}
            allergenAlerts={selectedOptionsByName}
            displaySettings={displaySettings}
            incrementOption={falafelIncrementOption}
            decrementOption={falafelDecrementOption}
            setOptionQuantity={falafelSetOptionQuantity}
            activeOption={activeOption}
            setActiveOption={setActiveOption}
            setActiveIndex={()=>{}}
            index={2}
            lastIndex={2}
          />
        </OptionsRow>
        <MainsMissing>
          Mains missing: {numberOfPeople-chickenQuantity-steakQuantity-falafelQuantity}
        </MainsMissing>
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
