import React, { useEffect } from "react"
import { MeetingNotification } from "../components/MeetingNotification"
import { Divider, message } from "antd"
import {
  useGetMeetingsQuery,
  useGetProjectsQuery,
  useGetUserSessionQuery,
} from "../redux/services/projectify"
import { Client, Databases, Account, ID } from "appwrite"
import { LoadingOutlined } from "@ant-design/icons"

const client = new Client()
client
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject(import.meta.env.VITE_PROJECT_ID)
const db = new Databases(client)

export const Meetings = () => {
  const { data: userData } = useGetUserSessionQuery("")
  const { data: projectData } = useGetProjectsQuery({ jwt: userData?.jwt })
  const {
    data,
    refetch: refetchMeetings,
    isLoading: loadingMeetings,
  } = useGetMeetingsQuery(
    projectData?.projects?.map((project: any) => project.$id)
  )
  useEffect(() => {
    client.subscribe(
      `databases.${import.meta.env.VITE_DATABASE_ID}.collections.${
        import.meta.env.VITE_MEETINGS_COLLECTION_ID
      }.documents`,
      (response: any) => {
        // message.success("A new meeting has just been scheduled", 20)
        refetchMeetings()
          .unwrap()
          .then((data) => console.log(data))
      }
    )
  }, [])
  return (
    <div className="upcoming-meetings page">
      <div>
        <h2 style={{ marginBottom: "1.5rem" }}>
          <span></span> Scheduled Meetings
        </h2>
        {loadingMeetings ? (
          <LoadingOutlined />
        ) : (
          <div className="upcomings">
            <div>
              <div>
                {data?.map((meeting: any) => (
                  <MeetingNotification
                    title={meeting?.title}
                    date={new Date(meeting?.day).toDateString()}
                    time={new Date(meeting?.time).toLocaleString("en-US", {
                      hour: "numeric",
                      minute: "numeric",
                      hour12: true,
                    })}
                    color="#1c93e1"
                    title_style={{ fontSize: "1.2rem" }}
                    key={meeting?.$id}
                    id={meeting?.$id}
                  />
                ))}
              </div>
              <Divider />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
