import { Icon } from "@mui/material"
import React from "react"
import { Link } from "react-router-dom"
import { MeetingNotification } from "../components/MeetingNotification"
import { Divider } from "antd"
import { VideoCameraFilled } from "@ant-design/icons"

export const Meetings = () => {
  return (
    <div className="upcoming-meetings">
      <div>
        <h2 style={{ marginBottom: "1.5rem" }}>
          <span></span> Scheduled Meetings
        </h2>
        <div className="upcomings">
          <div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <MeetingNotification
                title="Frontend Planning"
                date="14th June, 2023"
                time="8pm"
                color="#1c93e1"
                title_style={{ fontSize: "1.2rem" }}
              />
              <Link to={"/main/meetings"}>
                <VideoCameraFilled style={{ fontSize: 28, color: "#1c93e1" }} />
              </Link>
            </div>
            <Divider />
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <MeetingNotification
                title="Backend Planning"
                date="15th June, 2023"
                time="8am"
                color="#ffc20c"
                title_style={{ fontSize: "1.2rem" }}
              />
              <Link to={"/main/meetings"}>
                <VideoCameraFilled style={{ fontSize: 28, color: "#1c93e1" }} />
              </Link>
            </div>
            <Divider />
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <MeetingNotification
                title="Article Submission Planning"
                date="15th June, 2023"
                time="12:30pm"
                color="#FF595E"
                title_style={{ fontSize: "1.2rem" }}
              />
              <Link to={"/main/meetings"}>
                <VideoCameraFilled style={{ fontSize: 28, color: "#1c93e1" }} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
