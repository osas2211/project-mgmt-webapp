import {
  PlusCircleFilled,
  WechatOutlined,
  CheckCircleFilled,
  LoadingOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons"
import { Col, Row, Tag, Avatar, Button, Spin } from "antd"
import React, { useEffect } from "react"
import { Link, useParams } from "react-router-dom"
import { TaskCard } from "../components/TaskCard"
import { AddTask } from "../components/AddTask"
import {
  useGetProjectQuery,
  useGetUserSessionQuery,
  useGetTasksQuery,
  useGetUserTasksQuery,
} from "../redux/services/projectify"
import { AddCollaborator } from "../components/AddCollaborator"
import { MutateProject } from "../components/MutateProject"
import { ScheduleMeeting } from "../components/ScheduleCall"
import { Client, Databases, Account, ID } from "appwrite"

const client = new Client()
client
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject(import.meta.env.VITE_PROJECT_ID)
const db = new Databases(client)

export const ProjectDetails: React.FC<{ socket: any }> = ({ socket }) => {
  const { id } = useParams()
  const { data, isLoading, error, refetch } = useGetProjectQuery({ id })
  const { data: userData } = useGetUserSessionQuery("")
  const {
    data: tasksData,
    error: err,
    refetch: refetchTask,
  } = useGetTasksQuery({ id })

  const colors = ["gold", "green", "blue"]

  useEffect(() => {
    client.subscribe(
      `databases.${import.meta.env.VITE_DATABASE_ID}.collections.${
        import.meta.env.VITE_PROJECT_COLLECTION_ID
      }.documents`,
      (response: any) => {
        // message.success("A new meeting has just been scheduled", 20)
        refetchTask()
          .unwrap()
          .then((data) => console.log(data))
      }
    )
  }, [])

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
            <div>
              <h1 className="project-title">
                {data?.project.title}{" "}
                <Link to={`/main/chats/${id}`}>
                  <Button type="dashed" icon={<WechatOutlined />}>
                    Chat
                  </Button>
                </Link>
              </h1>
              {userData?.$id === data?.project.manager ? (
                <ScheduleMeeting />
              ) : (
                <></>
              )}
            </div>

            <div>
              {userData?.$id === data?.project.manager ? (
                <div>
                  <MutateProject
                    refetch={refetch}
                    $id={id as string}
                    title={data?.project.title}
                    description={data?.project.description}
                    priority={data?.project.priority}
                    status={data?.project.status}
                  />
                </div>
              ) : (
                <></>
              )}
            </div>
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
                  <span>{new Date(data?.project.end_date).toDateString()}</span>
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
                        Contributor
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
            {/* ADDING TASKS AND COLLABORATORS IS ONLY VISIBLE TO PROJECT MANAGER */}

            {data?.project.manager === userData?.$id ? (
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <AddTask
                  projectID={data?.project.$id}
                  members={data?.members.map(
                    (member: { id: string; name: string }) => {
                      return { value: member.id, label: member.name }
                    }
                  )}
                />
                <AddCollaborator
                  refetch={refetch}
                  id={data?.project.$id}
                  socket={socket}
                />
              </div>
            ) : (
              <></>
            )}

            <Row gutter={[16, 24]} style={{ marginTop: 16 }}>
              {/* TODOs */}
              <Col xs={24} md={8}>
                <h2>
                  <Tag color="blue" icon={<UnorderedListOutlined />}>
                    To Do
                  </Tag>
                </h2>
                {tasksData?.tasks
                  .filter((task: any) => task.status === "uncompleted")
                  .reverse()
                  .map((task: any) => (
                    <TaskCard
                      {...task}
                      members={data?.members.map(
                        (member: { id: string; name: string }) => {
                          return { value: member.id, label: member.name }
                        }
                      )}
                      key={task.$id}
                      refetch={refetchTask}
                    />
                  ))}
              </Col>
              <Col xs={24} md={8}>
                <h2>
                  <Tag color="warning" icon={<LoadingOutlined />}>
                    In Progress
                  </Tag>
                </h2>
                {tasksData?.tasks
                  .filter((task: any) => task.status === "in-progress")
                  .reverse()
                  .map((task: any) => (
                    <TaskCard
                      {...task}
                      members={data?.members.map(
                        (member: { id: string; name: string }) => {
                          return { value: member.id, label: member.name }
                        }
                      )}
                      key={task.$id}
                      refetch={refetchTask}
                    />
                  ))}
              </Col>
              <Col xs={24} md={8}>
                <h2>
                  <Tag color="success" icon={<CheckCircleFilled />}>
                    Completed
                  </Tag>
                </h2>
                {tasksData?.tasks
                  .filter((task: any) => task.status === "completed")
                  .reverse()
                  .map((task: any) => (
                    <TaskCard
                      {...task}
                      members={data?.members.map(
                        (member: { id: string; name: string }) => {
                          return { value: member.id, label: member.name }
                        }
                      )}
                      key={task.$id}
                      refetch={refetchTask}
                    />
                  ))}
              </Col>
            </Row>
          </div>
        </>
      )}
    </div>
  )
}
