import styled from '@emotion/styled'
import propTypes from 'prop-types'
import { useCallback, useMemo, useEffect, useRef, useState } from 'react'

const sliderThumbSize = 35;
const sliderThumbBorderSize = 2;

const Container = styled.div`
  label: Container;
`

const Slider = styled.div`
  label: Slider;

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
      -webkit-appearance: none;
      appearance: none;
      width: ${sliderThumbSize + 2*sliderThumbBorderSize}px;
      height: ${sliderThumbSize + 2*sliderThumbBorderSize}px;
      background: ${(props) => props.theme.colors.light};
      cursor: pointer; /* Cursor on hover */
      border: ${(props) => props.theme.colors.paprika} solid ${sliderThumbBorderSize}px;
      border-radius: 50%;
    }
    
    &::-moz-range-thumb {
      width: ${sliderThumbSize}px;
      height: ${sliderThumbSize}px;
      background: ${(props) => props.theme.colors.light};
      cursor: pointer;
      border: ${(props) => props.theme.colors.paprika} solid ${sliderThumbBorderSize}px;
      border-radius: 50%;
    }
  }
`

const SliderImageArea = styled.div`
  label: SliderImageArea;
  
  position: relative;

  display: grid;
  height: ${(props) => props.imageHeight}px;
`

const SliderImage = styled.div`
  label: SliderImage;

  position: absolute;
  top: 0px;
  left: ${(props) => props.y}px;
  width: ${sliderThumbSize + 2*sliderThumbBorderSize}px;
  height: 100%;
  pointer-events:none;
  touch-action:none;
  display: grid;
  align-items: center;
  justify-content: center;
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

const RangeSlider = ({min, max, value, setValue, children}) => {

  const $slider = useRef(null);
  const [containerWidth, setContainerWidth] = useState(0)

  useEffect(()=>{
    if($slider.current){
      const listener = ()=>{
        setContainerWidth($slider.current.offsetWidth)
      };
      listener();
      window.addEventListener("resize", listener)
      return ()=> window.removeEventListener("resize", listener)
    }
  }, [$slider])

  const $sliderImage = useRef(null)
  const [imageHeight, setImageHeight] = useState(sliderThumbSize)

  useEffect(()=>{
    if($sliderImage){
      setImageHeight(Math.max(...Array.from($sliderImage.current.children).map(child => child.offsetWidth)))
    }
  }, [$sliderImage, children])

  const sliderOnInput = useCallback((ev) => setValue(parseInt(ev.currentTarget.value, 10)), [setValue])

  const yPosition = useMemo(()=>((value-min)/(max-min)*(containerWidth - sliderThumbSize - 2*sliderThumbBorderSize))
    , [value, min, max, containerWidth]);

  return (
    <Container>
      {children &&
        <SliderImageArea imageHeight={imageHeight}>
          <SliderImage y={yPosition} ref={$sliderImage}>{children}</SliderImage>
        </SliderImageArea>}
      <Slider ref={$slider}>
        <input type="range" min={min} max={max} value={value} onInput={sliderOnInput}/>
        <SliderValue y={yPosition}>{value}</SliderValue>
      </Slider>
    </Container>)
}

RangeSlider.displayName = 'RangeSlider'
RangeSlider.propTypes = {
  min: propTypes.number,
  max: propTypes.number,
  value: propTypes.number,
  setValue: propTypes.func,
  children: propTypes.oneOfType([
    propTypes.arrayOf(propTypes.node),
    propTypes.node,
  ]),
}

export default RangeSlider;
