import React, { useState, useEffect } from 'react'
import propTypes from 'prop-types'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { ButtonStyled } from '@open-tender/components'

import iconMap from './iconMap'
import styled from '@emotion/styled'

const GroupOrderLinkView = styled('p')`
  button {
    width: 100%;
    font-size: ${(props) => props.theme.fonts.sizes.main};
    text-transform: lowercase;
    color: ${(props) => props.theme.colors.paprika};
    background-color: transparent;
    border-color: ${(props) => props.theme.colors.paprika};

    &:hover,
    &:active,
    &:focus {
      color: ${(props) => props.theme.colors.light};
      background-color: ${(props) => props.theme.colors.paprika};
      border-color: ${(props) => props.theme.colors.paprika};
    }
  }
`

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
      <GroupOrderLinkView>
        <CopyToClipboard text={url} onCopy={() => setCopied(true)}>
          <ButtonStyled icon={iconMap.Clipboard} onClick={copy}>
            {url}
          </ButtonStyled>
        </CopyToClipboard>
      </GroupOrderLinkView>
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
