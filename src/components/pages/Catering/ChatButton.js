import { Preface } from '@open-tender/components'
import { Chat } from '../../icons'
import { useCallback, useState } from 'react'
import ButtonStyle from './ButtonStyle'


const ChatButton = () => {

  const [open, setOpen] = useState(false)

  const toggle = useCallback((evt) => {
    evt.preventDefault()
    setOpen(!open)
    evt.target.blur()
  }, [open, setOpen])

  return (
    <ButtonStyle id="intercom-launcher" onClick={toggle}>
      <Preface>{open ? 'Close' : 'Open'} Chat</Preface>
      <Chat />
    </ButtonStyle>)
}

export default ChatButton;
