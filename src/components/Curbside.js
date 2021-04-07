import { useEffect, useState } from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'
import { Input } from './inputs'
import { Car, MapMarker, Motorcycle, Palette, Scooter, SUV } from './icons'

const iconMap = {
  vehicle_color: <Palette />,
  arrival_info: <MapMarker />,
}

const vehicleTypes = [
  { icon: <Car />, text: 'Car' },
  { icon: <SUV />, text: 'SUV/Truck' },
  { icon: <Motorcycle />, text: 'Motorcycle' },
  { icon: <Scooter />, text: 'Scooter' },
]

const CurbsideView = styled('div')`
  margin: 0 0 3rem;
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

const Curbside = ({ fields, data, errors = {}, handleChange }) => {
  const { order_fulfillment, vehicle_type } = data
  const [hasCurbside, setHasCurbside] = useState(false)
  const [vehicleType, setVehicleType] = useState(null)
  const inputFields = fields.filter((i) => i.name !== 'vehicle_type')
  const hasVehicleType = fields.find((i) => i.name === 'vehicle_type') || false

  useEffect(() => {
    if (!vehicleType) setVehicleType(vehicle_type)
  }, [vehicle_type, vehicleType])

  useEffect(() => {
    if (!hasCurbside) setHasCurbside(order_fulfillment)
  }, [order_fulfillment, hasCurbside])

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
      {hasVehicleType && (
        <CurbsideVehicleType>
          <CurbsideVehicleTypeLabel>Vehicle Type</CurbsideVehicleTypeLabel>
          <CurbsideButtons>
            {vehicleTypes.map((button) => (
              <CurbsideButtonView key={button.text}>
                <CurbsideButton
                  aria-label={button.text}
                  onClick={(evt) => handleButton(evt, button.text)}
                  checked={vehicleType === button.text}
                >
                  {button.icon}
                </CurbsideButton>
              </CurbsideButtonView>
            ))}
          </CurbsideButtons>
        </CurbsideVehicleType>
      )}
      {inputFields.map((field) => (
        <Input
          icon={iconMap[field.name]}
          label={field.label}
          name={field.name}
          type="text"
          placeholder={field.placeholder}
          value={data[field.name]}
          onChange={handleChange}
          error={errors[field.name]}
          disabled={data.has_arrived}
        />
      ))}
    </CurbsideView>
  )
}

Curbside.displayName = 'Curbside'
Curbside.propTypes = {
  fields: propTypes.array,
  data: propTypes.object,
  errors: propTypes.object,
  handleChange: propTypes.func,
}

export default Curbside
