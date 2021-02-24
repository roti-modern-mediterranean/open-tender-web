import React from 'react'
import styled from '@emotion/styled'
import { Box, Heading } from '@open-tender/components'

const ThanxRewardsView = styled(Box)`
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

const ThanxRewardsHeader = styled('div')`
  margin: 0 0 1.5rem;

  h2 {
    font-size: ${(props) => props.theme.fonts.sizes.h5};
  }

  p {
    margin: 0.5rem 0 0;
    font-size: ${(props) => props.theme.fonts.sizes.small};
  }
`

const ThanxRewardsReward = styled('div')`
  padding: 1.5rem;
  margin: 1rem 0 0;
  border: 0.1rem solid ${(props) => props.theme.border.color};
  border-radius: ${(props) => props.theme.border.radiusSmall};

  p {
    margin: 1rem 0 0;
    font-size: ${(props) => props.theme.fonts.sizes.small};
  }
`

const ThanxRewardsTitle = styled(Heading)`
  font-size: ${(props) => props.theme.fonts.sizes.main};
`

const ThanxRewardsFinePrint = styled('p')`
  font-size: ${(props) => props.theme.fonts.sizes.xSmall};
`

const ThanxRewards = ({ rewards }) => {
  if (!rewards || !rewards.length) return null
  return (
    <ThanxRewardsView>
      <ThanxRewardsHeader>
        <h2>Your Rewards</h2>
        <p>You'll have the opportunity to redeem these on the checkout page.</p>
      </ThanxRewardsHeader>
      <div>
        {rewards.map((reward) => {
          return (
            <ThanxRewardsReward key={reward.ext_id}>
              <ThanxRewardsTitle>{reward.name}</ThanxRewardsTitle>
              {reward.description && <p>{reward.description}</p>}
              {reward.fine_print && (
                <ThanxRewardsFinePrint>
                  Fine Print: {reward.fine_print}
                </ThanxRewardsFinePrint>
              )}
            </ThanxRewardsReward>
          )
        })}
      </div>
    </ThanxRewardsView>
  )
}

ThanxRewards.displayName = 'ThanxRewards'

export default ThanxRewards
