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
import { allergenIconMap } from './icons/allergens'

const AllergenFormView = styled('div')`
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
  border-radius: ${(props) => props.theme.border.radius};
  background-color: ${(props) =>
    props.theme.bgColors[props.on ? 'dark' : 'secondary']};
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

const Switch = ({
  label,
  icon,
  imageUrl,
  id,
  on,
  onChange,
  disabled = false,
}) => {
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
    const smallImg = i.images.find(
      (img) => img.type === 'SMALL_IMAGE' && img.url
    )
    const imageUrl = smallImg ? smallImg.url : null
    const { allergen_id, name } = i
    return { allergen_id, name, imageUrl }
  })
  console.log(displayed)

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
              imageUrl={allergen.imageUrl}
              id={`${allergen.allergen_id}`}
              on={allergenIds.includes(allergen.allergen_id)}
              onChange={handleChange}
            />
          ))}
        </AllergenInputs>
        <ButtonSubmit submitRef={submitRef} submitting={submitting}>
          {submitting ? 'Submitting...' : 'Submit Updates'}
        </ButtonSubmit>
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
