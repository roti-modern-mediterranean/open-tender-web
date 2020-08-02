import React from 'react'

const GroupOrderSteps = () => {
  return (
    <ol>
      <li>
        Clicking the button below will start a group order and display a link.
      </li>
      <li>
        Share this link with your friends via email, Slack, etc. so they can
        join the group order, add their name, and select their items.
      </li>
      <li>
        Add any items you're ordering for yourself, and then click the shopping
        bag button to submit your order.
      </li>
      <li>
        This will take you to a page where you can review all of the orders that
        have been submitted by your friends.
      </li>
      <li>
        When you're ready, you can proceed to the checkout step, which will
        close the group order (so orders can no longer be added to the shared
        cart).
      </li>
      <li>Submit your payment and you're all set!</li>
    </ol>
  )
}

GroupOrderSteps.displayName = 'GroupOrderSteps'

export default GroupOrderSteps
