import BackForwardButtons from '../BackForwardButtons'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { MenuContent } from '../../../HighlightedMenu'
import { defaultForwardText, useManageAllergens, wizardStages } from '../common'
import BuilderOption from '../../../Builder/BuilderOption'
import styled from '@emotion/styled'
import { useDispatch, useSelector } from 'react-redux'
import {
  selectChickenQuantity,
  selectFalafelQuantity,
  selectNumberOfPeople,
  selectSteakQuantity, selectTotalQuantity,
  setChickenQuantity,
  setFalafelQuantity,
  setNumberOfPeopleIndex,
  setSteakQuantity, setTotalQuantity
} from '../../../../slices/recommendationsSlice'
import BuilderOptionToggle from '../../../Builder/BuilderOptionToggle'

const incrementSteps = 1;

const OptionsRow = styled.div`
  label: OptionsRow;

  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  margin: 1rem -0.5rem;
  align-self: flex-start;
`

const CustomBuilderOption = styled(BuilderOption)`
  label: CustomBuilderOption;
  
  button > span:nth-of-type(2) {
    visibility: hidden;
  }
`;

const MainsMissing = styled.div<{mainsMissing: number}>`
  label: MainsMissing;

  font-family: ${(props) => props.theme.fonts.preface.family};
  font-size: ${(props) => props.theme.fonts.preface.fontSize};
  text-transform: ${(props) => props.theme.fonts.preface.textTransform};
  font-weight: ${(props) => props.theme.fonts.preface.weight};
  color: ${(props) => props.mainsMissing === 0 
          ? props.theme.colors.pepper 
          : props.theme.colors.paprika};
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
    calories: false,
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

const noop = ()=>{}

const SelectMainsStage = ({
  setStage
}:SelectMainsStageProps) => {

  const dispatch = useDispatch()

  const numberOfPeople = useSelector(selectNumberOfPeople)

  const {options, selectedOptions} = useManageAllergens()
  const selectedOptionsByName = useMemo(
    ()=>selectedOptions.map(id => options.find(option => option.id === id)?.name || "")
    , [options, selectedOptions])

  const _chickenQuantity = useSelector(selectChickenQuantity)
  const _setChickenQuantity = useCallback((quantity) => dispatch(setChickenQuantity(quantity)), [dispatch])
  const _steakQuantity = useSelector(selectSteakQuantity)
  const _setSteakQuantity = useCallback((quantity) => dispatch(setSteakQuantity(quantity)), [dispatch])
  const _falafelQuantity = useSelector(selectFalafelQuantity)
  const _setFalafelQuantity = useCallback((quantity) => dispatch(setFalafelQuantity(quantity)), [dispatch])
  const _totalQuantity = useSelector(selectTotalQuantity)
  const _setTotalQuantity = useCallback((quantity) => dispatch(setTotalQuantity(quantity)), [dispatch])

  useEffect(()=>{
    if(_totalQuantity !== numberOfPeople){
      _setTotalQuantity(numberOfPeople)

      const initialNumberOfSteak = Math.floor(numberOfPeople * 0.2)
      const initialNumberOfFalafel = Math.floor(numberOfPeople * 0.2)

      _setSteakQuantity(initialNumberOfSteak)
      _setFalafelQuantity(initialNumberOfFalafel)
      _setChickenQuantity(numberOfPeople-initialNumberOfSteak-initialNumberOfFalafel)
    }
  }, [numberOfPeople, _totalQuantity, _setChickenQuantity, _setSteakQuantity, _setFalafelQuantity, _setTotalQuantity])

  const [activeOption, setActiveOption] = useState<string|null>(null)

  const chickenIncrementOption = useCallback(
    ()=>_setChickenQuantity(_chickenQuantity+1)
    , [_setChickenQuantity, _chickenQuantity])

  const chickenDecrementOption = useCallback(
    ()=>_setChickenQuantity(_chickenQuantity-1)
    , [_setChickenQuantity, _chickenQuantity])

  const chickenSetOptionQuantity = useCallback(
    (_groupId:number, _optionId:number, quantity:number)=>_setChickenQuantity(quantity)
    , [_setChickenQuantity])

  const steakIncrementOption = useCallback(
    ()=>_setSteakQuantity(_steakQuantity+1)
    , [_setSteakQuantity, _steakQuantity])

  const steakDecrementOption = useCallback(
    ()=>_setSteakQuantity(_steakQuantity-1)
    , [_setSteakQuantity, _steakQuantity])

  const steakSetOptionQuantity = useCallback(
    (_groupId:number, _optionId:number, quantity:number)=>_setSteakQuantity(quantity)
    , [_setSteakQuantity])

  const falafelIncrementOption = useCallback(
    ()=>_setFalafelQuantity(_falafelQuantity+1)
    , [_setFalafelQuantity, _falafelQuantity])

  const falafelDecrementOption = useCallback(
    ()=>_setFalafelQuantity(_falafelQuantity-1)
    , [_setFalafelQuantity, _falafelQuantity])

  const falafelSetOptionQuantity = useCallback(
    (_groupId:number, _optionId:number, quantity:number)=>_setFalafelQuantity(quantity)
    , [_setFalafelQuantity])

  const selectMainsOnBackClick = useMemo(()=>{
    return () => setStage("servingStyle")
  }, [setStage])

  const selectMainsOnForwardClick = useMemo(()=>{
    if(numberOfPeople !== _chickenQuantity + _steakQuantity + _falafelQuantity){
      return null;
    }
    return () => setStage("recommendationsResult")
  }, [numberOfPeople, _chickenQuantity, _steakQuantity, _falafelQuantity, setStage])

  const active = useMemo(()=>{
    switch(activeOption) {
      case "0-0":
        return chickenOption(_chickenQuantity, _steakQuantity, _falafelQuantity, numberOfPeople);
      case "0-1":
        return steakOption(_chickenQuantity, _steakQuantity, _falafelQuantity, numberOfPeople);
      case "0-2":
        return falafelOption(_chickenQuantity, _steakQuantity, _falafelQuantity, numberOfPeople);
      default:
        return null;
    }
  }, [activeOption])

  const mainsMissing = numberOfPeople-_chickenQuantity-_steakQuantity-_falafelQuantity

  const builderOptionToggleProps = useMemo(()=>({
      show: !!active,
      option: active,
      setActiveOption
    }), [active, setActiveOption])

  return (
    <>
      <MenuContent title="Select the mains" subtitle="How many of each mains do you want?">
        <OptionsRow>
          <CustomBuilderOption
            perRow={3}
            group={optionsGroup(numberOfPeople, _chickenQuantity, _steakQuantity, _falafelQuantity)}
            option={chickenOption(_chickenQuantity, _steakQuantity, _falafelQuantity, numberOfPeople)}
            soldOut={emptyNumberArray}
            allergenAlerts={selectedOptionsByName}
            displaySettings={displaySettings}
            incrementOption={chickenIncrementOption}
            decrementOption={chickenDecrementOption}
            setOptionQuantity={chickenSetOptionQuantity}
            activeOption={activeOption}
            setActiveOption={setActiveOption}
            setActiveIndex={noop}
            index={0}
            lastIndex={2}
            isQuantityAlwaysShown={true}
          />
          <CustomBuilderOption
            perRow={3}
            group={optionsGroup(numberOfPeople, _chickenQuantity, _steakQuantity, _falafelQuantity)}
            option={steakOption(_chickenQuantity, _steakQuantity, _falafelQuantity, numberOfPeople)}
            soldOut={emptyNumberArray}
            allergenAlerts={selectedOptionsByName}
            displaySettings={displaySettings}
            incrementOption={steakIncrementOption}
            decrementOption={steakDecrementOption}
            setOptionQuantity={steakSetOptionQuantity}
            activeOption={activeOption}
            setActiveOption={setActiveOption}
            setActiveIndex={noop}
            index={1}
            lastIndex={2}
            isQuantityAlwaysShown={true}
          />
          <CustomBuilderOption
            perRow={3}
            group={optionsGroup(numberOfPeople, _chickenQuantity, _steakQuantity, _falafelQuantity)}
            option={falafelOption(_chickenQuantity, _steakQuantity, _falafelQuantity, numberOfPeople)}
            soldOut={emptyNumberArray}
            allergenAlerts={selectedOptionsByName}
            displaySettings={displaySettings}
            incrementOption={falafelIncrementOption}
            decrementOption={falafelDecrementOption}
            setOptionQuantity={falafelSetOptionQuantity}
            activeOption={activeOption}
            setActiveOption={setActiveOption}
            setActiveIndex={noop}
            index={2}
            lastIndex={2}
            isQuantityAlwaysShown={true}
          />
        </OptionsRow>
        <MainsMissing mainsMissing={mainsMissing} >
          {mainsMissing === 0 ? `Happy with the distribution?` : `You can select ${mainsMissing} more main${mainsMissing === 1 ? "" : "s"}`}
        </MainsMissing>
        <BuilderOptionToggle {...builderOptionToggleProps}/>
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
