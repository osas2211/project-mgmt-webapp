import { Card } from "antd"
import React from "react"
import { LinkOutlined } from "@ant-design/icons"
import projectImg2 from "../assets/user.png"
import user from "../assets/user.jpg"
import { Link } from "react-router-dom"

export const ProjectCard: React.FC<{
  project_cover: string | undefined
  tags: string[]
  title: string
  description: string
  files_links: string[]
  $id: string
}> = ({ project_cover, tags, title, description, files_links, $id }) => {
  const { Meta } = Card
  return (
    <Link to={`/main/project/${$id}`}>
      <div>
        <Card
          hoverable
          className="project-card"
          style={{ width: "100%" }}
          bodyStyle={{ padding: "1rem" }}
        >
          <div>
            {project_cover && (
              <img
                alt="example"
                src={project_cover}
                style={{
                  height: "12rem",
                  width: "100%",
                  borderTopLeftRadius: "5px",
                  borderTopRightRadius: "5px",
                  marginBottom: ".5rem",
                }}
              />
            )}
          </div>
          <h2>{title}</h2>
          <p className="project-card-desc">{description}</p>
          <div className="tags">
            {tags.slice(0, 2).map((tag, key) => (
              <span key={key}>{tag}</span>
            ))}
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
            }}
          >
            <div>
              <LinkOutlined
                style={{ color: "#1c93e1", backgroundColor: "#1c92e11b" }}
              />{" "}
              <small>{files_links.length}</small>
            </div>
            <div className="current-project-icons">
              <img src={projectImg2} alt="A Contributor" />
              <img src={user} alt="A Contributor" />
              <img src={projectImg2} alt="A Contributor" />
            </div>
          </div>
        </Card>
      </div>
    </Link>
  )
}
