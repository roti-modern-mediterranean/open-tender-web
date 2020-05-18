import React from 'react'
import propTypes from 'prop-types'
import { TransitionGroup, CSSTransition } from 'react-transition-group'

export const Error = ({ error }) => {
  return (
    <TransitionGroup component={null}>
      {error ? (
        <CSSTransition
          key="form-error"
          classNames="reveal"
          timeout={{ enter: 250, exit: 250 }}
        >
          <div className="form__error form-error">
            <p>{error}</p>
          </div>
        </CSSTransition>
      ) : null}
    </TransitionGroup>
  )
}

Error.displayName = 'Error'
Error.propTypes = {
  error: propTypes.string,
}

const CheckoutLineItem = ({
  label,
  required,
  error,
  classes = '',
  children,
}) => {
  return (
    <div className={`form__line border-color ${classes}`}>
      <div className="form__line__container">
        <div className="form__line__label">
          {label}
          {required ? <span className="required">*</span> : null}
        </div>
        <div className="form__line__value">{children}</div>
      </div>
      <Error error={error} />
    </div>
  )
}

CheckoutLineItem.displayName = 'CheckoutLineItem'
CheckoutLineItem.propTypes = {
  label: propTypes.oneOfType([
    propTypes.arrayOf(propTypes.node),
    propTypes.node,
    propTypes.string,
    propTypes.object,
  ]),
  classes: propTypes.string,
}

export default CheckoutLineItem
