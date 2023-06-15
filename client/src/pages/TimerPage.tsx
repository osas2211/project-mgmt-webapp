import React from "react"

import { Timer } from "../components/Timer"
export const TimerPage = (props: any) => {
  const { updateConfigure, pomodoro, pomoBreak } = props

  return (
    <div className="main__page">
      <Timer
        updateConfigure={updateConfigure}
        pomodoro={pomodoro}
        pomoBreak={pomoBreak}
      />
    </div>
  )
}
