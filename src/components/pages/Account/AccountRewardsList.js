import React from 'react'
import propTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import styled from '@emotion/styled'
import { ButtonLink, Heading, Preface, Text } from '@open-tender/components'
import { makeLocalDateStr } from '@open-tender/js'

import { openModal } from '../../../slices'
import iconMap from '../../iconMap'
import AccountRewardsImage from './AccountRewardsImage'

const AccountRewardsListView = styled('div')`
  width: 100%;
  margin: 2rem 0 0;

  & > div {
    width: 100%;
    overflow-x: scroll;
    padding: 1rem 0 1rem 2rem;
    display: flex;
  }

  > p {
    text-transform: uppercase;
    font-weight: ${(props) => props.theme.boldWeight};
    @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
      color: ${(props) => props.theme.colors.light};
    }
  }
`

const AccountRewardsItem = styled('div')`
  flex: 0 0 25rem;
  padding: 0 1rem 0 0;

  &:last-of-type {
    flex: 0 0 26rem;
    padding: 0 2rem 0 0;
  }

  & > div {
    display: flex;
    align-items: center;
    padding: 0.5rem 1rem 0.5rem 0.5rem;
    background-color: ${(props) => props.theme.bgColors.primary};
    // border-radius: ${(props) => props.theme.border.radiusSmall};
    // box-shadow: ${(props) => props.theme.boxShadow.outer};
    border-radius: 0.5rem;
    box-shadow: 0 0 1rem 0rem rgba(0, 0, 0, 0.6);
  }
`

const AccountRewardsItemDetails = styled('div')`
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

const AccountRewardsItemAction = styled('div')`
  margin: 0 0 0 0.5rem;

  button {
    width: 2.4rem;
    height: 2.4rem;
  }
`

const AccountRewardsList = ({ rewards }) => {
  const dispatch = useDispatch()
  const today = makeLocalDateStr(new Date(), 0, 'MM/dd/yyyy')
  console.log(today)

  if (!rewards.length) return null

  const redeem = (reward) => {
    dispatch(openModal({ type: 'reward', args: { reward } }))
  }

  return (
    <AccountRewardsListView>
      <Preface as="p">
        {rewards.length > 1
          ? `You have ${rewards.length} rewards!`
          : 'You have a reward'}
      </Preface>
      <div>
        {rewards.map((reward) => (
          <AccountRewardsItem key={reward.id}>
            <div>
              <AccountRewardsImage
                imageUrl={reward.image_url}
                title={reward.name}
              />
              <AccountRewardsItemDetails>
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
              </AccountRewardsItemDetails>
              <AccountRewardsItemAction>
                <ButtonLink
                  onClick={() => redeem(reward)}
                  disabled={false}
                  label={`Apply ${reward.name}`}
                >
                  {iconMap.PlusCircle}
                </ButtonLink>
              </AccountRewardsItemAction>
            </div>
          </AccountRewardsItem>
        ))}
      </div>
    </AccountRewardsListView>
  )
}

AccountRewardsList.displayName = 'RewardsProgram'
AccountRewardsList.propTypes = {
  rewards: propTypes.object,
}

export default AccountRewardsList
