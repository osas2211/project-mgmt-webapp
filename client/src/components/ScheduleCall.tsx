import React, { useEffect, useState } from "react"
import { LoadingOutlined, VideoCameraAddOutlined } from "@ant-design/icons"
import {
  Button,
  Input,
  Modal,
  DatePicker,
  DatePickerProps,
  TimePicker,
  message,
  TimePickerProps,
} from "antd"
import { Client, Databases, Account, ID } from "appwrite"
import { useParams } from "react-router-dom"

const client = new Client()
client
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject(import.meta.env.VITE_PROJECT_ID)
const account = new Account(client)
const db = new Databases(client)

export const ScheduleMeeting = () => {
  const [open, setOpen] = useState(false)
  const [day, setDay] = useState<any>()
  const [time, setTime] = useState<any>()
  const [title, setTitle] = useState<string>()
  const [loading, setLoading] = useState(false)
  const { id } = useParams()

  const onChangeDate: DatePickerProps["onChange"] = (date, dateString) => {
    setDay(date)
  }
  const onChangeTime: TimePickerProps["onChange"] = (time, timeString) => {
    setTime(time)
  }

  const onSubmit = async () => {
    setLoading(true)
    try {
      await db.createDocument(
        import.meta.env.VITE_DATABASE_ID,
        import.meta.env.VITE_MEETINGS_COLLECTION_ID,
        ID.unique(),
        {
          title,
          day,
          project: id,
          time,
        }
      )

      message.success("Meeting Successfully Scheduled")
      setLoading(false)
    } catch (error: any) {
      setLoading(false)
      message.error(error.message)
    }
  }

  return (
    <div style={{ margin: "0.5rem 0" }}>
      <Button
        icon={<VideoCameraAddOutlined />}
        type="primary"
        onClick={() => setOpen(true)}
      >
        Schedule Meeting
      </Button>
      <Modal
        open={open}
        onCancel={() => setOpen(false)}
        title={"Schedule a Team Meeting"}
        okText={
          loading ? (
            <LoadingOutlined />
          ) : (
            <>
              <VideoCameraAddOutlined />
              Schedule
            </>
          )
        }
        onOk={onSubmit}
      >
        <Input
          placeholder="Meeting Agenda"
          onChange={(e) => setTitle(e.target.value)}
          style={{ marginBottom: "1rem" }}
        />
        <DatePicker
          placeholder="Meeting Date"
          onChange={onChangeDate}
          style={{ marginRight: "1rem" }}
          disabled={loading}
        />
        <TimePicker placeholder="Meeting Time" onChange={onChangeTime} />
      </Modal>
    </div>
  )
}
