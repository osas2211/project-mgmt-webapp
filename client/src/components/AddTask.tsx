import { LoadingOutlined, PlusCircleFilled } from "@ant-design/icons"
import {
  Button,
  Modal,
  Input,
  Row,
  Col,
  DatePicker,
  DatePickerProps,
  notification,
  Select,
} from "antd"
import React, { useState } from "react"
import {
  useAddTaskMutation,
  useGetTasksQuery,
  useGetUserSessionQuery,
} from "../redux/services/projectify"
import { openNotification } from "../utils/openNotification"

export const AddTask: React.FC<{ projectID: string; members: any[] }> = ({
  projectID,
  members,
}) => {
  const [api, contextHolder] = notification.useNotification()
  const [assigned_to, setAssignedTo] = useState<string>()
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [date, setDate] = useState<any>()
  const [title, setTitle] = useState("")
  const [desc, setDesc] = useState("")
  const onChangeDate: DatePickerProps["onChange"] = (date, dateString) => {
    console.log(date, dateString)
    setDate(date)
  }
  const showModal = () => {
    setIsModalOpen(true)
  }
  const { data: userData } = useGetUserSessionQuery("")
  const [addTask, { data: taskData, isLoading, isError, error }] =
    useAddTaskMutation()
  const { refetch } = useGetTasksQuery({ id: projectID })

  const addNewTask = async () => {
    // setIsModalOpen(false)
    try {
      await addTask({
        title,
        description: desc,
        assigned_by: userData?.$id,
        due_date: date,
        jwt: userData?.jwt,
        projectID,
        assigned_to,
        project: projectID,
      }).unwrap()

      openNotification(
        "success",
        "Task Added",
        "Task successfully added to Project",
        api
      )
      refetch()
    } catch (error) {
      console.log(error, taskData)
      openNotification("error", "Failed to Add Task", "Failed", api)
    }
  }

  const handleCancel = () => {
    setIsModalOpen(false)
  }
  return (
    <>
      {contextHolder}
      <Button
        onClick={showModal}
        icon={<PlusCircleFilled />}
        type={"primary"}
        disabled={isLoading ? true : false}
      >
        {isLoading ? <LoadingOutlined /> : "Add Task"}
      </Button>
      <Modal
        title="Add New Task to this Project"
        okText={isLoading ? <LoadingOutlined /> : "Add Task"}
        open={isModalOpen}
        onOk={addNewTask}
        onCancel={handleCancel}
        okButtonProps={{ disabled: isLoading ? true : false }}
      >
        <Row gutter={[16, 24]}>
          <Col span={24}>
            <Input
              placeholder="Title"
              onChange={(e) => setTitle(e.target.value)}
              disabled={isLoading ? true : false}
            />
          </Col>
          <Col span={24}>
            <Input.TextArea
              showCount
              maxLength={100}
              style={{ minHeight: 100, marginBottom: 24 }}
              placeholder="Description"
              onChange={(e) => setDesc(e.target.value)}
              disabled={isLoading ? true : false}
            />
          </Col>
          <Col span={24}>
            <p>Assign To</p>
            <Select
              // defaultValue="lucy"
              style={{ width: "100%" }}
              onChange={(value) => setAssignedTo(value)}
              options={members}
              disabled={isLoading ? true : false}
            />
          </Col>
          <Col span={24}>
            <DatePicker
              placeholder="Due Date"
              onChange={onChangeDate}
              disabled={isLoading ? true : false}
            />
          </Col>
        </Row>
      </Modal>
    </>
  )
}
