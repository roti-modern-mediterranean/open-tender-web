import styled from '@emotion/styled'
import propTypes from 'prop-types'

const Container = styled.div`
  label: RangeSliderContainer;
  
  > input {
    padding: 0;
    height: 0;
    margin: 1rem 0;
  }
`

const RangeSlider = ({min, max, value, setValue}) => {
  return <Container>
    <input type="range" min={min} max={max} onInput={(ev) => setValue(ev.currentTarget.value)}/>
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
