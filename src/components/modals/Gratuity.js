import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import styled from '@emotion/styled'
import { selectCheckout, updateForm, validateOrder } from '@open-tender/redux'
import { ButtonStyled, Preface } from '@open-tender/components'

import { closeModal } from '../../slices'
import { ModalContent } from '..'
import ModalView from '../Modal/ModalView'
import { Cash, Checkmark } from '../icons'
import { Input } from '../inputs'

const GratuityModalView = styled(ModalView)`
  width: 42rem;

  & > div {
    background-color: ${(props) => props.theme.bgColors.primary};
  }
`

const GratuityOption = styled('div')`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.5rem;
  margin: 0 0 0.5rem;
  border-radius: ${(props) => props.theme.border.radius};
  background-color: ${(props) => props.theme.bgColors.secondary};
`

const GratuityTitle = styled(Preface)`
  display: block;
  font-size: 1.8rem;
  font-weight: normal;
  letter-spacing: 0.01em;
  margin: 0 2rem 0 0;
  flex-grow: 1;

  span {
    font-weight: 600;
    padding: 0 0 0 1rem;
  }
`

const GratuityCheckmarkView = styled('button')`
  flex: 0 0 2.6rem;
  width: 2.6rem;
  height: 2.6rem;
  padding: 0.1rem 0 0;
  margin: 0 auto;
  border-radius: 1.3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 250ms ease;
  color: ${(props) => props.theme.colors.light};
  background-color: ${(props) => props.theme.bgColors.primary};
  box-shadow: none;

  &:hover:enabled,
  &:active:enabled,
  &:focus:enabled {
    background-color: ${(props) => props.theme.colors.beet};
  }

  &:disabled {
    opacity: 1;
    background-color: ${(props) => props.theme.colors.beet};
    box-shadow: 0 0.4rem 2rem rgba(0, 0, 0, 0.25);
  }
`

const GratuityCustom = styled('div')`
  margin: 2rem 0 0;

  button {
    width: 100%;
  }
`

const GratuityCheckmark = ({ isApplied, apply }) => {
  return (
    <GratuityCheckmarkView disabled={isApplied} onClick={apply}>
      <span>
        <Checkmark />
      </span>
    </GratuityCheckmarkView>
  )
}

const Gratuity = () => {
  const dispatch = useDispatch()
  const { check, form } = useSelector(selectCheckout)
  const tipSettings = check.config.gratuity
  const tipOptions = tipSettings.options
  const initialTip =
    form.tip && !tipOptions.find((i) => i.amount === form.tip) ? form.tip : ''
  const [customTip, setCustomTip] = useState(initialTip)

  const chooseTip = (amount) => {
    dispatch(updateForm({ tip: amount }))
    setCustomTip('')
    dispatch(validateOrder())
    dispatch(closeModal())
  }

  const handleCustomTip = (evt) => {
    setCustomTip(evt.target.value)
  }

  const applyCustomTip = () => {
    const formatted = parseFloat(customTip).toFixed(2)
    setCustomTip(formatted)
    dispatch(updateForm({ tip: formatted }))
    dispatch(validateOrder())
    dispatch(closeModal())
  }

  return (
    <GratuityModalView>
      <ModalContent
        title="Adjust the tip amount"
        subtitle={<p>Choose an increment below or enter a custom amount.</p>}
      >
        {tipOptions.map((i) => {
          const isCustom = customTip.length > 0
          const isApplied = !isCustom && check.totals.tip === i.amount
          const isDefault = tipSettings.default.amount === i.amount
          return (
            <GratuityOption key={i.amount}>
              <GratuityTitle>
                ${i.amount} ({i.percent}%)
                {isDefault && <span>Suggested</span>}
              </GratuityTitle>
              <GratuityCheckmark
                apply={isApplied ? null : () => chooseTip(i.amount)}
                isApplied={isApplied}
              />
            </GratuityOption>
          )
        })}
        <GratuityCustom>
          <Input
            icon={<Cash />}
            label="Add a custom tip"
            name="custom_tip"
            type="number"
            placeholder="enter custom tip"
            value={customTip}
            onChange={handleCustomTip}
            required={false}
          />
          <ButtonStyled
            onClick={applyCustomTip}
            disabled={customTip.length === 0}
            size="big"
            color="secondary"
          >
            Apply Custom Tip
          </ButtonStyled>
        </GratuityCustom>
      </ModalContent>
    </GratuityModalView>
  )
}

Gratuity.displayName = 'Gratuity'
Gratuity.propTypes = {}

export default Gratuity
