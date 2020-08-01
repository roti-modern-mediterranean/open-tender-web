import React from 'react'
import propTypes from 'prop-types'
import BarLoader from 'react-spinners/BarLoader'

const defaultText = 'Please sit tight. This may take a second.'

const WorkingModal = ({ text = defaultText }) => {
  return (
    <>
      <div className="modal__content">
        <div className="modal__body">
          <div className="modal__working">
            <div className="modal__working__content">
              <p className="ot-color-headings">{text}</p>
            </div>
            <div className="modal__working__loader">
              <BarLoader size={100} loading={true} />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

WorkingModal.displayName = 'WorkingModal'
WorkingModal.propTypes = {
  text: propTypes.string,
}

export default WorkingModal
