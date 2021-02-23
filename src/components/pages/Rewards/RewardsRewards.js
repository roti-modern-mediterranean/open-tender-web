import React from 'react'
import styled from '@emotion/styled'
import { Box, Heading } from '@open-tender/components'

const RewardsRewardsView = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: stretch;
  padding: 2rem 2rem;
  margin: 0 0 3rem;
  opacity: 0;
  animation: slide-up 0.25s ease-in-out 0.125s forwards;
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    flex-direction: column;
    text-align: center;
  }
`

const RewardsRewardsHeader = styled('div')`
  margin: 0 0 1.5rem;

  h2 {
    font-size: ${(props) => props.theme.fonts.sizes.h5};
  }

  p {
    margin: 0.5rem 0 0;
    font-size: ${(props) => props.theme.fonts.sizes.small};
  }
`

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
    <RewardsRewardsView>
      <RewardsRewardsHeader>
        <h2>Your Rewards</h2>
        <p>You'll have the opportunity to redeem these on the checkout page.</p>
      </RewardsRewardsHeader>
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
    </RewardsRewardsView>
  )
}

RewardsRewards.displayName = 'RewardsRewards'

export default RewardsRewards
