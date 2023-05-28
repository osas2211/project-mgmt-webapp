import React from "react"
import { VideoCameraFilled } from "@ant-design/icons"
import TodayRoundedIcon from "@mui/icons-material/TodayRounded"
import { Link } from "react-router-dom"
import { Icon } from "@mui/material"

export const MeetingNotification: React.FC<{
  title: string
  date: string
  time: string
  color: string | undefined
}> = ({ title, date, time, color }) => {
  return (
    <div style={{ display: "flex", marginBottom: "1rem", width: "100%" }}>
      <Icon
        component={TodayRoundedIcon}
        style={{ color, fontSize: "2rem", marginRight: "1rem" }}
      />
      <div>
        <h4>{title}</h4>
        <p>
          <small>
            {date} - {time}
          </small>
        </p>
      </div>
      {/* <VideoCameraFilled style={{ justifySelf: "flex-end" }} /> */}
    </div>
  )
}
