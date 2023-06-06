import { Avatar, Card, Tag } from "antd"
import React from "react"

export const TaskCard: React.FC<{
  title: string
  description: string
  due_date: string
  assigned_to: string
}> = ({ title, description, due_date, assigned_to }) => {
  return (
    <div className="task-card">
      <Card hoverable draggable>
        <h3>{title}</h3>
        <div className="task-card-description">
          <p>{description}</p>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: "1rem",
          }}
        >
          <p>Due: {due_date}</p>
          <div>
            <p>
              Assigned to: <Tag color="processing">{assigned_to}</Tag>
            </p>
          </div>
        </div>
      </Card>
    </div>
  )
}
