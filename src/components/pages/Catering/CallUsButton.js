import { Preface } from '@open-tender/components'
import { Chat } from '../../icons'
import ButtonStyle from './ButtonStyle'
import propTypes from 'prop-types'
import { useTheme } from '@emotion/react'

const CallUsButton = ({lightMode}) => {

  const theme = useTheme();

  return (
    <ButtonStyle as="a" lightMode={lightMode} href="tel:8776647684">
      <Preface>Call Us</Preface>
      {
        lightMode
          ? <Chat color={theme.colors.tahini} />
          : <Chat />
      }
    </ButtonStyle>
  )
}

CallUsButton.displayName = 'CallUsButton'
CallUsButton.propTypes = {
  lightMode: propTypes.bool,
}

export default CallUsButton;
