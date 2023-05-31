import {
  PlusCircleFilled,
  WechatOutlined,
  CheckCircleFilled,
  LoadingOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons"
import { Col, Row, Tag, Avatar, Button } from "antd"
import React from "react"
import { Link, useParams } from "react-router-dom"
import { TaskCard } from "../components/TaskCard"
import { type } from "os"

export const ProjectDetails = () => {
  const { id } = useParams()
  const data = {
    title: "The Avonova Project",
    priority: "high",
    due_date: "14th June 2023",
    tags: ["web", "UI Design", "UX Research"],
    assignees: [
      "https://xsgames.co/randomusers/avatar.php?g=pixel&key=2",
      "https://xsgames.co/randomusers/avatar.php?g=pixel&key=3",
      "https://xsgames.co/randomusers/avatar.php?g=pixel&key=4",
      "https://xsgames.co/randomusers/avatar.php?g=pixel&key=5",
      "https://xsgames.co/randomusers/avatar.php?g=pixel&key=6",
      "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
    ],
  }
  const colors = ["gold", "green", "blue"]
  return (
    <div className="project page">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h1 className="project-title">{data["title"]}</h1>
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
              <Tag color="magenta">
                <span>{data.priority}</span>
              </Tag>
            </Col>
          </Row>
        </div>
        <div className="due-date">
          <Row align={"middle"}>
            <Col xs={5} md={2}>
              <p>Due Date</p>
            </Col>
            <Col xs={16} md={12}>
              <span>{data.due_date}</span>
            </Col>
          </Row>
        </div>
        <div className="tags">
          <Row align={"middle"}>
            <Col xs={5} md={2}>
              <p>Tags</p>
            </Col>
            <Col xs={16} md={16}>
              {data.tags.slice(0, 3).map((tag, key) => (
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
                {data.assignees.map((member, key) => (
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
              <div>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Repudiandae eaque non libero rem eum unde reprehenderit sequi
                aspernatur iste nesciunt labore illo quos ut, laudantium
                consequuntur? Sapiente totam velit fugiat.
              </div>
            </Col>
          </Row>
        </div>
        {/* {File Attachments} */}
      </div>

      <div className="project-tasks">
        <Button
          icon={<PlusCircleFilled />}
          type={"primary"}
          style={{ margin: "1rem 0" }}
        >
          Add Task
        </Button>
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
    </div>
  )
}
