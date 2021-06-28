import React from 'react'

export type FCNoChildren<Props> = (props:Props) => JSX.Element

export interface IconProps {size?: string, color?: string | null}
