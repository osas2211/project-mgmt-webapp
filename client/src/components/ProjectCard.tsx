import { Avatar, Card } from "antd"
import React from "react"
import { LinkOutlined, LoadingOutlined } from "@ant-design/icons"
import projectImg2 from "../assets/user.png"
import user from "../assets/user.jpg"
import { Link } from "react-router-dom"
import { useGetProjectQuery } from "../redux/services/projectify"

export const ProjectCard: React.FC<{
  project_cover: string | undefined
  tags: string[]
  title: string
  description: string
  files_links: string[]
  $id: string
}> = ({ project_cover, tags, title, description, files_links, $id }) => {
  const { Meta } = Card
  const { data, isLoading } = useGetProjectQuery({ id: $id })
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
                style={{
                  color: "#1c93e1",
                  backgroundColor: "#1c92e11b",
                  padding: "0.3rem",
                  borderRadius: 5,
                }}
              />{" "}
              {/* <small>{files_links.length}</small> */}
              <small>0</small>
            </div>
            <Avatar.Group
              maxCount={3}
              maxPopoverTrigger="click"
              maxStyle={{ cursor: "pointer" }}
            >
              {isLoading ? (
                <LoadingOutlined />
              ) : (
                <>
                  {data?.members_img.map((img: string, key: number) => (
                    <Avatar key={key} src={img}>
                      A Contributor
                    </Avatar>
                  ))}
                </>
              )}
            </Avatar.Group>
          </div>
        </Card>
      </div>
    </Link>
  )
}
