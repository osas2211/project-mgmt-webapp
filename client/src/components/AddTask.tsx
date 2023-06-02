import { PlusCircleFilled } from "@ant-design/icons"
import {
  Button,
  Modal,
  Input,
  Row,
  Col,
  DatePicker,
  DatePickerProps,
  notification,
} from "antd"
import React, { useState } from "react"
import {
  useAddTaskMutation,
  useGetUserSessionQuery,
} from "../redux/services/projectify"
import { openNotification } from "../utils/openNotification"

export const AddTask = () => {
  const [api, contextHolder] = notification.useNotification()
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
  // data?.$id

  const addNewTask = async () => {
    // setIsModalOpen(false)
    try {
      await addTask({
        title,
        description: desc,
        assigned_by: userData?.$id,
        due_date: date,
        assigned_to: ["ewons"],
        jwt: userData?.jwt,
      }).unwrap()
      console.log(taskData)
      openNotification(
        "success",
        "Task Added",
        "Task successfully added to Project",
        api
      )
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
        style={{ margin: "1rem 0" }}
      >
        Add Task
      </Button>
      <Modal
        title="Add New Task to this Project"
        okText="Add Task"
        open={isModalOpen}
        onOk={addNewTask}
        onCancel={handleCancel}
      >
        <Row gutter={[16, 24]}>
          <Col span={24}>
            <Input
              placeholder="Title"
              onChange={(e) => setTitle(e.target.value)}
            />
          </Col>
          <Col span={24}>
            <Input.TextArea
              showCount
              maxLength={100}
              style={{ minHeight: 100, marginBottom: 24 }}
              placeholder="Description"
              onChange={(e) => setDesc(e.target.value)}
            />
          </Col>
          <Col span={24}>
            <DatePicker placeholder="Due Date" onChange={onChangeDate} />
          </Col>
        </Row>
      </Modal>
    </>
  )
}
