import React, { useEffect } from 'react'
import propTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { hideNotification } from '@open-tender/redux'
import styled from '@emotion/styled'

const NotificationView = styled('li')`
  display: block;
  float: right;
  clear: right;
  margin: 1rem 0 0;
  line-height: 1.2;
  padding: 0.8rem 1.6rem;
  transition: all 250ms ease;
  border-radius: 0.5rem;
  box-shadow: 0px 3px 20px rgba(0, 0, 0, 0.2);
  font-size: ${(props) => props.theme.fonts.sizes.small};
  color: ${(props) => props.theme.colors.light};
  background-color: ${(props) => props.theme.colors.paprika};
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    margin: 1rem 0 0;
    background-color: ${(props) => props.theme.colors.beet};
  }
`

const Notification = ({ message, id }) => {
  const dispatch = useDispatch()

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(hideNotification(id))
    }, 3000)
    return () => clearTimeout(timer)
  }, [dispatch, id])

  return <NotificationView>{message}</NotificationView>
}

Notification.displayName = 'Notification'
Notification.propTypes = {
  message: propTypes.string,
  id: propTypes.string,
}

export default Notification
