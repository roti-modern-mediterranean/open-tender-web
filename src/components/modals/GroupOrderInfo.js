import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from '@emotion/styled'
import { useTheme } from '@emotion/react'
import { selectCustomer, setOrderServiceType } from '@open-tender/redux'
import { ButtonStyled, Preface } from '@open-tender/components'

import { closeModal, openModal } from '../../slices'
import { ButtonGroupBig, ModalContent, ModalView, PrefaceTitle } from '..'
import { People6 } from '../icons'
import { useHistory } from 'react-router-dom'
import InlineLink from '../InlineLink'

const GroupOrderInfoHeader = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 0 1.5rem;

  span {
    display: block;

    &:first-of-type {
      font-weight: bold;
      font-size: 2.6rem;
      margin: 0 0 1.5rem;
    }
  }
`

const GroupOrderInfoContent = styled('span')`
  display: block;
  margin: 0 0 2rem;

  p {
    margin: 1rem 0;
    line-height: ${(props) => props.theme.lineHeight};
  }

  // p:first-of-type {
  //   margin: 2rem 0 1rem;
  // }
`

const GroupOrderInfo = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const theme = useTheme()
  const color = theme.colors.secondary
  const { auth } = useSelector(selectCustomer)

  const handleContinue = () => {
    dispatch(closeModal())
    dispatch(setOrderServiceType('OLO', 'PICKUP'))
    history.push('/locations')
  }

  const login = (type) => {
    dispatch(closeModal())
    setTimeout(() => {
      dispatch(openModal({ type }))
    }, 300)
  }

  return (
    <ModalView>
      <ModalContent style={{ padding: '3rem 2rem' }}>
        <GroupOrderInfoHeader>
          <Preface>Group Ordering</Preface>
          <People6 size="10rem" color={color} />
        </GroupOrderInfoHeader>
        <GroupOrderInfoContent>
          <PrefaceTitle as="p">What You Should Know</PrefaceTitle>
          <p>
            To start a group order, please choose either pickup or delivery
            (group ordering is not available for catering) and then choose a
            location. From there, click on the icon above, which you'll find in
            the top right of the header navigation bar.
          </p>
          {!auth && (
            <p>
              Please note that you must first{' '}
              <InlineLink onClick={() => login('login')}>
                log into an existing account
              </InlineLink>{' '}
              or{' '}
              <InlineLink onClick={() => login('signUp')}>
                create an account
              </InlineLink>{' '}
              in order to start a group order.
            </p>
          )}
        </GroupOrderInfoContent>
        <ButtonGroupBig>
          <ButtonStyled onClick={handleContinue} size="big">
            Continue
          </ButtonStyled>
          <ButtonStyled
            onClick={() => dispatch(closeModal())}
            color="secondary"
            size="big"
          >
            Cancel
          </ButtonStyled>
        </ButtonGroupBig>
      </ModalContent>
    </ModalView>
  )
}

GroupOrderInfo.displayName = 'GroupOrderInfo'

export default GroupOrderInfo
