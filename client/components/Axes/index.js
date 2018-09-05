import React from 'react'
import Axis from '../Axis'

export default ({ scales, margins, svgDimensions }) => {
  const { height, width } = svgDimensions
  console.log('svgDims')
  console.log(height, width)

  const xProps = {
    orient: 'Bottom',
    scale: scales.xScale,
    translate: `translate(0, ${height - margins.bottom})`,
    tickSize: height - margins.top - margins.bottom,
  }

  const yProps = {
    orient: 'Left',
    scale: scales.yScale,
    translate: `translate(${margins.left}, 0)`,
    tickSize: width - margins.left - margins.right,
  }

  return (
    <g className="axes">
      <Axis {...xProps} />
      <Axis {...yProps} />
    </g>
  )
}
