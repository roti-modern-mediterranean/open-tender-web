import React, { useState, useEffect } from 'react'
import propTypes from 'prop-types'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { ButtonStyled } from '@open-tender/components'

import iconMap from './iconMap'
import styled from '@emotion/styled'

const CopyResult = styled('p')`
  margin: 1rem 0 0;
  font-size: ${(props) => props.theme.fonts.sizes.small};
  ${(props) => (props.copied ? `color: ${props.theme.colors.success};` : null)}
`

const GroupOrderLink = ({
  token,
  instructions = 'Click button above to copy the link to your clipboard',
}) => {
  const [copied, setCopied] = useState(false)
  const url = `${window.location.origin}/join/${token}`

  useEffect(() => {
    setCopied(false)
  }, [])

  const copy = () => {
    return
  }

  return (
    <>
      <p>
        <CopyToClipboard text={url} onCopy={() => setCopied(true)}>
          <ButtonStyled
            icon={iconMap.Clipboard}
            onClick={copy}
            size="small"
            color="cart"
            style={{ textAlign: 'left', padding: '1rem 1rem' }}
          >
            {url}
          </ButtonStyled>
        </CopyToClipboard>
      </p>
      {copied ? (
        <CopyResult copied={copied}>Copied to clipboard!</CopyResult>
      ) : (
        <CopyResult>{instructions || <br />}</CopyResult>
      )}
    </>
  )
}

GroupOrderLink.displayName = 'GroupOrderLink'
GroupOrderLink.propTypes = {
  token: propTypes.string,
}

export default GroupOrderLink
