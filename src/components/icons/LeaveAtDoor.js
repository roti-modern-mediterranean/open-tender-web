import propTypes from 'prop-types'
import styled from '@emotion/styled'

const LeaveAtDoorView = styled('span')`
  display: block;
  width: ${(props) => props.size};
  line-height: 0;

  svg {
    width: 100%;
    fill: ${(props) => props.color || props.theme.colors.light};
  }
`

const LeaveAtDoor = ({ size = '3.8rem', color = null }) => {
  return (
    <LeaveAtDoorView size={size} color={color}>
      <svg viewBox="0 0 38 40">
        <path d="M34.6886 27.7621V27.666C34.6886 25.6974 33.1131 24.0938 31.1792 24.0938C29.2452 24.0938 27.6697 25.6974 27.6697 27.666V27.7621H24.3584V39.9097H37.9999V27.7621H34.6886ZM29.1886 27.666C29.1886 26.5425 30.0848 25.6302 31.1886 25.6302C32.2924 25.6302 33.1886 26.5425 33.1886 27.666V27.7621H29.1886V27.666ZM36.4905 38.3732H25.8773V29.2985H27.6792V31.1135H29.1886V29.2985H33.1886V31.1135H34.698V29.2985H36.4999V38.3732H36.4905Z" />
        <path d="M0 35.0505L20.1509 39.7464V0L0 4.38852V35.0505ZM1.50943 5.6369L18.6415 1.90137V37.8162L1.50943 33.831V5.6369Z" />
        <path d="M27.5379 23.0389V23.231H29.0474V23.0389C29.0474 19.2074 29.0379 8.36573 29.0285 4.78386V4.01562H21.7832V5.55209H27.519C27.5285 9.71974 27.5379 19.4571 27.5379 23.0389Z" />
        <path d="M14.2172 18.6211C13.5757 18.6211 13.0474 19.3509 13.0474 20.2536C13.0474 21.1563 13.5757 21.8861 14.2172 21.8861C14.8587 21.8861 15.387 21.1563 15.387 20.2536C15.387 19.3509 14.8681 18.6211 14.2172 18.6211Z" />
      </svg>
    </LeaveAtDoorView>
  )
}

LeaveAtDoor.displayName = 'LeaveAtDoor'
LeaveAtDoor.propTypes = {
  color: propTypes.string,
  size: propTypes.string,
}

export default LeaveAtDoor
