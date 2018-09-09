import React from 'react'
import { scaleOrdinal } from 'd3-scale'
import './bars.css'

export default function Bars(props) {

    let colorArr = [];

    const { scales, margins, data, svgDimensions } = props
    const { xScale, yScale } = scales
    const { height } = svgDimensions

    colorArr = ['cadetblue', 'green']

    let colorScale = scaleOrdinal()
      .range(colorArr);

    let thisWidth = ( props.barWidth || xScale.bandwidth())
    
    //calculate bar border based on data above/below threshold
    const bars = (
      data.map(barData => {
        return ( 
          <rect
            key={barData.noteName}
            x={xScale(barData.noteName)}
            y={yScale(barData.count)}
            height={height - margins.bottom - scales.yScale(barData.count)}
            width={thisWidth}
            fill={colorScale(barData.commodity)}
            stroke={'green'}
            strokeWidth={'2px'}
            // onClick={() => props.showBarDetails(barData)}
            // onMouseOver={() => props.mousedOver(barData)}
            className="singleBar"
          />
        )
      })
    )

    return (
      <g>{bars}</g>
    )
}