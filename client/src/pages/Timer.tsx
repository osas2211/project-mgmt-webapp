import React, { useEffect, useState } from "react"
import { TimerPage } from "./TimerPage"
import { ConfigureTimer } from "../components/ConfigureTimer"
import { FormatQuoteTwoTone } from "@mui/icons-material"

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
      <div
        style={{
          display: "inline-flex",
          fontFamily: "cursive",
          background: "rgba(197, 209, 235, 0.3)",
          padding: "0.7rem",
          borderRadius: "8px",
          border: "1px solid rgba(197, 209, 235, 0.9)",
        }}
      >
        <FormatQuoteTwoTone />
        <div style={{ marginLeft: "0.3rem" }}>
          <p>Focus on being productive instead of busy.</p>
          <small>
            <i>~ Tim Ferriss, American podcaster, author and entrepreneur</i>
          </small>
        </div>
      </div>
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
