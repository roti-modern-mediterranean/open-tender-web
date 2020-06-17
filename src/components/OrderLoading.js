import React from 'react'
import propTypes from 'prop-types'
import ClipLoader from 'react-spinners/ClipLoader'

const OrderLoading = ({ loading }) => {
  return loading ? (
    <div className="order__header">
      <p className="preface">Retrieving your order...</p>
      <div className="order__loading">
        <div className="order__loading__loader">
          <ClipLoader size={24} loading={loading} />
        </div>
      </div>
    </div>
  ) : null
}

OrderLoading.displayName = 'OrderLoading'
OrderLoading.propTypes = {
  loading: propTypes.bool,
}

export default OrderLoading
