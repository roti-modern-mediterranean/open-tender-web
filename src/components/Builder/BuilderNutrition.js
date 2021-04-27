import React from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'
// import { TransitionGroup, CSSTransition } from 'react-transition-group'

export const BuilderNutritionView = styled('div')`
  display: flex;
  justify-content: space-between;
  padding: 0rem 2.5rem 2rem;
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    padding: 0 1.5rem 1.5rem;
  }
`

export const BuilderNutritionList = styled('ul')`
  display: block;
  width: 45%;
`

export const BuilderNutritionListItem = styled('li')`
  width: 100%;
  padding: 0.5rem 0 0;
  font-size: 1.2rem;
  color: ${(props) => props.theme.colors.primary};
  line-height: ${(props) => props.theme.lineHeight};

  display: flex;
  justify-content: space-between;
  align-items: center;

  span {
    display: block;
  }
`

const LineItem = ({ name, value, unit = '' }) => (
  <BuilderNutritionListItem>
    <span>{name}</span>
    <span>
      {value}
      {unit}
    </span>
  </BuilderNutritionListItem>
)

LineItem.displayName = 'LineItem'
LineItem.propTypes = {
  name: propTypes.string,
  value: propTypes.string,
  unit: propTypes.string,
}

const BuilderNutritonContent = ({ nutritionalInfo }) => {
  const {
    calories,
    cholesterol,
    dietary_fiber,
    protein,
    saturated_fat,
    serving_size,
    sodium,
    sugars,
    total_carbs,
    total_fat,
    trans_fat,
  } = nutritionalInfo || {}
  return (
    <BuilderNutritionView>
      <BuilderNutritionList>
        <LineItem name="Serving Size" value={serving_size} unit="oz" />
        <LineItem name="Calories" value={calories} />
        <LineItem name="Total Fat" value={total_fat} unit="g" />
        <LineItem name="Saturated Fat" value={saturated_fat} unit="g" />
        <LineItem name="Trans Fat" value={trans_fat} unit="g" />
        <LineItem name="Cholesterol" value={cholesterol} unit="mg" />
      </BuilderNutritionList>
      <BuilderNutritionList>
        <LineItem name="Sodium" value={sodium} unit="mg" />
        <LineItem name="Total Carbs" value={total_carbs} unit="g" />
        <LineItem name="Dietary Fiber" value={dietary_fiber} unit="g" />
        <LineItem name="Sugars" value={sugars} unit="g" />
        <LineItem name="Protein" value={protein} unit="g" />
      </BuilderNutritionList>
    </BuilderNutritionView>
  )
}

BuilderNutritonContent.displayName = 'BuilderNutritonContent'
BuilderNutritonContent.propTypes = {
  nutritionalInfo: propTypes.object,
}

const BuilderNutrition = ({ nutritionalInfo, show = true }) => {
  // const showInfo = nutritionalInfo && show ? true : false

  return <BuilderNutritonContent nutritionalInfo={nutritionalInfo} />

  // return (
  //   <TransitionGroup component={null}>
  //     {showInfo ? (
  //       <CSSTransition
  //         key="nutritionalInfo"
  //         classNames="reveal"
  //         timeout={{ enter: 250, exit: 250 }}
  //       >
  //         <BuilderNutritonContent nutritionalInfo />
  //       </CSSTransition>
  //     ) : null}
  //   </TransitionGroup>
  // )
}

BuilderNutrition.displayName = 'BuilderNutrition'
BuilderNutrition.propTypes = {
  nutritionalInfo: propTypes.object,
  show: propTypes.bool,
}

export default BuilderNutrition
