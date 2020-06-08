import React, { useEffect, useState, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import { selectAccountConfigSections } from '../slices/configSlice'
import { selectCustomer } from '../slices/customerSlice'
import { selectAccountOrders, fetchOrders } from '../slices/accountSlice'
import SectionHeader from './SectionHeader'
import SectionLoading from './SectionLoading'
import SectionError from './SectionError'
import SectionEmpty from './SectionEmpty'
import OrderCard from './OrderCard'
import { Button } from '../packages'
import SectionFooter from './SectionFooter'

const AccountOrdersPage = () => {
  const sectionRef = useRef()
  const dispatch = useDispatch()
  const history = useHistory()
  const increment = 12
  const limit = 120
  const [recentOrders, setRecentOrders] = useState([])
  const [count, setCount] = useState(increment)
  const {
    recentOrders: { title, subtitle, empty },
  } = useSelector(selectAccountConfigSections)
  const { account, auth } = useSelector(selectCustomer)
  const token = auth ? auth.access_token : null
  const orders = useSelector(selectAccountOrders)
  const { entities, loading, error } = orders
  const isLoading = loading === 'pending'
  const showOrders = !isLoading && !error

  useEffect(() => {
    window.scroll(0, 0)
  }, [])

  useEffect(() => {
    if (!account) return history.push('/')
  }, [account, history])

  useEffect(() => {
    if (error) window.scrollTo(0, sectionRef.current.offsetTop)
  }, [error])

  useEffect(() => {
    dispatch(fetchOrders({ token, limit: limit + 1 }))
  }, [dispatch, token])

  useEffect(() => {
    const recent = entities.length ? entities.slice(0, count) : []
    setRecentOrders(recent)
  }, [entities, count])

  const handleClick = (evt) => {
    evt.preventDefault()
    setCount(Math.min(count + increment, limit))
    evt.target.blur()
  }

  return account ? (
    <>
      <h1 className="sr-only">{title}</h1>
      <div className="sections bg-secondary-color">
        <div ref={sectionRef} className="section container ot-section">
          <div className="section__container">
            <SectionHeader title={title} subtitle={subtitle}>
              <div className="section__header__back">
                <p className="font-size-small">
                  <Link to="/account">Head back to your account page</Link>
                </p>
              </div>
            </SectionHeader>
            <SectionLoading loading={isLoading} />
            <SectionError error={error} />
            <div className="section__content -wide">
              {showOrders &&
                (recentOrders.length ? (
                  <div className="section__orders">
                    {recentOrders.map((order) => {
                      return (
                        <div key={order.order_id} className="section__order">
                          <OrderCard order={order} />
                        </div>
                      )
                    })}
                  </div>
                ) : (
                  <SectionEmpty message={empty} />
                ))}
            </div>
            {showOrders &&
              (entities.length > count ? (
                <SectionFooter>
                  {count === limit || count > entities.length ? (
                    <Link to="/account">Head back to your account page</Link>
                  ) : (
                    <Button classes="btn-link" onClick={handleClick}>
                      Load more recent orders
                    </Button>
                  )}
                </SectionFooter>
              ) : null)}
          </div>
        </div>
      </div>
    </>
  ) : null
}

AccountOrdersPage.displayName = 'AccountOrdersPage'
export default AccountOrdersPage
