import React, { useEffect, useState } from "react"
import { TimerPage } from "./TimerPage"
import { ConfigureTimer } from "../components/ConfigureTimer"

export const Timer = () => {
  const [isConfigure, setIsConfigure] = useState(false)
  const [pomodoro, setPomodoro] = useState(0)
  const [pomoBreak, setPomoBreak] = useState(0)
  const updateConfigure = (bool: any) => {
    setIsConfigure(bool)
  }
  const updatePomodoro = (_pomodoro: any, _pomoBreak: any) => {
    setPomodoro(_pomodoro)
    setPomoBreak(_pomoBreak)
  }
  //UseEffect to take eye on bool change
  useEffect(() => {
    setIsConfigure(isConfigure)
  }, [isConfigure])
  return (
    <div className="page app__section">
      <TimerPage
        updateConfigure={updateConfigure}
        pomodoro={pomodoro}
        pomoBreak={pomoBreak}
      />
      {isConfigure && (
        <ConfigureTimer
          updateConfigure={updateConfigure}
          updatePomodoro={updatePomodoro}
        />
      )}
    </div>
  )
}
