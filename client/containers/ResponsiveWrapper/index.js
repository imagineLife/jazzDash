import React, { Component } from 'react'
import './wrapper.css'
import '../../cssGrid.css'

export default RespWrapper => (
  class ResponsiveChart extends Component {
    constructor(props) {
      super(props)

      this.state = {
        containerWidth: null,
      }

      this.fitParentContainer = this.fitParentContainer.bind(this)
    }

    componentDidMount() {
      this.fitParentContainer()
      window.addEventListener('resize', this.fitParentContainer)
    }

    componentWillUnmount() {
      window.removeEventListener('resize', this.fitParentContainer)
    }

    fitParentContainer() {

      const { containerWidth } = this.state
      const ResponsiveWrapperDiv = this.chartContainerViaRef;
      const ResponsiveWrapperDivWidth = ResponsiveWrapperDiv.getBoundingClientRect().width;
      const shouldResize = containerWidth !== ResponsiveWrapperDivWidth

      if (shouldResize) {
        this.setState({
          containerWidth: ResponsiveWrapperDivWidth,
        })
      }
    }

    renderRespWrapper() {
      const parentDivWidth = this.state.containerWidth;

      return (
        <RespWrapper {...this.props} respWrapWidth={parentDivWidth} />
      )
    }

    render() {
      // console.log('resp wrapper props')
      // console.log(this.props)
      const { containerWidth } = this.state
      const shouldRenderChart = containerWidth !== null
      const thisClass = `Responsive-wrapper gr-${this.props.parentCol}`

      return (
        <div
          ref={(el) => { this.chartContainerViaRef = el }}
          className={thisClass}
        >
          {shouldRenderChart && this.renderRespWrapper()}
        </div>
      )
    }
  }
)
