import React from 'react'
import { useSelector } from 'react-redux'
import { selectCustomer } from '@open-tender/redux'
import { Account, OrderTypes } from '..'
import { selectConfig } from '../../../slices'
import { Background } from '../..'

const Landing = () => {
  const { home: homeConfig } = useSelector(selectConfig)
  const { background } = homeConfig
  const { auth } = useSelector(selectCustomer)

  return (
    <>
      <Background imageUrl={background} />
      {auth ? <Account /> : <OrderTypes />}
    </>
  )
}

Landing.displayName = 'Landing'
export default Landing
