import React from 'react'
import { MenuContent } from '../../../HighlightedMenu'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { selectRevenueCenter } from '@open-tender/redux'

interface SentBigEventFormStageProps {
}

const SentBigEventFormStage = ({}:SentBigEventFormStageProps) => {

  const revenueCenter =
    useSelector(selectRevenueCenter)

  return (
    <>
      <MenuContent
        title="Request sent!"
        subtitle="We will contact you shortly!"
      >
        <Link to={`/menu/${revenueCenter.slug}`}>Back to your Roti!</Link>
      </MenuContent>
    </>
  )
}

export default SentBigEventFormStage;
