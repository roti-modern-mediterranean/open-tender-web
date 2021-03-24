import propTypes from 'prop-types'
import styled from '@emotion/styled'
import { Preface } from '@open-tender/components'

const BuilderMadeForView = styled('div')`
  // padding: 1.5rem 2rem 2rem;
  // border: 0.1rem solid ${(props) => props.theme.colors.beet};
  // border-radius: 1.4rem;
`

const BuilderMadeForLabel = styled(Preface)`
  display: block;
  font-weight: 500;
  font-size: 2.2rem;
  letter-spacing: 0.01em;
  line-height: 1;
  margin: 0 0 0.5rem;
`

const BuilderMadeFor = ({ madeFor, setMadeFor }) => {
  return (
    <BuilderMadeForView>
      <label htmlFor="made-for">
        <BuilderMadeForLabel>Who is it for?</BuilderMadeForLabel>
        <input
          id="made-for"
          type="text"
          value={madeFor || ''}
          placeholder="enter a person's name"
          onChange={(evt) => setMadeFor(evt.target.value)}
        />
      </label>
    </BuilderMadeForView>
  )
}

BuilderMadeFor.displayName = 'BuilderMadeFor'
BuilderMadeFor.propTypes = {
  madeFor: propTypes.string,
  setMadeFor: propTypes.func,
}

export default BuilderMadeFor
