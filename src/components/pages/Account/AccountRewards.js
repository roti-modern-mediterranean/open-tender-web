import React from 'react'
import propTypes from 'prop-types'

import { ItemsScrollable, Reward, Section, SectionHeader } from '../..'

const AccountRewards = ({ rewards }) => {
  if (!rewards.length) return null
  rewards = rewards.map((i) => ({ ...i, key: i.id }))
  const title =
    rewards.length > 1
      ? `You have ${rewards.length} rewards!`
      : 'You have a reward!'

  return (
    <Section>
      <SectionHeader title={title} to="/rewards" />
      <ItemsScrollable
        items={rewards}
        renderItem={(item) => <Reward item={item} />}
      />
    </Section>
  )
}

AccountRewards.displayName = 'AccountRewards'
AccountRewards.propTypes = {
  rewards: propTypes.array,
}

export default AccountRewards
