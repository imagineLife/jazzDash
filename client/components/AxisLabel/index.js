import React from 'react'
import './index.css'

export default function AxisLabel(props){
  return (
    <g
      className={props.groupClass}
    >
      <text
        x={props.xPos}
        y={props.yPos}
        transform={props.transformation}
        textAnchor='middle'
        fill={'black'}
        fontSize={props.fontSize}
        className={props.labelClass}
      >{props.textVal}</text>
    </g>
  )
}
