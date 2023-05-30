import { CallMadeOutlined } from "@mui/icons-material"
import { Icon } from "@mui/material"
import React from "react"
import { Link } from "react-router-dom"
import { MeetingNotification } from "../components/MeetingNotification"
import { Divider } from "antd"
import { VideoCall } from "@mui/icons-material"

export const Meetings = () => {
  return (
    <div className="upcoming-meetings">
      <div>
        <h2 style={{ marginBottom: "1.5rem" }}>
          <span></span> Scheduled Meetings
        </h2>
        <div className="upcomings">
          <div>
            <div>
              <MeetingNotification
                title="Frontend Planning"
                date="14th June, 2023"
                time="8pm"
                color="#1c93e1"
                title_style={{ fontSize: "1.2rem" }}
              />
            </div>
            <Divider />
            <div>
              <MeetingNotification
                title="Backend Planning"
                date="15th June, 2023"
                time="8am"
                color="#ffc20c"
                title_style={{ fontSize: "1.2rem" }}
              />
            </div>
            <Divider />
            <div>
              <MeetingNotification
                title="Article Submission Planning"
                date="15th June, 2023"
                time="12:30pm"
                color="#FF595E"
                title_style={{ fontSize: "1.2rem" }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
