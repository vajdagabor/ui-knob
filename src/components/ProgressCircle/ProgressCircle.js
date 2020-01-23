import React from "react"
import "./ProgressCircle.css"

/**
 * Presents a progress between `min` and `max` in a circle
 * @param {object} [props]
 * @param {number} [props.value] - The value to present
 * @param {number} [props.min] - The minimum value
 * @param {number} [props.max] - The maximum value
 * @param {number} [props.size] - The height and width of the SVG viewport
 * @param {number} [props.meterWidth] - The relative width of the progress meter line in the SVG
 */
function ProgressCircle({
  min = 0,
  max = 100,
  value = 0,
  meterWidth = 1,
  size = 40,
}) {
  const radius = size / 2 - meterWidth / 2
  const meterLength = radius * 2 * Math.PI
  const clampedValue = Math.min(Math.max(value, min), max)

  const dashOffset = () => meterLength - meterLength * (clampedValue / max)

  return (
    <div
      className="ProgressCircle"
      aria-valuenow={value}
      aria-valuemin={min}
      aria-valuemax={max}
    >
      <svg
        className="ProgressCircle__Progress"
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
      >
        <circle
          className="ProgressCircle__MeterBase"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#444"
          stroke-width={meterWidth}
        />
        <circle
          className="ProgressCircle__Meter"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="white"
          stroke-width={meterWidth}
          transform="rotate(90, 20, 20)"
          style={{
            strokeDasharray: meterLength,
            strokeDashoffset: dashOffset(),
          }}
        />
      </svg>
      <div className="ProgressCircle__Value">{value}</div>
    </div>
  )
}

export default ProgressCircle
