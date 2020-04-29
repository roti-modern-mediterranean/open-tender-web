import React from 'react'
import { OrderPicker } from './OrderPicker'
import { useSelector } from 'react-redux'
import { config } from '../slices/configSlice'

const Home = () => {
  const { home } = useSelector(config)
  const bgStyle = { backgroundImage: `url(${home.background}` }
  return (
    <div className="content">
      <div className="background" style={bgStyle}></div>
      <OrderPicker />
    </div>
  )
}

export default Home
