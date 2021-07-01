import BackForwardButtons from '../BackForwardButtons'
import React, { useMemo } from 'react'
import { MenuContent } from '../../../HighlightedMenu'
import { defaultForwardText, useManageAllergens, wizardStages } from '../common'
import BuilderOption from '../../../Builder/BuilderOption'

interface SelectMainsStageProps {
  setStage: React.Dispatch<React.SetStateAction<wizardStages>>
}

const SelectMainsStage = ({
  setStage
}:SelectMainsStageProps) => {

  const {options, selectedOptions} = useManageAllergens()
  const selectedOptionsByName = useMemo(
    ()=>selectedOptions.map(id => options.find(option => option.id === id)?.name || "")
    , [options, selectedOptions])

  const selectMainsOnBackClick = useMemo(()=>{
    return () => setStage("servingStyle")
  }, [setStage])

  const selectMainsOnForwardClick = useMemo(()=>{
    return () => setStage("recommendationsResult")
  }, [setStage])

  return (
    <>
      <MenuContent title="Select the mains" subtitle="How many of each mains do you want?">
        <BuilderOption
          perRow={3}
          group={{
            "id":0,
            "included":100, //TODO Make dynamic
            "max":1, //TODO Make dynamic
            "quantity":0 //TODO Make dynamic
          }}
          option={{
            "id":0,
            "name":"Chicken Roti",
            "imageUrl":"//s3.amazonaws.com/betterboh/u/img/prod/46/1618540256_ChickenRoti_BYO.png",
            "allergens":[
              "meat",
              "cilantro / coriander",
              "garlic"
            ],
            "nutritionalInfo":{
              "calories":210,
              "cholesterol":150,
              "dietary_fiber":1,
              "protein":30,
              "saturated_fat":2,
              "serving_size":"3.80",
              "sodium":730,
              "sugars":0,
              "total_carbs":2,
              "total_fat":8,
              "trans_fat":0
            },
            "cals":210,
            "quantity":0, //TODO Make dynamic
            "isDefault":0,  //TODO Change?
            "increment":1,  //TODO Change?
            "max":1, //TODO Make dynamic
            "min":0,
            "isSoldOut":false,
          }}
          soldOut={[]}
          allergenAlerts={selectedOptionsByName}
          displaySettings={{
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
          }}
          incrementOption={()=>{}}
          decrementOption={()=>{}}
          setOptionQuantity={()=>{}}
          activeOption={null}
          setActiveOption={()=>{}}
          setActiveIndex={()=>{}}
          index={0}
          lastIndex={2}
        />
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
