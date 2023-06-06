import {
  PlusCircleFilled,
  WechatOutlined,
  CheckCircleFilled,
  LoadingOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons"
import { Col, Row, Tag, Avatar, Button, Spin } from "antd"
import React from "react"
import { Link, useParams } from "react-router-dom"
import { TaskCard } from "../components/TaskCard"
import { AddTask } from "../components/AddTask"
import {
  useGetProjectQuery,
  useGetUserSessionQuery,
} from "../redux/services/projectify"
import { AddCollaborator } from "../components/AddCollaborator"

export const ProjectDetails = () => {
  const { id } = useParams()
  const { data, isLoading, error, refetch } = useGetProjectQuery({ id })
  const { data: userData } = useGetUserSessionQuery("")
  console.log(data)
  const colors = ["gold", "green", "blue"]
  return (
    <div className="project page">
      {isLoading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "Center",
            width: "100%",
            height: "20rem",
          }}
        >
          <Spin size="large" />
        </div>
      ) : (
        <>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <h1 className="project-title">{data?.project.title}</h1>
            <Link to={"/main/chats"}>
              <Button type="dashed" icon={<WechatOutlined />}>
                Chat
              </Button>
            </Link>
          </div>
          <div className="project-meta-data">
            <div className="priority">
              <Row align={"middle"}>
                <Col xs={5} md={2}>
                  <p>Priority</p>
                </Col>
                <Col xs={5} md={2}>
                  <Tag
                    color={
                      data?.project.priority === "low"
                        ? "success"
                        : data?.project.priority === "mid"
                        ? "warning"
                        : "magenta"
                    }
                  >
                    <span>{data?.project.priority}</span>
                  </Tag>
                </Col>
              </Row>
            </div>
            <div className="due-date">
              <Row align={"middle"}>
                <Col xs={5} md={2}>
                  <p>End Date</p>
                </Col>
                <Col xs={16} md={12}>
                  <span>{data?.project.end_date}</span>
                </Col>
              </Row>
            </div>
            <div className="tags">
              <Row align={"middle"}>
                <Col xs={5} md={2}>
                  <p>Tags</p>
                </Col>
                <Col xs={16} md={16}>
                  {data?.project.tags.slice(0, 3).map((tag: any, key: any) => (
                    <Tag color={colors[key]} key={key}>
                      <span>{tag}</span>
                    </Tag>
                  ))}
                </Col>
              </Row>
            </div>

            <div className="assignees">
              <Row align={"middle"}>
                <Col xs={5} md={2}>
                  <p>Members</p>
                </Col>
                <Col xs={16} md={16}>
                  <Avatar.Group
                    maxCount={3}
                    maxPopoverTrigger="click"
                    maxStyle={{ cursor: "pointer" }}
                  >
                    {/* MEMEBRS URL */}
                    {data?.members_img.map((member: any, key: any) => (
                      <Avatar key={key} src={member}>
                        Hello
                      </Avatar>
                    ))}
                  </Avatar.Group>
                </Col>
              </Row>
            </div>
            <div className="description">
              <Row align={"top"}>
                <Col xs={5} md={2}>
                  <p>Description</p>
                </Col>
                <Col xs={16} md={8}>
                  <div>{data?.project.description}</div>
                </Col>
              </Row>
            </div>
            {/* {File Attachments} */}
          </div>

          <div className="project-tasks">
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <AddTask />
              {/* ADDING COLLABORATORS IS ONLY VISIBLE TO PROJECT MANAGER */}
              {data?.project.manager === userData?.$id ? (
                <AddCollaborator refetch={refetch} id={data?.project.$id} />
              ) : (
                <></>
              )}
            </div>

            <Row gutter={[16, 24]}>
              <Col xs={24} md={8}>
                <h2>
                  <Tag color="blue" icon={<UnorderedListOutlined />}>
                    To Do
                  </Tag>
                </h2>
                <TaskCard />
                <TaskCard />
                <TaskCard />
              </Col>
              <Col xs={24} md={8}>
                <h2>
                  <Tag color="warning" icon={<LoadingOutlined />}>
                    In Progress
                  </Tag>
                </h2>
                <TaskCard />
                <TaskCard />
              </Col>
              <Col xs={24} md={8}>
                <h2>
                  <Tag color="success" icon={<CheckCircleFilled />}>
                    Completed
                  </Tag>
                </h2>
                <TaskCard />
                <TaskCard />
              </Col>
            </Row>
          </div>
        </>
      )}
    </div>
  )
}
