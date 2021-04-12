import propTypes from 'prop-types'
import styled from '@emotion/styled'
import { useTheme } from '@emotion/react'

const ChatView = styled('span')`
  display: block;
  width: ${(props) => props.size};
  line-height: 0;

  svg {
    width: 100%;
    fill: none;
  }
`

const Chat = ({ size = '3.6rem', color = null }) => {
  const theme = useTheme()
  color = color || theme.colors.paprika
  return (
    <ChatView size={size} color={color}>
      <svg viewBox="0 0 36 36">
        <path
          d="M31.5 21L27 16.5H16.5C16.1022 16.5 15.7206 16.342 15.4393 16.0607C15.158 15.7794 15 15.3978 15 15V6C15 5.60218 15.158 5.22064 15.4393 4.93934C15.7206 4.65804 16.1022 4.5 16.5 4.5H30C30.3978 4.5 30.7794 4.65804 31.0607 4.93934C31.342 5.22064 31.5 5.60218 31.5 6V21Z"
          stroke={color}
          stroke-width="1.4"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M21 22.5V25.5C21 25.8978 20.842 26.2794 20.5607 26.5607C20.2794 26.842 19.8978 27 19.5 27H9L4.5 31.5V16.5C4.5 16.1022 4.65804 15.7206 4.93934 15.4393C5.22064 15.158 5.60218 15 6 15H9"
          stroke={color}
          stroke-width="1.4"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </ChatView>
  )
}

Chat.displayName = 'Chat'
Chat.propTypes = {
  color: propTypes.string,
  size: propTypes.string,
}

export default Chat
