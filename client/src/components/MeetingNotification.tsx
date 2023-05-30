import React from "react"
import { VideoCameraFilled } from "@ant-design/icons"
import TodayRoundedIcon from "@mui/icons-material/TodayRounded"
import { Link } from "react-router-dom"
import { Icon } from "@mui/material"
import { Button } from "antd"

export const MeetingNotification: React.FC<{
  title: string
  date: string
  time: string
  color: string | undefined
  title_style?: React.CSSProperties
}> = ({ title, date, time, color, title_style }) => {
  return (
    <div style={{ display: "flex", marginBottom: "1rem", width: "100%" }}>
      <Icon
        component={TodayRoundedIcon}
        style={{ color, fontSize: "2rem", marginRight: "1rem" }}
      />
      <div>
        <h4 style={{ ...title_style }}>{title}</h4>
        <p>
          <small>
            {date} - {time}
          </small>
        </p>
        <Button type="primary" style={{ marginTop: "0.8rem" }}>
          <VideoCameraFilled />
          Attend Meeting
        </Button>
      </div>
      {/* <VideoCameraFilled style={{ justifySelf: "flex-end" }} /> */}
    </div>
  )
}
