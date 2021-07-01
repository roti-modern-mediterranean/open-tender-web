import React, { useCallback, useState } from 'react'
import Input from '../../inputs/Input'
import { Mail, Phone, User } from '../../icons'
import { useEmailFieldState, useNumberFieldState, usePhoneFieldState, useRequiredFieldState } from '../../../hooks'
import { Textarea } from '../../inputs'

const BigEventForm = () => {

  const [name, setName, nameError] = useRequiredFieldState("")
  const nameOnChange = useCallback((event)=>setName(event.target.value), [setName])

  const [email, setEmail, emailError] = useEmailFieldState("", true)
  const emailOnChange = useCallback((event)=>setEmail(event.target.value), [setName])

  const [phone, setPhone, phoneError] = usePhoneFieldState("", true)
  const phoneOnChange = useCallback((event)=>setPhone(event.target.value), [setName])

  const [numberOfPeople, setNumberOfPeople, numberOfPeopleError] = useNumberFieldState("", true)
  const numberOfPeopleOnChange = useCallback((event)=>setNumberOfPeople(event.target.value), [setName])

  const [notes, setNotes] = useState("");
  const notesOnChange = useCallback((event)=>setNotes(event.target.value), [setNotes])

  return (
    <form id="big-event-form" noValidate>
      <Input
        icon={<User />}
        label="Name"
        name="name"
        type="text"
        value={name}
        onChange={nameOnChange}
        error={nameError.message}
        required={true}
      />
      <Input
        icon={<Mail />}
        label="Email"
        name="email"
        type="email"
        value={email}
        onChange={emailOnChange}
        error={emailError.message}
        required={true}
        autoComplete="email"
      />
      <Input
        icon={<Phone />}
        label="Phone"
        name="phone"
        type="tel"
        value={phone}
        onChange={phoneOnChange}
        error={phoneError.message}
        required={true}
      />
      <Input
        icon={<User />}
        label="Number of People"
        name="number-of-people"
        type="number"
        value={numberOfPeople}
        onChange={numberOfPeopleOnChange}
        error={numberOfPeopleError.message}
        required={true}
      />
      <Textarea
        label="Any notes?"
        name="notes"
        value={notes}
        onChange={notesOnChange}
      />
    </form>
  )
}

export default BigEventForm;
