import React from 'react'
import { action } from '@storybook/addon-actions'

import { Button } from 'open-tender'

export default {
  component: Button,
  title: 'Button',
  excludeStories: /.*Data$/,
}

export const buttonData = {
  text: 'Click Me',
  classes: 'btn',
  onClick: action('onClick'),
}

export const Default = () => <Button {...buttonData} />
