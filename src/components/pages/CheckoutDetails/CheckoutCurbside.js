import styled from '@emotion/styled'
import propTypes from 'prop-types'

import { Curbside } from '../..'
import { FormHeader } from '../../inputs'

const CheckoutCurbsideView = styled('div')`
  margin: 0 0 6rem;
`

const CheckoutCurbsideHeader = styled('div')`
  h2,
  span {
    display: inline-block;
    vertical-align: middle;
  }

  h2 + span {
    margin: 0 0 0 1rem;
  }
`

const CheckoutCurbside = ({ fields, data, errors = {}, handleChange }) => {
  return (
    <CheckoutCurbsideView>
      <FormHeader style={{ margin: '3rem 0 2rem' }}>
        <CheckoutCurbsideHeader>
          <h2>Curbside Detail</h2>
          <span>(could be added later)</span>
        </CheckoutCurbsideHeader>
      </FormHeader>
      <Curbside
        fields={fields}
        data={data}
        errors={errors}
        handleChange={handleChange}
      />
    </CheckoutCurbsideView>
  )
}

CheckoutCurbside.displayName = 'CheckoutCurbside'
CheckoutCurbside.propTypes = {
  fields: propTypes.array,
  data: propTypes.object,
  errors: propTypes.object,
  handleChange: propTypes.func,
}

export default CheckoutCurbside
