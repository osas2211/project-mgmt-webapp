import { Col, Row, Tag } from "antd"
import React from "react"
import { useParams } from "react-router-dom"

export const ProjectDetails = () => {
  const { id } = useParams()
  const data = {
    title: "The Avonova Project",
    priority: "high",
    due_date: "14th June 2023",
    tags: ["web", "UI Design", "UX Research"],
    assignees: [],
  }
  return (
    <div className="project page">
      <h1 className="project-title">{data["title"]}</h1>
      <div className="project-meta-data">
        <div className="priority">
          <Row>
            <Col span={4}>
              <p>Priority</p>
            </Col>
            <Col span={4}>
              <Tag color="magenta">
                <p>{data.priority}</p>
              </Tag>
            </Col>
          </Row>
        </div>
        <div className="due-date"></div>
        <div className="tags"></div>
        <div className="assignees"></div>
      </div>
    </div>
  )
}
