import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import HomeCard from './HomeCard'
import { useSelector } from 'react-redux'
import { selectConfig } from '../slices/configSlice'
import { selectOrder } from '../slices/orderSlice'
import Background from './Background'

const Home = () => {
  const history = useHistory()
  const { home: homeConfig } = useSelector(selectConfig)
  // const bgStyle = { backgroundImage: `url(${home.background}` }
  const order = useSelector(selectOrder)
  const hasTypes = order.orderType && order.serviceType

  useEffect(() => {
    if (hasTypes) history.push('/locations')
  }, [hasTypes, history])

  return (
    <div className="content">
      <Background imageUrl={homeConfig.background} />
      <HomeCard />
    </div>
  )
}

export default Home
