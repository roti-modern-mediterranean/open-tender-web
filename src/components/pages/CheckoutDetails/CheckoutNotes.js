import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { selectOrder } from '@open-tender/redux'

import { FormHeader, Textarea } from '../../inputs'
// import CheckoutQuickOptions from './CheckoutQuickOptions'
// import { AddCondiments, DressingOnTheSide, LeaveAtDoor } from '../../icons'
import styled from '@emotion/styled'

const optionButtons = [
  // {
  //   text: 'Leave at door',
  //   icon: <LeaveAtDoor />,
  //   serviceTypes: ['DELIVERY'],
  // },
  // {
  //   text: 'Add condiments',
  //   icon: <AddCondiments />,
  //   serviceTypes: ['DELIVERY', 'PICKUP'],
  // },
  // {
  //   text: 'Dressing on the side',
  //   icon: <DressingOnTheSide />,
  //   serviceTypes: ['DELIVERY', 'PICKUP'],
  // },
]

const LabelRequired = styled('span')`
  color: ${(props) => props.theme.colors.error} !important;
`

const makeNotes = (options, notes) => {
  const optionsStr = options.length ? `${options.join(', ')}, ` : ''
  return optionsStr + notes
}

const makeInitState = (notes, serviceType) => {
  const parts = notes.split(', ')
  const optionsText = optionButtons
    .filter((i) => i.serviceTypes.includes(serviceType))
    .map((i) => i.text)
  const options = optionsText.filter((text) => parts.includes(text))
  const allText = optionButtons.map((i) => i.text)
  const text = parts.filter((part) => !allText.includes(part)).join(', ')
  return [options, text]
}

const CheckoutNotesView = styled('div')`
  margin: 3rem 0 0;
`

const CheckoutNotes = ({ notes, required, handleChange, errors = {} }) => {
  const { serviceType } = useSelector(selectOrder)
  const [initOptions, initText] = makeInitState(notes, serviceType)
  const [options, setOptions] = useState(initOptions)
  const [text, setText] = useState(initText)
  const label = `${serviceType.toLowerCase()} Notes`
  const noNotes = !text && options.length === 0
  // const filteredButtons = optionButtons.filter((i) =>
  //   i.serviceTypes.includes(serviceType)
  // )

  useEffect(() => {
    if (noNotes && notes) {
      const [initOptions, initText] = makeInitState(notes, serviceType)
      setOptions(initOptions)
      setText(initText)
    }
  }, [noNotes, notes, serviceType])

  // const handleOption = (evt, option) => {
  //   evt.preventDefault()
  //   const newOptions = options.includes(option)
  //     ? options.filter((i) => i !== option)
  //     : [...options, option]
  //   setOptions(newOptions)
  //   const target = {
  //     id: 'notes',
  //     type: 'text',
  //     value: makeNotes(newOptions, text),
  //   }
  //   handleChange({ target })
  // }

  const handleNotes = (evt) => {
    setText(evt.target.value)
    const target = {
      id: 'notes',
      type: 'text',
      value: makeNotes(options, evt.target.value),
    }
    handleChange({ target })
  }

  return (
    <CheckoutNotesView>
      {/* <CheckoutQuickOptions
        buttons={filteredButtons}
        options={options}
        handleOption={handleOption}
      /> */}
      <FormHeader style={{ marginBottom: '0' }}>
        <h2>
          {label}
          {required && <LabelRequired>*</LabelRequired>}
        </h2>
      </FormHeader>
      <Textarea
        label={label}
        name="notes"
        showLabel={false}
        value={text}
        onChange={handleNotes}
        error={errors.notes}
        required={required}
      />
    </CheckoutNotesView>
  )
}

export default CheckoutNotes
