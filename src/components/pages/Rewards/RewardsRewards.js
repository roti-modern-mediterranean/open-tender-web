import React from 'react'
import styled from '@emotion/styled'
import { Heading } from '@open-tender/components'
import { RewardsProgramView, RewardsProgramHeader } from './RewardsProgam'

const RewardsReward = styled('div')`
  padding: 1.5rem;
  margin: 1rem 0 0;
  border: 0.1rem solid ${(props) => props.theme.border.color};
  border-radius: ${(props) => props.theme.border.radiusSmall};

  p {
    margin: 1rem 0 0;
    font-size: ${(props) => props.theme.fonts.sizes.small};
  }
`

const RewardsTitle = styled(Heading)`
  font-size: ${(props) => props.theme.fonts.sizes.main};
`

const RewardsFinePrint = styled('p')`
  font-size: ${(props) => props.theme.fonts.sizes.xSmall};
`

const RewardsRewards = ({ rewards }) => {
  if (!rewards || !rewards.length) return null
  return (
    <RewardsProgramView>
      <RewardsProgramHeader>
        <h2>Your Rewards</h2>
        <p>You'll have the opportunity to redeem these on the checkout page.</p>
      </RewardsProgramHeader>
      <div>
        {rewards.map((reward) => {
          return (
            <RewardsReward key={reward.ext_id}>
              <RewardsTitle>{reward.name}</RewardsTitle>
              {reward.description && <p>{reward.description}</p>}
              {reward.fine_print && (
                <RewardsFinePrint>
                  Fine Print: {reward.fine_print}
                </RewardsFinePrint>
              )}
            </RewardsReward>
          )
        })}
      </div>
    </RewardsProgramView>
  )
}

RewardsRewards.displayName = 'RewardsRewards'

export default RewardsRewards
