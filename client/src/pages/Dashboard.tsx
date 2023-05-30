import { Link } from "react-router-dom"
import { ProjectsSummary } from "../components/ProjectsSummary"
import { TasksSummary } from "../components/TasksSummary"
import { Icon } from "@mui/material"
import { CallMadeOutlined } from "@mui/icons-material"
import { MeetingNotification } from "../components/MeetingNotification"

export const Dashboard = () => {
  return (
    <div className="user-dashboard page">
      <div className="user-dashboard-top">
        <TasksSummary />
        <div style={{ width: "50%" }}>
          <ProjectsSummary />
          <div className="upcoming-meetings">
            <div>
              <h3>
                <span></span> Upcoming Meetings
              </h3>
              <div className="upcomings">
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <h3>Realtime Video Calls</h3>
                  <Link
                    to="/main/projects"
                    style={{
                      height: "2.5rem",
                      width: "2.5rem",
                      borderRadius: "50%",
                      background: "#9BC53D",
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#fff",
                    }}
                  >
                    <Icon component={CallMadeOutlined} />
                  </Link>
                </div>
                <div>
                  <MeetingNotification
                    title="Frontend Planning"
                    date="14th June, 2023"
                    time="8pm"
                    color="#1c93e1"
                  />
                  <MeetingNotification
                    title="Backend Planning"
                    date="15th June, 2023"
                    time="8am"
                    color="#ffc20c"
                  />
                  <MeetingNotification
                    title="Article Submission Planning"
                    date="15th June, 2023"
                    time="12:30pm"
                    color="#FF595E"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
