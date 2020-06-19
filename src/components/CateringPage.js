import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { selectConfig } from '../slices/configSlice'
import { selectOrder } from '../slices/orderSlice'
import Background from './Background'

const CateringPage = () => {
  const history = useHistory()
  const { orderType, serviceType, address } = useSelector(selectOrder)
  const { catering: cateringConfig } = useSelector(selectConfig)
  const { title, subtitle, content, background } = cateringConfig
  const hasTypes = orderType && serviceType

  useEffect(() => {
    window.scroll(0, 0)
  }, [])

  useEffect(() => {
    if (!hasTypes) history.push('/')
  }, [hasTypes, history])

  return (
    <div className="content">
      <Background imageUrl={background} />
      <div className="card overlay border-radius slide-up">
        <div className="card__header">
          <p className="preface font-size-small secondary-color">{subtitle}</p>
          <h1 className="ot-font-size-h3">{title}</h1>
          <p className="secondary-color">{content}</p>
        </div>
        <div className="card__content"></div>
      </div>
    </div>
  )
}

CateringPage.displayName = 'CateringPage'
export default CateringPage
