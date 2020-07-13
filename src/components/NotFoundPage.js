import React, { useEffect } from 'react'
import { useHistory, Link } from 'react-router-dom'
import { isBrowser } from 'react-device-detect'
import { useSelector } from 'react-redux'
import { selectToken } from '@open-tender/redux'

import { selectConfig } from '../slices'
import PageTitle from './PageTitle'
import Background from './Background'

const NotFoundPage = () => {
  const history = useHistory()
  const config = useSelector(selectConfig)
  const { background, back } = config.notFound
  const token = useSelector(selectToken)

  useEffect(() => {
    if (token) return history.push('/account')
  }, [token, history])

  return (
    <>
      {isBrowser && <Background imageUrl={background} />}
      <div className="content">
        <PageTitle {...config.notFound} />
        <div className="content__body slide-up">
          <div className="container">
            <p className="">
              <Link to="/" className="">
                {back}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

NotFoundPage.displayName = 'NotFoundPage'
export default NotFoundPage
