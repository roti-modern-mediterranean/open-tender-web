import React from 'react'
import { useSelector } from 'react-redux'
import { selectCustomer } from '@open-tender/redux'
import { Account, Guest } from '..'

const Home = () => {
  const { auth } = useSelector(selectCustomer)
  return auth ? <Account /> : <Guest />
}

Home.displayName = 'Home'
export default Home
