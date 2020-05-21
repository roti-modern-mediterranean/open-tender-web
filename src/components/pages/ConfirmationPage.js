import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectConfig } from '../../slices/configSlice'
import { selectCompletedOrder } from '../../slices/confirmationSlice'
import Hero from '../Hero'

const ConfirmationPage = () => {
  const history = useHistory()
  const { account: accountConfig } = useSelector(selectConfig)
  const completedOrder = useSelector(selectCompletedOrder)

  useEffect(() => {
    if (!completedOrder) history.push('/')
    window.scroll(0, 0)
  }, [completedOrder, history])

  return (
    <>
      <Hero imageUrl={accountConfig.background} />

      <h1 className="sr-only">ConfirmationPage</h1>
      <h2>Thanks for your order!</h2>
      {/* <pre>{completedOrder}</pre> */}
    </>
  )
}

ConfirmationPage.displayName = 'ConfirmationPage'
export default ConfirmationPage
