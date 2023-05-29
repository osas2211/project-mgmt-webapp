import { Card } from "antd"
import React from "react"
import { LinkOutlined } from "@ant-design/icons"
import projectImg2 from "../assets/user.png"
import user from "../assets/user.jpg"

export const ProjectCard: React.FC<{
  img: string | undefined
  tags: string[]
  title: string
  description: string
  links: string[]
}> = ({ img, tags, title, description, links }) => {
  const { Meta } = Card
  return (
    <div>
      <Card
        hoverable
        className="project-card"
        style={{ width: "100%" }}
        bodyStyle={{ padding: "1rem" }}
      >
        <div>
          {img && (
            <img
              alt="example"
              src={img}
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
          {tags.map((tag, key) => (
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
            <small>{links.length}</small>
          </div>
          <div className="current-project-icons">
            <img src={projectImg2} alt="A Contributor" />
            <img src={user} alt="A Contributor" />
            <img src={projectImg2} alt="A Contributor" />
          </div>
        </div>
      </Card>
    </div>
  )
}
