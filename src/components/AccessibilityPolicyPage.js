import React, { useEffect } from 'react'
import { isBrowser } from 'react-device-detect'
import { useSelector } from 'react-redux'

import { selectConfig } from '../slices'
import PageTitle from './PageTitle'
import Background from './Background'

const AccessibilityPolicyPage = () => {
  const config = useSelector(selectConfig)

  useEffect(() => {
    window.scroll(0, 0)
  }, [])

  return (
    <>
      {isBrowser && <Background imageUrl={config.accessibility.background} />}
      <div className="content">
        <PageTitle {...config.accessibility} />
        {config.accessibility.content &&
          config.accessibility.content.length > 0 && (
            <div className="content__body ot-line-height slide-up">
              <div className="container">
                <div className="content__text">
                  {config.accessibility.content.map((i, index) => (
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

AccessibilityPolicyPage.displayName = 'AccessibilityPolicyPage'
export default AccessibilityPolicyPage
