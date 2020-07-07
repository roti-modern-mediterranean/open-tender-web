import React from 'react'
import propTypes from 'prop-types'
import Tag from './Tag'

const OrderTag = ({ isUpcoming, status }) => {
  const tag = isUpcoming
    ? {
        bgClass: '-upcoming ot-warning',
        text: status === 'IN_PROGRESS' ? 'In Progress' : 'Coming up',
        icon: 'AlertCircle',
      }
    : status === 'REFUNDED'
    ? {
        bgClass: '-refunded ot-dark',
        text: 'Refunded',
      }
    : {
        bgClass: '-completed ot-success',
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
