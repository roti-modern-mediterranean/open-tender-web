import React from 'react'
import propTypes from 'prop-types'

import { HeaderMobile } from '.'
import { Account, Home } from './buttons'

const HeaderDefault = ({
  maxWidth = '76.8rem',
  title,
  bgColor = 'primary',
  borderColor = 'primary',
}) => {
  return (
    <HeaderMobile
      title={title}
      maxWidth={maxWidth}
      bgColor={bgColor}
      borderColor={borderColor}
      left={<Home />}
      right={<Account />}
    />
  )
}

HeaderDefault.displayName = 'HeaderDefault'
HeaderDefault.propTypes = {
  maxWidth: propTypes.string,
  title: propTypes.string,
  bgColor: propTypes.string,
  borderColor: propTypes.string,
}

export default HeaderDefault
