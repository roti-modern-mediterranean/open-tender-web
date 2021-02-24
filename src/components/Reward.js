import React from 'react'
import propTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import styled from '@emotion/styled'
import { BgImage, Box, ButtonLink, Text } from '@open-tender/components'
import { makeLocalDateStr } from '@open-tender/js'

import { openModal } from '../slices'
import iconMap from './iconMap'

const RewardView = styled(Box)`
  position: relative;
  height: 100%;
  display: flex;
  align-items: center;
  padding: 1rem;
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

const Reward = ({ item }) => {
  const dispatch = useDispatch()
  const today = makeLocalDateStr(new Date(), 0, 'MM/dd/yyyy')
  const bgStyle = item.image_url
    ? { backgroundImage: `url(${item.image_url}` }
    : null

  const redeem = () => {
    dispatch(openModal({ type: 'reward', args: { reward: item } }))
  }

  return (
    <RewardView>
      <RewardImage style={bgStyle}>&nbsp;</RewardImage>
      <RewardDetails>
        <div>
          <RewardContent>
            <RewardNote>
              <span>{iconMap.Grid}</span>Scan in-store only
            </RewardNote>
            <RewardTitle>{item.title}</RewardTitle>
            {item.description && (
              <RewardDescription>{item.description}</RewardDescription>
            )}
          </RewardContent>
          <RewardExpiration>
            {item.expiration === today ? (
              <Text
                color="alert"
                size="xSmall"
                bold={true}
                as="p"
                style={{
                  textTransform: 'uppercase',
                  letterSpacing: '0.03em',
                }}
              >
                Today only!
              </Text>
            ) : (
              <p>Use by {item.expiration}</p>
            )}
          </RewardExpiration>
        </div>
      </RewardDetails>
      <RewardAction>
        <ButtonLink
          onClick={redeem}
          disabled={false}
          label={`Apply ${item.name}`}
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
