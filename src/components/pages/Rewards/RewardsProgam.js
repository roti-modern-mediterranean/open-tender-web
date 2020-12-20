import React from 'react'
import propTypes from 'prop-types'
import { loyaltyType } from '@open-tender/js'
import styled from '@emotion/styled'
import { Heading, ProgressBar } from '../..'

const RewardsProgramView = styled('div')`
  padding: 2rem 2rem;
  background-color: ${(props) => props.theme.bgColors.primary};
  border: ${(props) => props.theme.border.width} solid
    ${(props) => props.theme.border.color};
  border-radius: ${(props) => props.theme.border.radius};
  margin: 0 0 3rem;
  opacity: 0;
  animation: slide-up 0.25s ease-in-out 0.125s forwards;
`

const RewardsProgramHeader = styled('div')`
  margin: 0 0 1.5rem;

  h2 {
    font-size: ${(props) => props.theme.fonts.sizes.h5};
  }

  p {
    margin: 0.5rem 0 0;
    font-size: ${(props) => props.theme.fonts.sizes.small};
  }
`

const RewardsProgramCredit = styled('div')`
  margin: 1rem 0;
`

const RewardsProgramProgress = styled('p')`
  margin: 1rem 0 0;
  font-size: ${(props) => props.theme.fonts.sizes.xSmall};
`

const RewardsProgram = ({ program }) => {
  const { name, description, loyalty_type, spend, redemption, credit } = program
  const progress =
    loyalty_type === loyaltyType.CREDIT
      ? parseInt(
          (parseFloat(spend.current) / parseFloat(redemption.threshold)) * 100
        )
      : null
  const currentCredit = parseFloat(credit.current)
  return (
    <RewardsProgramView>
      <RewardsProgramHeader>
        <h2>{name}</h2>
        <p>{description}</p>
      </RewardsProgramHeader>
      {currentCredit && (
        <RewardsProgramCredit>
          <Heading>Current credit: ${currentCredit.toFixed(2)}</Heading>
        </RewardsProgramCredit>
      )}
      <ProgressBar progress={progress} />
      <RewardsProgramProgress>
        {progress
          ? `You're ${progress}% of the way towards earning your next $${redemption.reward} off!`
          : 'Make your first purchase to start earning rewards!'}
      </RewardsProgramProgress>
    </RewardsProgramView>
  )
}

RewardsProgram.displayName = 'RewardsProgram'
RewardsProgram.propTypes = {
  program: propTypes.object,
}

export default RewardsProgram
