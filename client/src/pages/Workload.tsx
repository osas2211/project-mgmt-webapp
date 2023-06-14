import {
  CheckCircleFilled,
  LoadingOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons"
import { Button, Col, Row, Tag } from "antd"
import React, { useEffect } from "react"
import { TaskCard } from "../components/TaskCard"
import {
  useGetUserSessionQuery,
  useGetUserTasksQuery,
} from "../redux/services/projectify"
import { ThunderboltTwoTone, ClockCircleTwoTone } from "@ant-design/icons"
import { Link } from "react-router-dom"
import { Client, Databases } from "appwrite"

const client = new Client()
client
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject(import.meta.env.VITE_PROJECT_ID)
const db = new Databases(client)

export const Workload = () => {
  const { data } = useGetUserSessionQuery("")
  const {
    data: tasksData,
    error: err,
    refetch: refetchTask,
  } = useGetUserTasksQuery({ id: data?.$id })

  useEffect(() => {
    client.subscribe(
      `databases.${import.meta.env.VITE_DATABASE_ID}.collections.${
        import.meta.env.VITE_TASK_COLLECTION_ID
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
    <div className="page">
      {" "}
      <h2 style={{ marginBottom: "1rem" }}>
        {" "}
        <ThunderboltTwoTone /> Your Assigned Tasks
      </h2>
      <div>
        <Link to={"/main/timer"}>
          <Button icon={<ClockCircleTwoTone />} type="primary">
            Stay Productive
          </Button>
        </Link>
      </div>
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
                // members={data?.members.map(
                //   (member: { id: string; name: string }) => {
                //     return { value: member.id, label: member.name }
                //   }
                // )}
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
                // members={data?.members.map(
                //   (member: { id: string; name: string }) => {
                //     return { value: member.id, label: member.name }
                //   }
                // )}
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
                // members={data?.members.map(
                //   (member: { id: string; name: string }) => {
                //     return { value: member.id, label: member.name }
                //   }
                // )}
                key={task.$id}
                refetch={refetchTask}
              />
            ))}
        </Col>
      </Row>
    </div>
  )
}
