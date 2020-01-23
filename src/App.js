import React from "react"
import ProgressCircle from "components/ProgressCircle"

function App() {
  return (
    <div className="App">
      <ProgressCircle value={25} max={100} />
    </div>
  )
}

export default App
