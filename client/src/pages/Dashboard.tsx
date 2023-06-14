import { Link } from "react-router-dom"
import { ProjectsSummary } from "../components/ProjectsSummary"
import { TasksSummary } from "../components/TasksSummary"
import { Icon } from "@mui/material"
import { CallMadeOutlined } from "@mui/icons-material"
import { MeetingNotification } from "../components/MeetingNotification"
import {
  useGetMeetingsQuery,
  useGetProjectsQuery,
  useGetUserSessionQuery,
} from "../redux/services/projectify"

export const Dashboard = () => {
  const { data: userData } = useGetUserSessionQuery("")
  const {
    data: projectData,
    refetch,
    isLoading,
    error,
  } = useGetProjectsQuery({ jwt: userData?.jwt })
  const {
    data,
    refetch: refetchMeetings,
    isLoading: loadingMeetings,
  } = useGetMeetingsQuery(
    projectData?.projects?.map((project: any) => project.$id)
  )
  return (
    <div className="user-dashboard page">
      <div className="user-dashboard-top">
        <TasksSummary />
        <div className="pro-meet">
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
                  {data?.slice(0, 3).map((meeting) => (
                    <MeetingNotification
                      // team="Dacade Project"
                      title={meeting.title}
                      date={new Date(meeting.day).toDateString()}
                      time={new Date(meeting.time).toLocaleString("en-US", {
                        hour: "numeric",
                        minute: "numeric",
                        hour12: true,
                      })}
                      color="#1c93e1"
                      title_style={{ fontSize: "1.2rem" }}
                      key={meeting.$id}
                      id={meeting.$id}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
