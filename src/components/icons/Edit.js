import propTypes from 'prop-types'
import styled from '@emotion/styled'

const EditView = styled('span')`
  display: block;
  width: ${(props) => props.size};
  line-height: 0;

  svg {
    width: 100%;
    fill: ${(props) => props.color || props.theme.colors.primary};
  }
`

const Edit = ({ size = '1.6rem', color = null }) => {
  return (
    <EditView size={size} color={color}>
      <svg viewBox="0 0 16 16">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M0.766563 4.10677C1.16508 3.70826 1.70558 3.48438 2.26917 3.48438H4.76917C5.0223 3.48438 5.2275 3.68958 5.2275 3.94271C5.2275 4.19584 5.0223 4.40104 4.76917 4.40104H2.26917C1.9487 4.40104 1.64135 4.52835 1.41474 4.75495C1.18814 4.98156 1.06083 5.28891 1.06083 5.60938V13.1094C1.06083 13.4298 1.18814 13.7372 1.41474 13.9638C1.64135 14.1904 1.9487 14.3177 2.26917 14.3177H9.76917C10.0896 14.3177 10.397 14.1904 10.6236 13.9638C10.8502 13.7372 10.9775 13.4298 10.9775 13.1094V10.6094C10.9775 10.3562 11.1827 10.151 11.4358 10.151C11.689 10.151 11.8942 10.3562 11.8942 10.6094V13.1094C11.8942 13.673 11.6703 14.2135 11.2718 14.612C10.8733 15.0105 10.3328 15.2344 9.76917 15.2344H2.26917C1.70558 15.2344 1.16508 15.0105 0.766563 14.612C0.368048 14.2135 0.144165 13.673 0.144165 13.1094V5.60938C0.144165 5.04579 0.368048 4.50529 0.766563 4.10677Z"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M11.5287 0.702791C11.9462 0.285316 12.5124 0.0507812 13.1028 0.0507812C13.6932 0.0507812 14.2594 0.285316 14.6769 0.702791C15.0944 1.12027 15.3289 1.68648 15.3289 2.27688C15.3289 2.86728 15.0944 3.4335 14.6769 3.85097L7.59358 10.9343C7.50763 11.0203 7.39105 11.0685 7.26949 11.0685H4.76949C4.51636 11.0685 4.31116 10.8633 4.31116 10.6102V8.11021C4.31116 7.98866 4.35945 7.87208 4.4454 7.78612L11.5287 0.702791ZM13.1028 0.967448C12.7555 0.967448 12.4225 1.10541 12.1769 1.35097L5.22782 8.30006V10.1519H7.07964L14.0287 3.20279C14.2743 2.95722 14.4123 2.62416 14.4123 2.27688C14.4123 1.9296 14.2743 1.59654 14.0287 1.35097C13.7832 1.10541 13.4501 0.967448 13.1028 0.967448Z"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M10.2784 1.9526C10.4574 1.77361 10.7476 1.77361 10.9266 1.9526L13.4266 4.4526C13.6056 4.63159 13.6056 4.92179 13.4266 5.10078C13.2476 5.27977 12.9574 5.27977 12.7784 5.10078L10.2784 2.60078C10.0994 2.42179 10.0994 2.13159 10.2784 1.9526Z"
        />
      </svg>
    </EditView>
  )
}

Edit.displayName = 'Edit'
Edit.propTypes = {
  size: propTypes.string,
  color: propTypes.string,
}

export default Edit
