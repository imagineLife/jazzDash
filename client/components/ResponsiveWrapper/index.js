import React, { Component } from 'react'
import './wrapper.css'

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
      const { containerWidth } = this.state
      const shouldRenderChart = containerWidth !== null

      return (
        <div
          ref={(el) => { this.chartContainerViaRef = el }}
          className="Responsive-wrapper"
        >
          {shouldRenderChart && this.renderRespWrapper()}
        </div>
      )
    }
  }
)
