import propTypes from 'prop-types'
import styled from '@emotion/styled'

const MailView = styled('span')`
  display: block;
  width: ${(props) => props.size};
  line-height: 0;

  svg {
    width: 100%;
    fill: ${(props) => props.color || props.theme.inputs.placeholderColor};
  }
`

const Mail = ({ size = '2.0rem', color = null }) => {
  return (
    <MailView size={size} color={color}>
      <svg viewBox="0 0 20 20">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M4.1665 4.6237C3.49916 4.6237 2.95817 5.16469 2.95817 5.83203V14.1654C2.95817 14.8327 3.49916 15.3737 4.1665 15.3737H15.8332C16.5005 15.3737 17.0415 14.8327 17.0415 14.1654V5.83203C17.0415 5.16469 16.5005 4.6237 15.8332 4.6237H4.1665ZM2.0415 5.83203C2.0415 4.65843 2.9929 3.70703 4.1665 3.70703H15.8332C17.0068 3.70703 17.9582 4.65843 17.9582 5.83203V14.1654C17.9582 15.339 17.0068 16.2904 15.8332 16.2904H4.1665C2.9929 16.2904 2.0415 15.339 2.0415 14.1654V5.83203Z"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M2.11853 5.57914C2.25894 5.36853 2.54351 5.31161 2.75412 5.45203L9.99989 10.2825L17.2456 5.45203C17.4563 5.31161 17.7408 5.36853 17.8812 5.57914C18.0217 5.78976 17.9647 6.07433 17.7541 6.21474L10.2541 11.2147C10.1002 11.3174 9.8996 11.3174 9.74565 11.2147L2.24565 6.21474C2.03503 6.07433 1.97812 5.78976 2.11853 5.57914Z"
        />
      </svg>
    </MailView>
  )
}

Mail.displayName = 'Mail'
Mail.propTypes = {
  size: propTypes.string,
  color: propTypes.string,
}

export default Mail
