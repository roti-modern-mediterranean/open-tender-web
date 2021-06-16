import propTypes from 'prop-types'
import styled from '@emotion/styled'
import { ArrowLeft, ArrowRight } from '../icons'
import React from 'react'


const Container = styled.div`
  label: BackForwardButtonsContainer;
  
  display: flex;
`

const NavButton = styled.button`
  label: NavButton;

  flex: 1;
  display: flex;
  justify-content: ${(props) => props.isForward ? 'flex-end' : 'flex-start'};
  align-items: center;
  margin: 2rem;
  
  > span {
    margin: 0 0.5rem;
  }
`

const noop = () => {}

const BackForwardButtons = ({
    onBackClick, onForwardClick,
    backText = '', forwardText = ''
}) => {
  return <Container>
    <NavButton onClick={onBackClick || noop} disabled={onBackClick === null}>
      <ArrowLeft color="#000000" size="16px"/>
      <span>{backText}</span>
    </NavButton>
    <NavButton onClick={onForwardClick || noop} isForward={true} disabled={onForwardClick === null}>
      <span>{forwardText}</span>
      <ArrowRight color="#000000" size="16px"/>
    </NavButton>
  </Container>
}

BackForwardButtons.displayName = 'BackForwardButtons'
BackForwardButtons.propTypes = {
  onBackClick: propTypes.func,
  onForwardClick: propTypes.func,
  backText: propTypes.string,
  forwardText: propTypes.string,
}

export default BackForwardButtons;
