import propTypes from 'prop-types'
import styled from '@emotion/styled'
import { ArrowLeft, ArrowRight } from '../icons'
import React from 'react'
import { useTheme } from '@emotion/react'


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

  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    margin: 1rem 0;
  }
`

const noop = () => {}

const BackForwardButtons = ({
    onBackClick, onForwardClick,
    backText = '', forwardText = ''
}) => {
  const theme = useTheme();

  return <Container>
    <NavButton onClick={onBackClick || noop} disabled={onBackClick === null}>
      <ArrowLeft color={theme.colors.beet} size="16px"/>
      <span>{backText}</span>
    </NavButton>
    <NavButton onClick={onForwardClick || noop} isForward={true} disabled={onForwardClick === null}>
      <span>{forwardText}</span>
      <ArrowRight color={theme.colors.beet} size="16px"/>
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
