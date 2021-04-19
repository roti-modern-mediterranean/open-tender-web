import React, { useEffect, useCallback, useMemo } from 'react'
import propTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import styled from '@emotion/styled'

import { selectTheme, toggleSidebarModal } from '../../slices'
import { Back } from '../buttons'

const SidebarModalCloseView = styled('div')`
  position: absolute;
  z-index: 10;
  top: 0;
  left: ${(props) => props.theme.layout.padding};
  width: 5rem;
  display: flex;
  align-items: center;
  height: ${(props) => props.theme.layout.navHeight};
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    left: ${(props) => props.theme.layout.paddingMobile};
    height: ${(props) => props.theme.layout.navHeightMobile};
  }
`

const SidebarModalClose = ({ text, onClick, style }) => {
  const dispatch = useDispatch()
  const theme = useSelector(selectTheme)
  const handleClose = useMemo(
    () => onClick || (() => dispatch(toggleSidebarModal())),
    [onClick, dispatch]
  )

  const handleEscape = useCallback(
    (evt) => {
      if (evt.keyCode === 27) handleClose()
    },
    [handleClose]
  )

  useEffect(() => {
    document.addEventListener('keydown', handleEscape, false)
    return () => document.removeEventListener('keydown', handleEscape, false)
  }, [handleEscape])

  return (
    <SidebarModalCloseView style={style}>
      <Back text={text} onClick={onClick} color={theme.colors.beet} />
    </SidebarModalCloseView>
  )
}

SidebarModalClose.displayName = 'SidebarModalClose'
SidebarModalClose.propTypes = {
  onClick: propTypes.func,
  isButton: propTypes.bool,
}

export default SidebarModalClose
