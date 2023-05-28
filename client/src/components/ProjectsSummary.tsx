import React from "react"
import CallMadeIcon from "@mui/icons-material/CallMade"
import { Icon } from "@mui/material"
import { Link } from "react-router-dom"
import projectImg from "../assets/project.jpg"
import projectImg3 from "../assets/bird.svg"
import projectImg2 from "../assets/user.png"
import { Progress } from "antd"

export const ProjectsSummary = () => {
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
            <h2>7</h2>
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
          <CurrentProject
            progress={75}
            projectImg={projectImg}
            title="The AI Project"
          />
          <CurrentProject
            progress={95}
            projectImg={projectImg3}
            title="Create a Blog app"
          />
          <CurrentProject
            progress={35}
            projectImg={projectImg}
            title="Appwrite Hackathon"
          />
          <CurrentProject
            progress={15}
            projectImg={projectImg3}
            title="Video Conferencing App"
          />
        </div>
      </div>
    </div>
  )
}

export const CurrentProject: React.FC<{
  projectImg: string
  progress: string | number
  title: string
}> = ({ projectImg, progress, title }) => {
  return (
    <Link
      to={"/main/project"}
      style={{ color: "inherit", textDecoration: "none" }}
    >
      <div className="current-project">
        <img src={projectImg} alt="Project overview" />
        <div className="current-project-progress">
          <h3>{title}</h3>
          <Progress
            percent={progress as number}
            strokeColor={{ "0%": "#108ee9", "100%": "#87d068" }}
            size={"small"}
          />
        </div>
        <div className="current-project-icons">
          <img src={projectImg} alt="A Contributor" />
          <img src={projectImg2} alt="A Contributor" />
          <img src={projectImg3} alt="A Contributor" />
        </div>
      </div>
    </Link>
  )
}
