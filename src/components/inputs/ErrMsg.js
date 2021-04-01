import React from 'react'
import propTypes from 'prop-types'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import styled from '@emotion/styled'

const ErrMsgView = styled('span')`
  outline: 0;
  display: inline-block;
  width: 100%;
  font-size: 1.8rem;
  padding: 1rem 1.5rem;
  margin: 1rem 0 0;
  font-family: ${(props) => props.theme.inputs.family};
  font-weight: ${(props) => props.theme.inputs.weight};
  letter-spacing: ${(props) => props.theme.inputs.letterSpacing};
  text-transform: ${(props) => props.theme.inputs.textTransform};
  -webkit-font-smoothing: ${(props) => props.theme.inputs.fontSmoothing};
  line-height: ${(props) => props.theme.inputs.lineHeight};
  border-radius: ${(props) => props.theme.border.radiusSmall};
  color: ${(props) => props.theme.colors.light};
  background-color: ${(props) => props.theme.colors.error};
`

const ErrMsg = ({ errMsg, style }) => {
  return (
    <TransitionGroup component={null}>
      {errMsg ? (
        <CSSTransition
          key="form-error"
          classNames="reveal"
          timeout={{ enter: 250, exit: 250 }}
        >
          <ErrMsgView style={style}>
            <p>{errMsg}</p>
          </ErrMsgView>
        </CSSTransition>
      ) : null}
    </TransitionGroup>
  )
}

ErrMsg.displayName = 'ErrMsg'
ErrMsg.propTypes = {
  errMsg: propTypes.string,
  style: propTypes.object,
}

export default ErrMsg
