import { Preface } from '@open-tender/components'
import { Chat } from '../../icons'
import { useCallback, useState } from 'react'
import ButtonCommon, { ButtonProps } from './ButtonCommon'
import { useTheme } from '@emotion/react'


const ChatButton = ({lightMode}:ButtonProps) => {

  const theme = useTheme();

  const [open, setOpen] = useState(false)

  const toggle = useCallback((evt) => {
    evt.preventDefault()
    setOpen(!open)
    evt.target.blur()
  }, [open, setOpen])

  return (
    <ButtonCommon lightMode={lightMode} id="intercom-launcher" onClick={toggle}>
      <Preface>{open ? 'Close' : 'Open'} Chat</Preface>
      {
        lightMode
          ? <Chat color={theme.colors.tahini} />
          : <Chat />
      }
    </ButtonCommon>)
}

export default ChatButton;
