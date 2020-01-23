import React from "react"
import ProgressCircle from "components/ProgressCircle"
import "./Knob.css"
import withScrubber from "behaviour/Scrubber"

/**
 * Circular input element for setting numbers in a range
 *
 * @param {object} [props]
 * @param {number} [props.value] - The current value of the input
 * @param {number} [props.min] - The lower limit for the value
 * @param {number} [props.max] - The upper limit for the value
 * @param {boolean} [props.withScrubber] - If scrubber input behaivour is applied
 * @param {function} [props.onChange]
 * @param {any} [props.rest]
 */
function Knob({
  value = 0,
  min = 0,
  max = 100,
  withScrubber = false,
  ...rest
}) {
  return (
    <div className="Knob" tabIndex={0} {...rest}>
      <ProgressCircle value={value} min={min} max={max} />
    </div>
  )
}

export default withScrubber(Knob, { min: 0, max: 100 })
