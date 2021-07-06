import { Preface } from '@open-tender/components'
import { Chat } from '../../icons'
import ButtonCommon, { ButtonProps } from './ButtonCommon'
import { useTheme } from '@emotion/react'

const CallUsButton = ({lightMode}:ButtonProps) => {

  const theme = useTheme();

  return (
    <ButtonCommon as="a" lightMode={lightMode} href="tel:8776647684">
      <Preface>Call Us</Preface>
      {
        lightMode
          ? <Chat color={theme.colors.tahini} />
          : <Chat />
      }
    </ButtonCommon>
  )
}

export default CallUsButton;
