import React from "react"
import CallMadeIcon from "@mui/icons-material/CallMade"
import { Icon } from "@mui/material"
import { Link } from "react-router-dom"
import { Avatar, Progress, Skeleton } from "antd"
import {
  useGetProjectQuery,
  useGetProjectsQuery,
  useGetTasksQuery,
  useGetUserSessionQuery,
} from "../redux/services/projectify"

export const ProjectsSummary = () => {
  const { data: userData } = useGetUserSessionQuery("")
  const { data } = useGetProjectsQuery({ jwt: userData?.jwt })
  const todo = data?.projects.filter(
    (project: any) =>
      project.status === "uncompleted" || project.status === "in_progress"
  )

  return (
    <div className="user-projects">
      <h3>
        <span></span> Projects Progress
      </h3>
      <div className="user-projects-summary">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div>
            <h4>Active Projects</h4>
            <h2>{todo?.length}</h2>
          </div>
          <Link
            to="/main/projects"
            style={{
              height: "2.5rem",
              width: "2.5rem",
              borderRadius: "50%",
              background: "#1c93e1",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#fff",
            }}
          >
            <Icon component={CallMadeIcon} />
          </Link>
        </div>

        <div className="current-projects">
          {data?.projects
            .filter((project: any) => project.status !== "completed")
            .map((project: any) => (
              <CurrentProject projectID={project.$id} key={project.$id} />
            ))}
        </div>
      </div>
    </div>
  )
}

export const CurrentProject: React.FC<{ projectID: string }> = ({
  projectID,
}) => {
  const { data: tasksData } = useGetTasksQuery({ id: projectID })
  const { data: projectData, isLoading } = useGetProjectQuery({ id: projectID })
  const todo = tasksData?.tasks.filter(
    (task: any) => task.status === "uncompleted"
  )
  const inProgress = tasksData?.tasks.filter(
    (task: any) => task.status === "in-progress"
  )
  const completed = tasksData?.tasks.filter(
    (task: any) => task.status === "completed"
  )
  const total = todo?.length + inProgress?.length + completed?.length

  return isLoading ? (
    <Skeleton active />
  ) : (
    <Link
      to={`/main/project/${projectID}`}
      style={{ color: "inherit", textDecoration: "none" }}
    >
      <div className="current-project">
        <img src={projectData?.project.project_cover} alt="Project overview" />
        <div className="current-project-progress">
          <h3>{projectData?.project.title}</h3>
          <Progress
            percent={
              tasksData?.tasks?.length === 0
                ? 0
                : (Math.floor((completed?.length / total) * 100) as number)
            }
            strokeColor={{ "10%": "#1c93e1", "100%": "#87d068" }}
            size={"small"}
          />
        </div>
        <div className="current-project-icons">
          <Avatar.Group
            maxCount={2}
            maxPopoverTrigger="hover"
            maxStyle={{ cursor: "pointer" }}
          >
            {projectData?.members_img.map((url: string, key: number) => (
              <Avatar key={key} src={url}>
                A Contributor
              </Avatar>
            ))}
          </Avatar.Group>
        </div>
      </div>
    </Link>
  )
}
