import React, { useState } from "react"

export const ConfigureTimer = (props: any) => {
  // Destructuring
  const { updateConfigure, updatePomodoro } = props
  const [pomodoro, setPomodoro] = useState("")
  const [pomoBreak, setPomoBreak] = useState("")
  // onSubmitFunction Function
  const onSubmitForm = (e: any) => {
    e.preventDefault()
    if (pomodoro === "" || pomoBreak === "") return
    updateConfigure(false)
    updatePomodoro(pomodoro, pomoBreak)
  }
  const changeConfigure = () => {
    updateConfigure(false)
  }
  return (
    <div className="configure__section">
      <div className="configure__section--box">
        <div className="configure__section--box-upper">
          <h2>Configure 😊</h2>
          <p onClick={changeConfigure}>
            <svg
              fill="#eeeeff"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 50 50"
              width="40px"
              height="40px"
            >
              <path d="M 14.40625 13 L 13 14.40625 L 23.625 25 L 13 35.59375 L 14.40625 37 L 25.0625 26.40625 L 35.6875 37 L 37.09375 35.59375 L 26.46875 25 L 37.09375 14.40625 L 35.6875 13 L 25.0625 23.59375 Z" />
            </svg>
          </p>
        </div>
        <div className="filler-line"></div>
        <form className="configure__section--form" onSubmit={onSubmitForm}>
          <div>
            <label>Focus/Session Time (In Minutes)</label>
            <input
              type="number"
              placeholder="Eg.25"
              onChange={(e) => {
                setPomodoro(e.target.value)
              }}
              value={pomodoro}
              required
              maxLength={2}
              minLength={0}
              max="59"
              min="0"
              step="1"
            />
          </div>
          <div>
            <label>Break Time (In Minutes)</label>
            <input
              type="number"
              placeholder="Eg.5"
              onChange={(e) => {
                setPomoBreak(e.target.value)
              }}
              value={pomoBreak}
              required
              maxLength={2}
              minLength={0}
              max="59"
              min="0"
              step="1"
            />
          </div>
          {/* <div>
            <label>Lofi</label>
            <select>
              <option value="chill-lofi">Chill Lofi</option>
              <option value="chill-lofi">Relax Lofi</option>
              <option value="chill-lofi">Concentrate Lofi</option>
            </select>
          </div> */}
          <div className="configure__section--form-btn">
            <button className="submit-btn">Apply</button>
          </div>
        </form>
      </div>
    </div>
  )
}
