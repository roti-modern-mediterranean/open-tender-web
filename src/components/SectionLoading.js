import React from 'react'
import propTypes from 'prop-types'
// import BarLoader from 'react-spinners/BarLoader'
import ClipLoader from 'react-spinners/ClipLoader'

const SectionLoading = ({ loading }) => {
  return loading ? (
    <div className="section__loading">
      <div className="section__loading__loader">
        {/* <BarLoader size={100} loading={isLoading} /> */}
        <ClipLoader size={30} loading={loading} />
      </div>
    </div>
  ) : null
}

SectionLoading.displayName = 'SectionLoading'
SectionLoading.propTypes = {
  loading: propTypes.bool,
}

export default SectionLoading
