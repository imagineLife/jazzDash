import React from 'react'

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
        fill={'#EEEEEE'}
      >{props.textVal}</text>
    </g>
  )
}
