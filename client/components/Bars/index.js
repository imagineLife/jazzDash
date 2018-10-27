import React from 'react'
import { scaleOrdinal } from 'd3-scale'
import Rect from '../Rect'
import './bars.css'

export default function Bars(props) {
    let bars;
    let colorArr = [];

    const { scales, margins, data, svgDimensions } = props
    const { xScale, yScale } = scales
    const { height } = svgDimensions

    colorArr = ['cadetblue', 'green']

    let colorScale = scaleOrdinal()
      .range(colorArr);

    let thisWidth = ( props.barWidth || xScale.bandwidth())
    

    bars = (
      data.map(d => {

        console.log('map bars d')
        console.log(d)
//Count-Per-Note-Name
        if(d.noteName){
            return ( 
              <Rect
                key={d.noteName}
                x={xScale(d.noteName)}
                y={yScale(d.count)}
                height={height - margins.bottom - scales.yScale(d.count)}
                width={thisWidth}
                fill={colorScale(d.commodity)}
                stroke={'green'}
                strokeWidth={'2px'}
                // onClick={() => props.showBarDetails(d)}
                // onMouseOver={() => props.mousedOver(d)}
                className="singleBar"
              />
            )
        }
      })
    )

    return (
        <React.Fragment>
            {bars}
        </React.Fragment>
    )
}