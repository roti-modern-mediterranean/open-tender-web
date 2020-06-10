import React from 'react'
import propTypes from 'prop-types'
import Tag from './Tag'

const OrderTag = ({ isUpcoming, status }) => {
  const tag = isUpcoming
    ? {
        bgClass: '-upcoming bg-alert-color',
        textClass: 'ot-light-color',
        text: status === 'IN_PROGRESS' ? 'In Progress' : 'Coming up',
        icon: 'AlertCircle',
      }
    : status === 'REFUNDED'
    ? {
        bgClass: '-refunded bg-body-color',
        textClass: 'ot-light-color',
        text: 'Refunded',
      }
    : {
        bgClass: '-completed bg-success-color',
        textClass: 'ot-light-color',
        text: 'Completed',
        icon: 'CheckCircle',
      }
  return (
    <Tag
      text={tag.text}
      icon={tag.icon}
      bgClass={`order-card__tag ${tag.bgClass}`}
      textClass={tag.textClass}
    />
  )
}

OrderTag.displayName = 'OrderTag'
OrderTag.propTypes = {
  isUpcoming: propTypes.bool,
  status: propTypes.string,
}

export default OrderTag
