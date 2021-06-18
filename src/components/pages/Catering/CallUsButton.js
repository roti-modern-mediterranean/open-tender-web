import { Preface } from '@open-tender/components'
import { CallUs } from '../../icons'
import styled from '@emotion/styled'


const Container = styled.a`
  label: CallUsButtonContainer;

  width: 16.4rem;
  height: 4.7rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1rem 0 1.7rem;
  border-radius: ${(props) => props.theme.border.radius};
  border: 0.1rem solid ${(props) => props.theme.colors.paprika};
  background-color: transparent;

  span {
    color: ${(props) => props.theme.colors.paprika};
    line-height: 1;
    transition: ${(props) => props.theme.links.transition};

    &:first-of-type {
      padding: 0 0 0.2rem;
    }

    svg path,
    svg circle {
      transition: ${(props) => props.theme.links.transition};
    }
  }

  &:hover,
  &:active,
  &:focus {
    border: 0.1rem solid ${(props) => props.theme.links.primary.hover};
    background-color: ${(props) => props.theme.links.primary.hover};

    span {
      color: ${(props) => props.theme.colors.light};
    }

    span:last-of-type path,
    span:last-of-type circle {
      stroke: ${(props) => props.theme.colors.light};
    }
  }
`

const CallUsButton = () => {
  return (
    <Container href="tel:8776647684">
      <Preface>Call Us</Preface>
      <CallUs />
    </Container>
  )
}

export default CallUsButton;
