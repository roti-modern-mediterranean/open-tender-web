import React from 'react'
import propTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import styled from '@emotion/styled'
import { ButtonLink, Heading, Text } from '@open-tender/components'
import { makeLocalDateStr } from '@open-tender/js'

import { openModal } from '../../../slices'
import iconMap from '../../iconMap'
import AccountRewardsImage from './AccountRewardsImage'

const AccountRewardsListItemView = styled('div')`
  display: flex;
  align-items: center;
  padding: 0.5rem 1rem 0.5rem 0.5rem;
  background-color: ${(props) => props.theme.bgColors.primary};
  border-radius: 0.5rem;
  box-shadow: 0 0.2rem 0.4rem 0rem rgba(0, 0, 0, 0.2);
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    box-shadow: 0 0 1rem 0rem rgba(0, 0, 0, 0.6);
  }
`

const AccountRewardsListItemDetails = styled('div')`
  flex: 1 1 auto;
  height: 4.5rem;
  overflow: hidden;
  display: flex;
  align-items: center;
  text-align: left;

  & > div > p {
    font-size: ${(props) => props.theme.fonts.sizes.small};
  }

  & > div > p + p {
    margin: 0.2rem 0 0;
    font-size: ${(props) => props.theme.fonts.sizes.xSmall};
  }
`

const AccountRewardsListItemAction = styled('div')`
  margin: 0 0 0 0.5rem;

  button {
    width: 2rem;
    height: 2rem;
  }
`

const AccountRewardsListItem = ({ reward }) => {
  const dispatch = useDispatch()
  const today = makeLocalDateStr(new Date(), 0, 'MM/dd/yyyy')

  const redeem = () => {
    dispatch(openModal({ type: 'reward', args: { reward } }))
  }

  return (
    <AccountRewardsListItemView>
      <AccountRewardsImage imageUrl={reward.image_url} title={reward.name} />
      <AccountRewardsListItemDetails>
        <div>
          <Heading as="p">{reward.title}</Heading>
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
        </div>
      </AccountRewardsListItemDetails>
      <AccountRewardsListItemAction>
        <ButtonLink
          onClick={redeem}
          disabled={false}
          label={`Apply ${reward.name}`}
        >
          {iconMap.PlusCircle}
        </ButtonLink>
      </AccountRewardsListItemAction>
    </AccountRewardsListItemView>
  )
}

AccountRewardsListItem.displayName = 'AccountRewardsListItem'
AccountRewardsListItem.propTypes = {
  reward: propTypes.object,
}

export default AccountRewardsListItem
