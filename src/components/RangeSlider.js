import styled from '@emotion/styled'
import propTypes from 'prop-types'
import { useCallback, useMemo, useEffect, useRef, useState } from 'react'

const sliderThumbSize = 35;
const sliderThumbBorderSize = 2;

const Container = styled.div`
  label: RangeSliderContainer;

  position: relative;

  display: grid;
  height: ${sliderThumbSize}px;
  
  > input {
    padding: 0;
    height: 3px;
    margin: 0;
    background-color: #000000;
    opacity: 1;
    border-radius: 3px;
    
    position: absolute;
    top: ${sliderThumbSize/2}px;
    
    &::-webkit-slider-thumb {
      -webkit-appearance: none; /* Override default look */
      appearance: none;
      width: ${sliderThumbSize}px; /* Set a specific slider handle width */
      height: ${sliderThumbSize}px; /* Slider handle height */
      background: #${(props) => props.theme.colors.light}; /* Green background */
      cursor: pointer; /* Cursor on hover */
      border: ${(props) => props.theme.colors.paprika} solid ${sliderThumbBorderSize}px;
      border-radius: 50%;
    }
    
    &::-moz-range-thumb {
      width: ${sliderThumbSize}px; /* Set a specific slider handle width */
      height: ${sliderThumbSize}px; /* Slider handle height */
      background: #${(props) => props.theme.colors.light}; /* Green background */
      cursor: pointer; /* Cursor on hover */
      border: ${(props) => props.theme.colors.paprika} solid ${sliderThumbBorderSize}px;
      border-radius: 50%;
    }
  }
`

const SliderValue = styled.div`
  label: SliderValue;
  
  position: absolute;
  top: 0px;
  left: ${(props) => props.y}px;
  width: ${sliderThumbSize + 2*sliderThumbBorderSize}px;
  height: ${sliderThumbSize + sliderThumbBorderSize}px;
  pointer-events:none;
  touch-action:none;
  display: grid;
  align-items: center;
  justify-content: center;
  color: ${(props)=>props.theme.colors.paprika};
  font-weight: 500;
  font-size: 16px;
  font-family: 'Barlow', sans-serif;
`

const RangeSlider = ({min, max, value, setValue}) => {

  const $container = useRef(null);
  const [containerWidth, setContainerWidth] = useState(0)

  useEffect(()=>{
    if($container.current){
      const listener = ()=>{
        setContainerWidth($container.current.offsetWidth)
      };
      listener();
      window.addEventListener("resize", listener)
      return ()=> window.removeEventListener("resize", listener)
    }
  }, [$container])

  const sliderOnInput = useCallback((ev) => setValue(ev.currentTarget.value), [setValue])

  const yPosition = useMemo(()=>((value-min)/(max-min)*(containerWidth - sliderThumbSize - 2*sliderThumbBorderSize))
    , [value, min, max, containerWidth]);

  return <Container ref={$container}>
    <input type="range" min={min} max={max} value={value} onInput={sliderOnInput}/>
    <SliderValue y={yPosition}>{value}</SliderValue>
  </Container>
}

RangeSlider.displayName = 'RangeSlider'
RangeSlider.propTypes = {
  min: propTypes.number,
  max: propTypes.number,
  value: propTypes.number,
  setValue: propTypes.func,
}

export default RangeSlider;
