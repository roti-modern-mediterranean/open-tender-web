import { Preface } from '@open-tender/components'
import { Chat } from '../../icons'
import { useCallback, useState } from 'react'
import ButtonStyle from './ButtonStyle'
import propTypes from 'prop-types'
import { useTheme } from '@emotion/react'


const ChatButton = ({lightMode}) => {

  const theme = useTheme();

  const [open, setOpen] = useState(false)

  const toggle = useCallback((evt) => {
    evt.preventDefault()
    setOpen(!open)
    evt.target.blur()
  }, [open, setOpen])

  return (
    <ButtonStyle lightMode={lightMode} id="intercom-launcher" onClick={toggle}>
      <Preface>{open ? 'Close' : 'Open'} Chat</Preface>
      {
        lightMode
          ? <Chat color={theme.colors.tahini} />
          : <Chat />
      }
    </ButtonStyle>)
}

ChatButton.displayName = 'ChatButton'
ChatButton.propTypes = {
  lightMode: propTypes.bool,
}

export default ChatButton;
