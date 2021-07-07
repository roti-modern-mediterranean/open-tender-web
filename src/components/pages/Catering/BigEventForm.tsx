import React, { useCallback, useEffect, useState } from 'react'
import Input from '../../inputs/Input'
import { Mail, Phone, User, Edit } from '../../icons'
import {
  useEmailFieldState,
  useNumberFieldState,
  usePhoneFieldState,
  useRequiredFieldState,
} from '../../../hooks'
import { Textarea } from '../../inputs'
import { makePhone } from '@open-tender/js'
import styled from '@emotion/styled'

const Container = styled.div`
  label: BigEventFormContainer;

  overflow-y: auto;
  display: grid;
  grid-template-rows: minmax(100px, 250px);
`

const ExpandingTextareaContainer = styled.span`
  label: ExpandingTextareaContainer;

  display: grid;

  > label {
    grid-area: 1 / 1 / 2 / 2;
  }

  &::after {
    /* Note the weird space! Needed to prevent jumpy behavior */
    content: attr(data-notes) ' ';

    /* This is how textarea text behaves */
    white-space: pre-wrap;
    overflow-wrap: anywhere;

    /* Hidden from view, clicks, and screen readers */
    visibility: hidden;

    grid-area: 1 / 1 / 2 / 2;
    line-height: ${(props) => props.theme.inputs.lineHeight};
    padding: ${(props) => props.theme.inputs.padding};
    width: calc(100% - ${(props) => props.theme.inputs.labelTextLeftMargin});
    border: 0;
    border-bottom: ${(props) => props.theme.inputs.borderWidth} solid #7f8692;
    border-radius: 0;
    font-family: ${(props) => props.theme.inputs.family};
    font-size: ${(props) => props.theme.inputs.fontSize};
    font-weight: ${(props) => props.theme.inputs.weight};
  }
`

const CustomTextarea = styled(Textarea)`
  label: CustomTextarea;

  height: 100%;

  textarea {
    height: 100%;
    overflow-y: hidden;
  }
`

interface BigEventFormProps {
  setFormValidated: React.Dispatch<React.SetStateAction<boolean>>
}

const BigEventForm = ({ setFormValidated }: BigEventFormProps) => {
  const [name, setName, nameError] = useRequiredFieldState('')
  const nameOnChange = useCallback(
    (event) => setName(event.target.value),
    [setName]
  )
  const [showNameError, setShowNameError] = useState(false)
  const nameOnBlur = useCallback(
    () => setShowNameError(true),
    [setShowNameError]
  )

  const [email, setEmail, emailError] = useEmailFieldState('', true)
  const emailOnChange = useCallback(
    (event) => setEmail(event.target.value),
    [setEmail]
  )
  const [showEmailError, setShowEmailError] = useState(false)
  const emailOnBlur = useCallback(
    () => setShowEmailError(true),
    [setShowEmailError]
  )

  const [phone, setPhone, phoneError] = usePhoneFieldState('', true)
  const phoneOnChange = useCallback(
    (event) => setPhone(event.target.value),
    [setPhone]
  )
  const [showPhoneError, setShowPhoneError] = useState(false)
  const phoneOnBlur = useCallback(
    () => setShowPhoneError(true),
    [setShowPhoneError]
  )

  const [numberOfPeople, setNumberOfPeople, numberOfPeopleError] =
    useNumberFieldState('', true)
  const numberOfPeopleOnChange = useCallback(
    (event) => setNumberOfPeople(event.target.value),
    [setNumberOfPeople]
  )
  const [showNumberOfPeopleError, setShowNumberOfPeopleError] = useState(false)
  const numberOfPeopleOnBlur = useCallback(
    () => setShowNumberOfPeopleError(true),
    [setShowNumberOfPeopleError]
  )

  const [notes, setNotes] = useState('')
  const notesOnChange = useCallback(
    (event) => setNotes(event.target.value),
    [setNotes]
  )

  useEffect(
    () =>
      setFormValidated(
        !nameError.hasError &&
          !emailError.hasError &&
          !phoneError.hasError &&
          !numberOfPeopleError.hasError
      ),
    [setFormValidated, nameError, emailError, phoneError, numberOfPeopleError]
  )

  return (
    <Container>
      <form id="big-event-form" noValidate>
        <Input
          icon={<User />}
          label="Name"
          name="name"
          type="text"
          value={name}
          onChange={nameOnChange}
          onBlur={nameOnBlur}
          error={showNameError ? nameError.message : undefined}
          required={true}
        />
        <Input
          icon={<Mail />}
          label="Email"
          name="email"
          type="email"
          value={email}
          onChange={emailOnChange}
          onBlur={emailOnBlur}
          error={showEmailError ? emailError.message : undefined}
          required={true}
          autoComplete="email"
        />
        <Input
          icon={<Phone />}
          label="Phone"
          name="phone"
          type="tel"
          value={makePhone(phone)}
          onChange={phoneOnChange}
          onBlur={phoneOnBlur}
          error={showPhoneError ? phoneError.message : undefined}
          required={true}
        />
        <Input
          icon={<User />}
          label="Number of People"
          name="number-of-people"
          type="number"
          value={numberOfPeople}
          onChange={numberOfPeopleOnChange}
          onBlur={numberOfPeopleOnBlur}
          error={
            showNumberOfPeopleError ? numberOfPeopleError.message : undefined
          }
          required={true}
        />
        <ExpandingTextareaContainer data-notes={notes}>
          <CustomTextarea
            icon={<Edit />}
            label="Any notes?"
            name="notes"
            value={notes}
            onChange={notesOnChange}
          />
        </ExpandingTextareaContainer>
      </form>
    </Container>
  )
}

export default BigEventForm
