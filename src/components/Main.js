import React from 'react'
import { useLocation } from 'react-router-dom'
import propTypes from 'prop-types'

const Main = ({ children }) => {
  const { pathname } = useLocation()
  const klass = pathname.split('/')[1] || ''
  return (
    <main className={`main ${klass && `main--${klass}`} ot-bg-color-primary`}>
      {children}
    </main>
  )
}

Main.displayName = 'Main'
Main.propTypes = {
  children: propTypes.oneOfType([
    propTypes.arrayOf(propTypes.node),
    propTypes.node,
  ]),
}

export default Main
