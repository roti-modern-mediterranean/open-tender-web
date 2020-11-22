import React, { useEffect } from 'react'
import { isBrowser } from 'react-device-detect'
import { useSelector } from 'react-redux'
import { Helmet } from 'react-helmet'

import { selectBrand, selectConfig } from '../slices'
import PageTitle from './PageTitle'
import Background from './Background'

const RefundPolicyPage = () => {
  const config = useSelector(selectConfig)
  const { title } = useSelector(selectBrand)

  useEffect(() => {
    window.scroll(0, 0)
  }, [])

  return (
    <>
      <Helmet>
        <title>
          {config.refunds.title} | {title}
        </title>
      </Helmet>
      {isBrowser && <Background imageUrl={config.refunds.background} />}
      <div className="content">
        <PageTitle {...config.refunds} />
        {config.refunds.content && config.refunds.content.length > 0 && (
          <div className="content__body ot-line-height slide-up">
            <div className="container">
              <div className="content__text">
                {config.refunds.content.map((i, index) => (
                  <p key={index}>{i}</p>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

RefundPolicyPage.displayName = 'RefundPolicyPage'
export default RefundPolicyPage
