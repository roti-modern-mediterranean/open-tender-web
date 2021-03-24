import propTypes from 'prop-types'
import styled from '@emotion/styled'
import { Preface } from '@open-tender/components'

const BuilderNotesView = styled('div')`
  // padding: 1.5rem 2rem 2rem;
  // border: 0.1rem solid ${(props) => props.theme.colors.beet};
  // border-radius: 1.4rem;

  div + & {
    margin: 3rem 0 0;
  }

  textarea {
    height: 4.3rem;
  }
`

const BuilderNotesLabel = styled(Preface)`
  display: block;
  font-weight: 500;
  font-size: 2.2rem;
  letter-spacing: 0.01em;
  line-height: 1;
  margin: 0 0 0.5rem;
`

const BuilderNotes = ({ notes, setNotes }) => {
  return (
    <BuilderNotesView>
      <label htmlFor="item-notes">
        <BuilderNotesLabel>Notes for this item</BuilderNotesLabel>
        <textarea
          id="item-notes"
          value={notes || ''}
          placeholder="add some notes if needed"
          onChange={(evt) => setNotes(evt.target.value)}
        />
      </label>
    </BuilderNotesView>
  )
}

BuilderNotes.displayName = 'BuilderNotes'
BuilderNotes.propTypes = {
  notes: propTypes.string,
  setNotes: propTypes.func,
}

export default BuilderNotes
