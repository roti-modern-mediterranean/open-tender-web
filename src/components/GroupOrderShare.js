import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import {
  selectGroupOrder,
  resetGroupOrder,
  removeCustomerGroupOrder,
} from '@open-tender/redux'
import { Button } from '@open-tender/components'

import { closeModal } from '../slices'
import iconMap from './iconMap'

const GroupOrderShare = () => {
  const [copied, setCopied] = useState(false)
  const history = useHistory()
  const dispatch = useDispatch()
  const { token, cartId } = useSelector(selectGroupOrder)
  const origin = window.location.origin
  const url = `${origin}/join/${token}`

  useEffect(() => {
    setCopied(false)
  }, [])

  const copy = (evt) => {
    evt.preventDefault()
    evt.target.blur()
  }

  const proceed = (evt) => {
    evt.preventDefault()
    history.push('/review')
    dispatch(closeModal())
    evt.target.blur()
  }

  const backToMenu = (evt) => {
    evt.preventDefault()
    dispatch(closeModal())
    evt.target.blur()
  }

  const save = (evt) => {
    evt.preventDefault()
    dispatch(resetGroupOrder())
    dispatch(closeModal())
    evt.target.blur()
  }

  const cancel = (evt) => {
    evt.preventDefault()
    dispatch(removeCustomerGroupOrder(cartId))
    dispatch(closeModal())
    evt.target.blur()
  }

  return (
    <div className="modal__content">
      <div className="modal__header">
        <p className="modal__title ot-heading ot-font-size-h3">
          Spread the love!
        </p>
        <p className="modal__subtitle">
          Share the link below with your friends so they can add their items to
          your group order
        </p>
      </div>
      <div className="modal__body -message ot-line-height">
        <div className="modal__body__section">
          <CopyToClipboard text={url} onCopy={() => setCopied(true)}>
            <Button
              text={url}
              classes="ot-btn ot-btn--small ot-btn--highlight"
              icon={iconMap['Clipboard']}
              onClick={copy}
            />
          </CopyToClipboard>
          {copied ? (
            <p className="copied ot-font-size-small ot-color-success">
              Copied to clipboard!
            </p>
          ) : (
            <p className="copied ot-font-size-small">
              Click button above to copy the link to your clipboard
            </p>
          )}
          <p>
            Once you've added your own items, proceed to the next page to review
            the orders that have been submitted before you proceed to the
            checkout page.
          </p>
          <p>
            <Button
              text="Review All Orders"
              classes="ot-btn"
              icon={iconMap['ShoppingBag']}
              onClick={proceed}
            />
            <Button
              text="Back To Menu"
              classes="ot-btn ot-btn--secondary"
              icon={iconMap['Map']}
              onClick={backToMenu}
            />
          </p>
        </div>
      </div>
      <div className="modal__footer">
        <p className="ot-font-size-small">
          Change your mind? Save this order for later or cancel it altogether.
        </p>
        <div className="modal__footer__buttons">
          <Button
            text="Save for Later"
            classes="ot-btn ot-btn--small"
            icon={iconMap['Save']}
            onClick={save}
          />
          <Button
            text="Delete Forever"
            classes="ot-btn ot-btn--small ot-btn--cancel"
            icon={iconMap['Trash2']}
            onClick={cancel}
          />
        </div>
      </div>
    </div>
  )
}

GroupOrderShare.displayName = 'GroupOrderShare'

export default GroupOrderShare
