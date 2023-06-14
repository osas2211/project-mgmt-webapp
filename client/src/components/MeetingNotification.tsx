import React from "react"
import { VideoCameraFilled } from "@ant-design/icons"
import TodayRoundedIcon from "@mui/icons-material/TodayRounded"
import { Link } from "react-router-dom"
import { Icon } from "@mui/material"
import { Button } from "antd"

export const MeetingNotification: React.FC<{
  // team: string
  title: string
  date: string
  time: string
  color: string | undefined
  title_style?: React.CSSProperties
  id: string
}> = ({ title, date, time, color, title_style, id }) => {
  return (
    <div style={{ display: "flex", marginBottom: "1rem", width: "100%" }}>
      <Icon
        component={TodayRoundedIcon}
        style={{ color, fontSize: "2rem", marginRight: "1rem" }}
      />
      <div>
        {/* <h2>{team}</h2> */}
        <h4 style={{ ...title_style }}>{title}</h4>
        <p>
          <small>
            {date} - {time}
          </small>
        </p>
        <Link to={`/main/meet?room=${id}`}>
          <Button type="primary" style={{ marginTop: "0.8rem" }}>
            <VideoCameraFilled />
            Attend Meeting
          </Button>
        </Link>
      </div>
      {/* <VideoCameraFilled style={{ justifySelf: "flex-end" }} /> */}
    </div>
  )
}
