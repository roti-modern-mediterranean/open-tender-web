import React from 'react'
import propTypes from 'prop-types'
import { useHistory } from 'react-router-dom'

import { ArrowLeft } from '../icons'
import { ButtonIcon } from '.'

const Back = ({ text = 'Start Over', onClick, color }) => {
  const history = useHistory()

  const startOver = () => {
    history.push(`/`)
  }

  return (
    <ButtonIcon
      icon={(props) => <ArrowLeft {...props} />}
      color={color}
      size={26}
      label={text}
      onClick={onClick || startOver}
    />
  )
}

Back.displayName = 'Back'
Back.propTypes = {
  text: propTypes.string,
  onClick: propTypes.func,
}

export default Back
