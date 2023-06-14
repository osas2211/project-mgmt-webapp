import React from "react"
import { VideoCall } from "../components/VideoCall"
import { useGetMeetingQuery } from "../redux/services/projectify"
import { useLocation } from "react-router-dom"
import { Loading3QuartersOutlined } from "@ant-design/icons"

export const MeetingRoom = () => {
  const useQuery = () => new URLSearchParams(useLocation().search)
  let room = useQuery().get("room") as string
  const { data, isLoading } = useGetMeetingQuery(room)
  return (
    <div className="page">
      {isLoading ? (
        <Loading3QuartersOutlined />
      ) : (
        <>
          <div className="meeting-details">
            <h1 style={{ marginBottom: "1rem" }}>{data?.title}</h1>
          </div>
          <VideoCall id={room} />
        </>
      )}
    </div>
  )
}
