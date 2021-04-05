import styled from '@emotion/styled'
import propTypes from 'prop-types'
import { useState } from 'react'
import { Car, Motorcycle, Palette, Scooter, SUV } from '../../icons'
import { FormHeader, Input } from '../../inputs'

const vehicleTypes = [
  { icon: <Car />, text: 'Car' },
  { icon: <SUV />, text: 'SUV/Truck' },
  { icon: <Motorcycle />, text: 'Motorcycle' },
  { icon: <Scooter />, text: 'Scooter' },
]

const CurbsideView = styled('div')`
  margin: 0 0 6rem;
`

const CurbsideHeader = styled('div')`
  h2,
  span {
    display: inline-block;
    vertical-align: middle;
  }

  h2 + span {
    margin: 0 0 0 1rem;
  }
`

const CurbsideVehicleType = styled('div')`
  margin: 2rem 0 0;
`

const CurbsideVehicleTypeLabel = styled('p')`
  font-weight: 300;
  font-size: 1.8rem;
  font-family: ${(props) => props.theme.inputs.family};
  line-height: ${(props) => props.theme.inputs.lineHeight};
  color: ${(props) => props.theme.inputs.borderColor};
  margin: 0 0 1.25rem;
`

const CurbsideButtons = styled('div')`
  display: flex;
  margin: 0 -0.5rem 3rem;
`

const CurbsideButtonView = styled('div')`
  flex: 0 0 25%;
  max-width: 8.8rem;
  padding: 0 0.5rem;
`

const CurbsideButton = styled('button')`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 4.6rem;
  padding: 0;
  border-radius: 1.1rem;
  background-color: ${(props) =>
    props.theme.bgColors[props.checked ? 'dark' : 'secondary']};

  &:hover {
    background-color: ${(props) =>
      props.theme.colors[props.checked ? 'primary' : 'cardHover']};
  }

  &:focus {
    outline: none;
  }

  & > span {
    flex-shrink: 0;
  }
`

const Curbside = ({ details, errors = {}, handleChange }) => {
  const [hasCurbside, setHasCurbside] = useState(
    details.order_fulfillment || false
  )
  const [vehicleType, setVehicleType] = useState(details.vehicle_type || null)

  const handleButton = (evt, type) => {
    evt.preventDefault()
    setVehicleType(type)
    const target = {
      id: 'vehicle_type',
      type: 'text',
      value: type,
    }
    handleChange({ target })
    if (!hasCurbside) {
      setHasCurbside(true)
      const target = {
        id: 'order_fulfillment',
        type: 'checkbox',
        checked: true,
      }
      handleChange({ target })
    }
  }

  return (
    <CurbsideView>
      <FormHeader style={{ margin: '3rem 0 2rem' }}>
        <CurbsideHeader>
          <h2>Curbside Detail</h2>
          <span>(could be added later)</span>
        </CurbsideHeader>
      </FormHeader>
      <CurbsideVehicleType>
        <CurbsideVehicleTypeLabel>Vehicle Type</CurbsideVehicleTypeLabel>
        <CurbsideButtons>
          {vehicleTypes.map((button) => (
            <CurbsideButtonView key={button.text}>
              <CurbsideButton
                onClick={(evt) => handleButton(evt, button.text)}
                checked={vehicleType === button.text}
              >
                {button.icon}
              </CurbsideButton>
            </CurbsideButtonView>
          ))}
        </CurbsideButtons>
      </CurbsideVehicleType>
      <Input
        icon={<Palette />}
        label="Vehicle Color"
        name="vehicle_color"
        type="text"
        value={details.vehicle_color || ''}
        onChange={handleChange}
        error={errors.vehicle_color}
      />
    </CurbsideView>
  )
}

Curbside.displayName = 'Curbside'
Curbside.propTypes = {
  details: propTypes.object,
  errors: propTypes.object,
  handleChange: propTypes.func,
}

export default Curbside
