import React, { useCallback, useEffect, useState } from 'react'
import Input from '../../inputs/Input'
import { Mail, Phone, User } from '../../icons'
import { useEmailFieldState, useNumberFieldState, usePhoneFieldState, useRequiredFieldState } from '../../../hooks'
import { Textarea } from '../../inputs'
import { makePhone } from '@open-tender/js'
import styled from '@emotion/styled'

const Container = styled.div`
  label: BigEventFormContainer;
  
  overflow-y: auto;
  display: grid;
  grid-template-rows: minmax(100px,250px);
`;

const CustomTextarea = styled(Textarea)`
  label: CustomTextarea;
  
  height: 100px;
`;

interface BigEventFormProps {
  setFormValidated: React.Dispatch<React.SetStateAction<boolean>>
}

const BigEventForm = ({setFormValidated}:BigEventFormProps) => {

  const [name, setName, nameError] = useRequiredFieldState("")
  const nameOnChange = useCallback((event)=>setName(event.target.value), [setName])
  const [showNameError, setShowNameError] = useState(false)
  const nameOnBlur = useCallback(()=>setShowNameError(true), [setShowNameError])

  const [email, setEmail, emailError] = useEmailFieldState('', true)
  const emailOnChange = useCallback((event)=>setEmail(event.target.value), [setEmail])
  const [showEmailError, setShowEmailError] = useState(false)
  const emailOnBlur = useCallback(()=>setShowEmailError(true), [setShowEmailError])

  const [phone, setPhone, phoneError] = usePhoneFieldState('', true)
  const phoneOnChange = useCallback((event)=>setPhone(event.target.value), [setPhone])
  const [showPhoneError, setShowPhoneError] = useState(false)
  const phoneOnBlur = useCallback(()=>setShowPhoneError(true), [setShowPhoneError])

  const [numberOfPeople, setNumberOfPeople, numberOfPeopleError] = useNumberFieldState("", true)
  const numberOfPeopleOnChange = useCallback((event)=>setNumberOfPeople(event.target.value), [setNumberOfPeople])
  const [showNumberOfPeopleError, setShowNumberOfPeopleError] = useState(false)
  const numberOfPeopleOnBlur = useCallback(()=>setShowNumberOfPeopleError(true), [setShowNumberOfPeopleError])

  const [notes, setNotes] = useState("");
  const notesOnChange = useCallback((event)=>setNotes(event.target.value), [setNotes])

  useEffect(()=>setFormValidated(
    !nameError.hasError &&
    !emailError.hasError &&
    !phoneError.hasError &&
    !numberOfPeopleError.hasError)
  , [setFormValidated, nameError, emailError, phoneError, numberOfPeopleError])

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
          error={showNumberOfPeopleError ? numberOfPeopleError.message : undefined}
          required={true}
        />
        <CustomTextarea
          label="Any notes?"
          name="notes"
          value={notes}
          onChange={notesOnChange}
        />
      </form>
    </Container>
  )
}

export default BigEventForm;
