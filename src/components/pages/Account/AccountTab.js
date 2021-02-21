import React from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'
// import { Preface } from '@open-tender/components'

const AccountTabView = styled('button')`
  flex: 1 1 20%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0;
  border: 0;
  background-color: transparent;
  color: ${(props) => props.color || props.theme.colors.primary};
  text-align: center;
  opacity: 0;
  animation: slide-up 0.25s ease-in-out ${(props) => props.delay} forwards;
`

const AccountTabIcon = styled('span')`
  position: relative;
  width: 1.8rem;
  height: 1.8rem;
`

const AccountTabTitle = styled('span')`
  padding: 0.7rem 0 0;
  line-height: 1;
  font-size: ${(props) => props.theme.fonts.sizes.xSmall};
  letter-spacing: 0.05em;
`

const AccountTab = ({ title, icon, onClick, color, delay = '0.125s' }) => {
  const onUp = (evt) => {
    evt.preventDefault()
    evt.stopPropagation()
    onClick()
  }

  return (
    <AccountTabView onClick={onUp} delay={delay}>
      <AccountTabIcon>{icon}</AccountTabIcon>
      <AccountTabTitle>
        {title}
        {/* <Preface size="xSmall" color="light">
          {title}
        </Preface> */}
      </AccountTabTitle>
    </AccountTabView>
  )
}

AccountTab.displayName = 'AccountTab'
AccountTab.propTypes = {
  title: propTypes.string,
  handler: propTypes.func,
  iconName: propTypes.string,
}
export default AccountTab
