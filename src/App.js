import React, { useState } from "react"
import Knob from "components/Knob"

function App() {
  const [ value_1, setValue_1 ] = useState(0)
  const [ value_2, setValue_2 ] = useState(0)
  const [ value_3, setValue_3 ] = useState(0)
  const [ value_4, setValue_4 ] = useState(0)

  return (
    <div className="App">
      <Knob value={value_1} onChange={v => setValue_1(v)} />
      <Knob value={value_2} min={0} max={200} onChange={v => setValue_2(v)} />
      <Knob value={value_3} min={0} max={360} circular onChange={v => setValue_3(v)} />
      <Knob value={value_4} min={100} max={360} circular onChange={v => setValue_4(v)} />
    </div>
  )
}

export default App
