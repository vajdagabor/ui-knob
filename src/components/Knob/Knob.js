import React from "react"
import ProgressCircle from "components/ProgressCircle"
import "./Knob.css"

/**
 * Circular input element for setting numbers in a range
 *
 * @param {object} [props]
 * @param {number} [props.value] - The current value of the input
 * @param {number} [props.min] - The lower limit for the value
 * @param {number} [props.max] - The upper limit for the value
 */
function Knob({ value = 0, min = 0, max = 100 }) {
  return (
    <div className="Knob">
      <ProgressCircle value={value} min={min} max={max} />
    </div>
  )
}

export default Knob
