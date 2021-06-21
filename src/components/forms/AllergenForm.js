import propTypes from 'prop-types'
import styled from '@emotion/styled'
import {
  useAllergenForm,
  FormError,
  // FormInputs,
  // Switch,
  // FormSubmit,
  ButtonSubmit,
  Heading,
} from '@open-tender/components'
import { allergenIconMap } from '../icons/allergens'
import { FormSubmit } from '../inputs'

const AllergenFormView = styled('div')`
  label: AllergenFormView;
  // label {
  //   padding: 1.25rem 0;

  //   & > span > span:last-of-type {
  //     text-align: right;
  //     line-height: 1;
  //   }
  // }
`

const AllergenInputs = styled('div')`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin: 2rem -0.5rem 2rem;
`

const SwitchLabel = styled('label')`
  display: block;
  width: 33.33333%;
  padding: 0.5rem;
  cursor: pointer;
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    width: 50%;
  }
`

const SwitchInput = styled('input')`
  position: absolute;
  border: 0;
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  white-space: nowrap;
`

const SwitchToggle = styled(`span`)`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 4.6rem;
  padding: 0 0.5rem 0 1.75rem;
  transition: ${(props) => props.theme.links.transition};
  border-radius: ${(props) => props.theme.border.radius};
  background-color: ${(props) =>
    props.theme.bgColors[props.on ? 'dark' : 'secondary']};

  &:hover {
    background-color: ${(props) =>
      props.theme.colors[props.on ? 'dark' : 'cardHover']};
  }
`

const SwitchToggleIcon = styled('span')`
  display: block;
  margin: 0 1rem 0 0;
  line-height: 0;
`

const SwitchToggleName = styled(Heading)`
  display: block;
  font-weight: 600;
  font-size: 1.4rem;
  line-height: 1.05;
`

const Switch = ({ label, icon, id, on, onChange, disabled = false }) => {
  return (
    <SwitchLabel htmlFor={id}>
      <SwitchInput
        aria-label={label}
        id={id}
        type="checkbox"
        checked={on}
        onChange={onChange}
        disabled={disabled}
      />
      <SwitchToggle on={on}>
        {icon && <SwitchToggleIcon>{icon()}</SwitchToggleIcon>}
        <SwitchToggleName>{label}</SwitchToggleName>
      </SwitchToggle>
    </SwitchLabel>
  )
}

const AllergenForm = ({
  allergens,
  selectedAllergens,
  isLoading,
  error,
  setAllergens,
  updateAllergens,
  callback,
}) => {
  const {
    submitRef,
    submitting,
    allergenIds,
    formError,
    handleChange,
    handleSubmit,
  } = useAllergenForm(
    allergens,
    selectedAllergens,
    isLoading,
    error,
    setAllergens,
    updateAllergens,
    callback
  )

  if (!allergens) return null

  const displayed = allergens.map((i) => {
    const { allergen_id, name } = i
    return { allergen_id, name }
  })

  return (
    <AllergenFormView>
      <form id="allergen-form" onSubmit={handleSubmit} noValidate>
        <FormError errMsg={formError} style={{ margin: '0 0 2rem' }} />
        {allergenIconMap.dairy}
        <AllergenInputs>
          {displayed.map((allergen) => (
            <Switch
              key={allergen.allergen_id}
              label={allergen.name}
              icon={allergenIconMap[allergen.name] || null}
              id={`${allergen.allergen_id}`}
              on={allergenIds.includes(allergen.allergen_id)}
              onChange={handleChange}
            />
          ))}
        </AllergenInputs>
        <FormSubmit>
          <ButtonSubmit
            submitRef={submitRef}
            submitting={submitting}
            color="secondary"
          >
            {submitting ? 'Submitting...' : 'Submit Updates'}
          </ButtonSubmit>
        </FormSubmit>
      </form>
    </AllergenFormView>
  )
}

AllergenForm.displayName = 'AllergenForm'
AllergenForm.propTypes = {
  allergens: propTypes.array,
  selectedAllergens: propTypes.array,
  isLoading: propTypes.bool,
  error: propTypes.object,
  setAllergens: propTypes.func,
  updateAllergens: propTypes.func,
  callback: propTypes.func,
}

export default AllergenForm
