import { Avatar, Button, Card, Tag, Modal, Input, Select, Row, Col } from "antd"
import React, { useState } from "react"
import { EditOutlined, DeleteOutlined } from "@ant-design/icons"
import { useGetUserSessionQuery } from "../redux/services/projectify"

export const TaskCard: React.FC<{
  title: string
  description: string
  due_date: string
  assigned_to: string
  assigned_by: string
  status: string
  members: { label: string; value: string }[]
}> = ({
  title,
  description,
  due_date,
  assigned_to,
  assigned_by,
  status,
  members,
}) => {
  const { data } = useGetUserSessionQuery("")
  const [openEdit, setOpenEdit] = useState(false)
  const [title_, setTitle] = useState(title)
  const [desc, setDesc] = useState(description)
  const [to, setTo] = useState(assigned_to)
  const [status_, setStatus] = useState(status)

  return (
    <div className="task-card">
      <Card hoverable draggable>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "1rem",
          }}
        >
          <h3>{title}</h3>
          {data?.$id === assigned_to || data?.$id === assigned_by ? (
            <div>
              <>
                <Button
                  shape="circle"
                  icon={<EditOutlined />}
                  type="dashed"
                  onClick={() => setOpenEdit(true)}
                />
                <Modal
                  okText="Edit Task"
                  open={openEdit}
                  onCancel={() => setOpenEdit(false)}
                  title={"Edit Task"}
                >
                  <Row gutter={[16, 24]}>
                    {data?.$id === assigned_by ? (
                      <>
                        <Col span={24}>
                          <Input
                            value={title_}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="title"
                          />
                        </Col>
                        <Col span={24}>
                          <Input.TextArea
                            value={desc}
                            onChange={(e) => setDesc(e.target.value)}
                            placeholder="Description"
                          />
                        </Col>
                        <Col span={24}>
                          <p>Assign To</p>
                          <Select
                            defaultValue={to}
                            style={{ width: "100%" }}
                            onChange={(value) => setTo(value)}
                            options={members}
                          />
                        </Col>
                      </>
                    ) : (
                      <></>
                    )}
                    <Col span={24}>
                      <p>Status</p>
                      <Select
                        defaultValue={status_}
                        style={{ width: "100%" }}
                        onChange={(value) => setTo(value)}
                        options={[
                          { value: "completed", label: "Completed" },
                          { value: "in-progress", label: "In Progress" },
                          { value: "uncompleted", label: "Not Completed" },
                        ]}
                      />
                    </Col>
                  </Row>
                </Modal>
              </>
              <Button
                shape="circle"
                icon={<DeleteOutlined />}
                type="dashed"
                style={{ marginLeft: "0.5rem", color: "red" }}
              />
            </div>
          ) : (
            <></>
          )}
        </div>
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
          <p>
            Due:{" "}
            <span style={{ color: "red", opacity: 0.7 }}>
              {new Date(due_date).toDateString()}
            </span>
          </p>
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
