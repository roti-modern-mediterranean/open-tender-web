import React from 'react'
import propTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import styled from '@emotion/styled'
import {
  BgImage,
  Box,
  ButtonLink,
  Heading,
  Text,
} from '@open-tender/components'
import { makeLocalDateStr } from '@open-tender/js'

import { openModal } from '../../../slices'
import iconMap from '../../iconMap'

const AccountRewardView = styled(Box)`
  position: relative;
  height: 100%;
  display: flex;
  align-items: center;
  padding: 1rem;
`

const AccountRewardImage = styled(BgImage)`
  flex: 0 0 25%;
  height: 100%;
  background-color: ${(props) => props.theme.bgColors.secondary};
`

const AccountRewardDetails = styled('div')`
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

const AccountRewardContent = styled('div')``

const AccountRewardNote = styled('div')`
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

const AccountRewardTitle = styled('p')`
  color: ${(props) => props.theme.colors.primary};
  font-size: ${(props) => props.theme.fonts.sizes.small};
`

const AccountRewardDescription = styled('p')`
  margin: 0.3rem 0 0;
  font-size: ${(props) => props.theme.fonts.sizes.xSmall};
`

const AccountRewardExpiration = styled('div')`
  margin: 1rem 0 0;
  font-size: ${(props) => props.theme.fonts.sizes.xSmall};
`

const AccountRewardAction = styled('div')`
  margin: 0 0 0 0.5rem;
  // position: absolute;
  // bottom: 0.4rem;
  // right: 1rem;

  button {
    width: 2rem;
    height: 2rem;
  }
`

const AccountReward = ({ reward }) => {
  const dispatch = useDispatch()
  const today = makeLocalDateStr(new Date(), 0, 'MM/dd/yyyy')
  const bgStyle = reward.image_url
    ? { backgroundImage: `url(${reward.image_url}` }
    : null

  const redeem = () => {
    dispatch(openModal({ type: 'reward', args: { reward } }))
  }

  return (
    <AccountRewardView>
      <AccountRewardImage style={bgStyle}>&nbsp;</AccountRewardImage>
      <AccountRewardDetails>
        <div>
          <AccountRewardContent>
            <AccountRewardNote>
              <span>{iconMap.Grid}</span>Scan in-store only
            </AccountRewardNote>
            <AccountRewardTitle>{reward.title}</AccountRewardTitle>
            {reward.description && (
              <AccountRewardDescription>
                {reward.description}
              </AccountRewardDescription>
            )}
          </AccountRewardContent>
          <AccountRewardExpiration>
            {reward.expiration === today ? (
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
              <p>Use by {reward.expiration}</p>
            )}
          </AccountRewardExpiration>
        </div>
      </AccountRewardDetails>
      <AccountRewardAction>
        <ButtonLink
          onClick={redeem}
          disabled={false}
          label={`Apply ${reward.name}`}
        >
          {iconMap.PlusCircle}
        </ButtonLink>
      </AccountRewardAction>
    </AccountRewardView>
  )
}

AccountReward.displayName = 'AccountReward'
AccountReward.propTypes = {
  reward: propTypes.object,
}

export default AccountReward
