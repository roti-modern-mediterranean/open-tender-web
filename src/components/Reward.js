import React from 'react'
import propTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import styled from '@emotion/styled'
import { BgImage, Box, ButtonLink } from '@open-tender/components'
import { makeLocalDateStr, formatDateStr } from '@open-tender/js'

import { openModal } from '../slices'
import iconMap from './iconMap'
import { Tag } from '.'

const RewardView = styled(Box)`
  position: relative;
  height: 100%;
  min-height: 11rem;
  display: flex;
  align-items: center;
  padding: 1.5rem;
`

const RewardTag = styled('div')`
  position: absolute;
  top: -0.9rem;
  right: 1rem;

  & > span {
    padding: 0.3rem 1rem 0.4rem;
  }
`

const RewardImage = styled(BgImage)`
  flex: 0 0 25%;
  height: 100%;
  background-color: ${(props) => props.theme.bgColors.secondary};
`

const RewardDetails = styled('div')`
  flex: 1 1 75%;
  height: 100%;
  padding: 0 0 0 1rem;

  & > div {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
  }
`

const RewardContent = styled('div')``

const RewardNote = styled('div')`
  display: flex;
  align-items: center;
  margin: 0 0 1rem;
  font-size: ${(props) => props.theme.fonts.sizes.xSmall};

  span {
    display: block;
    line-height: 1.4;
  }

  span:first-of-type {
    width: 1.2rem;
    height: 1.2rem;
    margin: 0 0.4rem 0 0;
    // color: ${(props) => props.theme.links.primary.color};
`

const RewardTitle = styled('p')`
  color: ${(props) => props.theme.colors.primary};
  font-size: ${(props) => props.theme.fonts.sizes.small};
`

const RewardDescription = styled('p')`
  margin: 0.3rem 0 0;
  font-size: ${(props) => props.theme.fonts.sizes.xSmall};
`

const RewardExpiration = styled('div')`
  margin: 1rem 0 0;
  font-size: ${(props) => props.theme.fonts.sizes.xSmall};
`

const RewardAction = styled('div')`
  margin: 0 0 0 0.5rem;
  // position: absolute;
  // bottom: 0.4rem;
  // right: 1rem;

  button {
    width: 2rem;
    height: 2rem;
  }
`

const makeImageUrl = (images) => {
  const imagesMap = images
    .filter((i) => i.url)
    .reduce((obj, i) => ({ ...obj, [i.type]: i.url }), {})
  return imagesMap.SMALL_IMAGE || imagesMap.APP_IMAGE || imagesMap.LARGE_IMAGE
}

const makeServiceType = (serviceType) => {
  switch (serviceType) {
    case 'WALKIN':
      return (
        <>
          <span>{iconMap.Grid}</span>Scan in-store only
        </>
      )
    case 'PICKUP':
      return (
        <>
          <span>{iconMap.ShoppingBag}</span>Pickup orders only
        </>
      )
    case 'DELIVERY':
      return (
        <>
          <span>{iconMap.Truck}</span>Delivery orders only
        </>
      )
    default:
      return null
  }
}

const makeOrderType = (orderType) => {
  switch (orderType) {
    case 'OLO':
      return null
    case 'CATERING':
      return 'Catering only'
    case 'MERCH':
      return 'Merch only'
    default:
      return null
  }
}

const makeLimitations = (item) => {
  const { order_type, service_type } = item
  const serviceType = makeServiceType(service_type)
  const orderType = makeOrderType(order_type)
  const comma = serviceType && orderType ? ', ' : null
  if (serviceType || orderType) {
    return (
      <>
        {serviceType}
        {comma}
        {orderType}
      </>
    )
  }
  return (
    <>
      <span>{iconMap.Star}</span>Valid on all orders
    </>
  )
}

const makeReward = (item) => {
  const imageUrl = makeImageUrl(item.images)
  const expiration = formatDateStr(item.end_date, 'MMMM d, yyyy')
  const limitations = makeLimitations(item)
  return { ...item, imageUrl, expiration, limitations }
}

const Reward = ({ item }) => {
  const dispatch = useDispatch()
  const today = makeLocalDateStr(new Date(), 0, 'yyyy-MM-dd')
  const reward = makeReward(item)
  const todayOnly = reward.end_date === today
  const bgStyle = reward.imageUrl
    ? { backgroundImage: `url(${reward.imageUrl}` }
    : null

  const redeem = () => {
    dispatch(openModal({ type: 'reward', args: { reward } }))
  }

  return (
    <RewardView>
      <RewardTag>
        {todayOnly && <Tag text="Today only!" icon={null} bgColor="alert" />}
      </RewardTag>
      <RewardImage style={bgStyle}>&nbsp;</RewardImage>
      <RewardDetails>
        <div>
          <RewardContent>
            <RewardNote>{reward.limitations}</RewardNote>
            <RewardTitle>{reward.title}</RewardTitle>
            {reward.description && (
              <RewardDescription>{reward.description}</RewardDescription>
            )}
            {/* {reward.per_order === 1 && (
              <RewardDescription>
                <Text color="alert">
                  Cannot be used with any other discounts
                </Text>
              </RewardDescription>
            )} */}
          </RewardContent>
          <RewardExpiration>
            {reward.end_date === today ? (
              <p>Valid today only</p>
            ) : reward.end_date ? (
              <p>Use by {reward.expiration}</p>
            ) : (
              <p>Expires never!</p>
            )}
          </RewardExpiration>
        </div>
      </RewardDetails>
      <RewardAction>
        <ButtonLink
          onClick={redeem}
          disabled={false}
          label={`Apply ${reward.name}`}
        >
          {iconMap.PlusCircle}
        </ButtonLink>
      </RewardAction>
    </RewardView>
  )
}

Reward.displayName = 'Reward'
Reward.propTypes = {
  item: propTypes.object,
}

export default Reward
