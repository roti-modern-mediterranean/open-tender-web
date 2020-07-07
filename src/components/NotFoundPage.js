import React, { useEffect } from 'react'
import { useHistory, Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectToken } from 'open-tender-redux'

import { selectConfig } from '../slices'
import SectionHeader from './SectionHeader'

const NotFoundPage = () => {
  const history = useHistory()
  const { notFound: notFoundConifg } = useSelector(selectConfig)
  const { title, subtitle, back } = notFoundConifg
  const token = useSelector(selectToken)

  useEffect(() => {
    if (token) return history.push('/account')
  }, [token, history])

  return (
    <>
      <h1 className="sr-only">{title}</h1>
      <div className="signup content ot-bg-color-secondary">
        <div className="section container">
          <div className="section__container">
            <SectionHeader title={title} subtitle={subtitle} />
            <div className="section__footer">
              <p className="">
                <Link to="/" className="">
                  {back}
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

NotFoundPage.displayName = 'NotFoundPage'
export default NotFoundPage
