import React from 'react'
import { scaleOrdinal } from 'd3-scale'
import './bars.css'

export default function HorizontalBars(props) {

    let colorArr = [];

    const { scales, margins, data, svgDimensions } = props
    const { xScale, yScale } = scales
    const { height, width } = svgDimensions

    colorArr = ['cadetblue', 'green']

    let colorScale = scaleOrdinal()
      .range(colorArr);

      let trans = `translate(${margins.left},0)`
    
    //calculate bar border based on data above/below threshold
    const bars = (
      data.map(barData => {
        return ( 
          <rect
            key={+barData.duration}
            y={yScale(barData.duration)}

            width={xScale(+barData.count) - margins.left}
            height={yScale.bandwidth()}
            fill={colorScale(barData.count)}
            stroke={'green'}
            strokeWidth={'2px'}
            transform={trans}
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