import React, { useEffect } from 'react'
import { isBrowser } from 'react-device-detect'
import { useSelector } from 'react-redux'

import { selectConfig } from '../slices'
import PageTitle from './PageTitle'
import Background from './Background'

const RefundPolicyPage = () => {
  const config = useSelector(selectConfig)

  useEffect(() => {
    window.scroll(0, 0)
  }, [])

  return (
    <>
      {isBrowser && <Background imageUrl={config.refunds.background} />}
      <div className="content">
        <PageTitle {...config.refunds} />
        {config.refunds.content && config.refunds.content.length > 0 && (
          <div className="content__body ot-color-secondary ot-line-height slide-up">
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
