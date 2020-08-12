import React, { useState, useEffect } from 'react'
import propTypes from 'prop-types'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { Button } from '@open-tender/components'

import iconMap from './iconMap'

const GroupOrderLink = ({
  token,
  className = 'ot-btn ot-btn--small ot-btn--highlight',
  instructions = 'Click button above to copy the link to your clipboard',
}) => {
  const [copied, setCopied] = useState(false)
  const url = `${window.location.origin}/join/${token}`

  useEffect(() => {
    setCopied(false)
  }, [])

  const copy = (evt) => {
    evt.preventDefault()
    evt.target.blur()
  }

  return (
    <>
      <CopyToClipboard text={url} onCopy={() => setCopied(true)}>
        <Button
          text={url}
          classes={className}
          icon={iconMap['Clipboard']}
          onClick={copy}
        />
      </CopyToClipboard>
      {copied ? (
        <p className="copied ot-font-size-small ot-color-success">
          Copied to clipboard!
        </p>
      ) : (
        <p className="copied ot-font-size-small">{instructions || <br />}</p>
      )}
    </>
  )
}

GroupOrderLink.displayName = 'GroupOrderLink'
GroupOrderLink.propTypes = {
  token: propTypes.string,
}

export default GroupOrderLink
