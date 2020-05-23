import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { selectConfig } from '../../slices/configSlice'
import { selectOrder } from '../../slices/orderSlice'
import OrderStart from '../OrderStart'
import Background from '../Background'

const HomePage = () => {
  const history = useHistory()
  const { home: homeConfig } = useSelector(selectConfig)
  // const bgStyle = { backgroundImage: `url(${home.background}` }
  const order = useSelector(selectOrder)
  const hasTypes = order.orderType && order.serviceType

  useEffect(() => {
    window.scroll(0, 0)
  }, [])

  useEffect(() => {
    if (hasTypes) history.push('/map')
  }, [hasTypes, history])

  return (
    <div className="content">
      <Background imageUrl={homeConfig.background} />
      <OrderStart />
    </div>
  )
}

HomePage.displayName = 'HomePage'
export default HomePage
