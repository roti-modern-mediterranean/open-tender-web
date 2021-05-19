import propTypes from 'prop-types'
import styled from '@emotion/styled'
import { Input } from './inputs'
import { Car, MapMarker, Palette } from './icons'

const iconMap = {
  vehicle_type: <Car size="2.0rem" />,
  vehicle_color: <Palette />,
  arrival_info: <MapMarker />,
}

const CurbsideSimpleView = styled('div')`
  margin: 3rem 0;
`

const CurbsideSimple = ({ fields, data, errors = {}, handleChange }) => {
  return (
    <CurbsideSimpleView>
      {fields.map((field) => (
        <Input
          key={field.name}
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
    </CurbsideSimpleView>
  )
}

CurbsideSimple.displayName = 'CurbsideSimple'
CurbsideSimple.propTypes = {
  fields: propTypes.array,
  data: propTypes.object,
  errors: propTypes.object,
  handleChange: propTypes.func,
}

export default CurbsideSimple
