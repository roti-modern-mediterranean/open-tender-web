import { useCallback, useState } from "react"
import { useEffect } from "react/cjs/react.development"

export const TouchDirection = {
	up: 'up',
	right: 'right',
  down: 'down',
  left: 'left',
  unknown: 'unknown'
}

export const TouchEvents = {
	start: 'start',
	move: 'move',
  end: 'end',
  unknown: 'unknown'
}

export const useTouchableObject = (onTouch, element) => {
  const { current } = element
  const [eventName, setEventName] = useState(TouchEvents.unknown)
  const [touchState, setTouchState] = useState({
    position: {
      top: 0,
      left: 0
    },
    dragging: false,
    touchObject: {
      startX: null,
      startY: null,
      curX: null,
      curY: null
    }
  })

  const createTouchState = useCallback((dragging, startX, startY, 
    currentX, currentY, elementPosition) => {
    return {
      position: {
        left: (elementPosition)?elementPosition.left:touchState.position.left,
        top: (elementPosition)?elementPosition.top:touchState.position.left,
      },
      dragging,
      touchObject: {
        startX: (startX)?startX:touchState.touchObject.startX,
        startY: (startY)?startY:touchState.touchObject.startY,
        curX: (currentX)?currentX:touchState.touchObject.currentX,
        curY: (currentY)?currentY:touchState.touchObject.currentY
      }
    }
  }, [touchState])

  const getDirection = useCallback((verticalSwiping = false) => {
    const { touchObject } = touchState
    let xDist, yDist, r, swipeAngle
    xDist = touchObject.startX - touchObject.curX
    yDist = touchObject.startY - touchObject.curY
    r = Math.atan2(yDist, xDist)
    swipeAngle = Math.round((r * 180) / Math.PI)
    if (swipeAngle < 0) {
      swipeAngle = 360 - Math.abs(swipeAngle)
    }
    if (
      (swipeAngle <= 45 && swipeAngle >= 0) ||
      (swipeAngle <= 360 && swipeAngle >= 315)
    ) {
      return TouchDirection.left
    }
    if (swipeAngle >= 135 && swipeAngle <= 225) {
      return TouchDirection.right
    }
    if (verticalSwiping === true) {
      if (swipeAngle >= 35 && swipeAngle <= 135) {
        return TouchDirection.up
      } else {
        return TouchDirection.down
      }
    }
    return TouchDirection.unknown
  }, [touchState])

  useEffect(() => {
    if (eventName !== TouchEvents.end && eventName !== TouchEvents.unknown) {
      onTouch(getDirection(true), 
      (touchState.touchObject.startX - touchState.touchObject.curX),
      (touchState.touchObject.startY - touchState.touchObject.curY), touchState.position, eventName)
    } else if (eventName === TouchEvents.end) {
      onTouch(null, null, null, null, eventName);
    }
  }, [touchState, getDirection, onTouch, eventName])

  return {
    onTouchStart: event => {
      setEventName(TouchEvents.start)
      let elementPosition = {
        left: 0,
        top: 0
      }
      if (current) {
        const objectRect = current.getBoundingClientRect()
        elementPosition.left = objectRect.left
        elementPosition.top = objectRect.top
      }
      setTouchState(createTouchState(false, 
        (event.touches ? event.touches[0].pageX : event.clientX),
        (event.touches ? event.touches[0].pageY : event.clientY), null, null, elementPosition))
    },
    onTouchMove: event => {
      setEventName(TouchEvents.move)
      setTouchState(createTouchState(true, null, null,
        (event.touches ? event.touches[0].pageX : event.clientX),
        (event.touches ? event.touches[0].pageY : event.clientY)))
    },
    onTouchEnd: event => {
      setEventName(TouchEvents.end)
    }
  }
}