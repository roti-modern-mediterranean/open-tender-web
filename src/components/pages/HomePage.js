import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { selectConfig } from '../../slices/configSlice'
import { selectOrder } from '../../slices/orderSlice'
import OrderType from '../OrderType'
import Background from '../Background'
import { resetLocations } from '../../slices/locationsSlice'

const HomePage = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const { home: homeConfig } = useSelector(selectConfig)
  // const bgStyle = { backgroundImage: `url(${home.background}` }
  const order = useSelector(selectOrder)
  const hasTypes = order.orderType && order.serviceType

  useEffect(() => {
    window.scroll(0, 0)
  }, [])

  useEffect(() => {
    hasTypes ? history.push('/locations') : dispatch(resetLocations())
  }, [hasTypes, history, dispatch])

  return (
    <div className="content">
      <Background imageUrl={homeConfig.background} />
      <OrderType />
    </div>
  )
}

HomePage.displayName = 'HomePage'
export default HomePage
