import { Preface } from '@open-tender/components'
import { CallUs } from '../../icons'
import ButtonStyle from './ButtonStyle'

const CallUsButton = () => {
  return (
    <ButtonStyle as="a" href="tel:8776647684">
      <Preface>Call Us</Preface>
      <CallUs />
    </ButtonStyle>
  )
}

export default CallUsButton;
