import propTypes from 'prop-types'
import React, { useEffect, useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { X } from 'react-feather'
import { toggleSidebar } from '../../slices'
import styled from '@emotion/styled'
import { ButtonLink } from '@open-tender/components'

const SidebarCloseView = styled('div')`
  position: absolute;
  z-index: 1;
  top: 7px;
  right: 7px;
`

const SidebarClose = () => {
  const dispatch = useDispatch()

  const handleEscape = useCallback(
    (evt) => {
      if (evt.keyCode === 27) dispatch(toggleSidebar())
    },
    [dispatch]
  )

  useEffect(() => {
    document.addEventListener('keydown', handleEscape, false)
    return () => document.removeEventListener('keydown', handleEscape, false)
  }, [handleEscape])

  return (
    <SidebarCloseView>
      <ButtonLink
        onClick={() => dispatch(toggleSidebar())}
        aria-label="Close cart & return to current page"
      >
        <X size={20} />
      </ButtonLink>
    </SidebarCloseView>
  )
}

SidebarClose.displayName = 'SidebarClose'
SidebarClose.propTypes = {
  classes: propTypes.string,
  handleClose: propTypes.func,
}

export default SidebarClose
