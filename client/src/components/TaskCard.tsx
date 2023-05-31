import { Avatar, Card } from "antd"
import React from "react"

export const TaskCard = () => {
  const assignees = [
    "https://xsgames.co/randomusers/avatar.php?g=pixel&key=2",
    "https://xsgames.co/randomusers/avatar.php?g=pixel&key=3",
    "https://xsgames.co/randomusers/avatar.php?g=pixel&key=4",
    "https://xsgames.co/randomusers/avatar.php?g=pixel&key=5",
    "https://xsgames.co/randomusers/avatar.php?g=pixel&key=6",
    "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
  ]
  return (
    <div className="task-card">
      <Card hoverable draggable>
        <h3>Create User Stories</h3>
        <div className="task-card-description">
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. A
            doloribus nam quisquam libero, velit quaerat repellendus accusamus
            consequuntur
          </p>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: "1rem",
          }}
        >
          <p>Due: 24th June 2023</p>
          <Avatar.Group maxCount={3}>
            {assignees.map((assignee, key) => {
              return <Avatar src={assignee} />
            })}
          </Avatar.Group>
        </div>
      </Card>
    </div>
  )
}
