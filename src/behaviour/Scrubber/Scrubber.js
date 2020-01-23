import React from "react"
import PropTypes from "prop-types"
import { clamp, modulo, defaultTo } from "@madscip/utils"

function withScrubber(Component, { precision = 1, ...restOfDefaults }) {
  class Scrubber extends React.Component {
    static propTypes = {
      value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      min: PropTypes.number,
      max: PropTypes.number,
      precision: PropTypes.number,
      circular: PropTypes.bool,
    }

    static defaultProps = { precision, ...restOfDefaults }

    static getDerivedStateFromProps(props, state) {
      if (props.value !== state.prevPropsValue) {
        return {
          prevPropsValue: props.value,
          value: props.value,
        }
      }

      return null
    }

    defaultValue = defaultTo(this.props.value, this.props.defaultValue, "")

    state = {
      value: this.defaultValue,
      prevPropsValue: this.props.value,
      adjusting: false,
    }

    changeHandler = event => {
      const newValue = event.currentTarget.value
      if (/^[0-9.-]*$/.test(newValue)) {
        this.setState(
          { value: newValue },
          () => this.props.onChange && this.props.onChange(newValue)
        )
      }
    }

    blurHandler = () => {
      this.setValue()
    }

    mouseDownHandler = () => {
      this.setState({ adjusting: true })
      document.addEventListener("mouseup", this.mouseUpHandler, { once: true })
      document.addEventListener("mousemove", this.mouseMoveHandler)
    }

    mouseUpHandler = () => {
      document.removeEventListener("mousemove", this.mouseMoveHandler)
      this.setState({ adjusting: false })
    }

    mouseMoveHandler = event => {
      const precision = event.shiftKey ? 10 ** this.props.precision : 1
      const diff = event.movementX / precision
      this.setValue(diff)
    }

    keyDownHandler = event => {
      const UP = 38
      const DOWN = 40
      if (event.keyCode === UP || event.keyCode === DOWN) {
        const increment = event.keyCode === UP ? 1 : -1
        const precision = event.shiftKey ? 10 ** this.props.precision : 1
        const diff = increment / precision
        this.setValue(diff)
      }
    }

    /**
     * @param {number|string} value
     */
    computedValue = value => {
      if (!value) return 0
      const num = Number.parseFloat(value).toFixed(this.props.precision)
      return this.props.circular
        ? modulo(num, {
            min: this.props.min,
            max: this.props.max,
          })
        : clamp(num, {
            min: this.props.min,
            max: this.props.max,
          })
    }

    setValue = (diff = 0) => {
      this.setState(
        state => ({
          value: this.computedValue(Number.parseFloat(state.value) + diff),
        }),
        () => this.props.onChange && this.props.onChange(this.state.value)
      )
    }

    render() {
      const {
        value,
        defaultValue,
        precision,
        readOnly,
        onChange,
        onBlur,
        onMouseDown,
        ...rest
      } = this.props

      return (
        <Component
          withScrubber
          value={this.state.value}
          readOnly={this.state.adjusting}
          onChange={this.changeHandler}
          onBlur={this.blurHandler}
          onMouseDown={this.mouseDownHandler}
          onKeyDown={this.keyDownHandler}
          {...rest}
        />
      )
    }
  }

  return Scrubber
}

export default withScrubber
