import React from "react"
import AgoraUIKit from "agora-react-uikit"

import { useState } from "react"
import { Button } from "antd"

export const VideoCall: React.FC<{ id: string }> = ({ id }) => {
  const [videoCall, setVideoCall] = useState(true)
  const rtcProps = {
    appId: import.meta.env.VITE_RTC_ID,
    channel: id,
    token: null,
  }
  const callbacks = {
    EndCall: () => setVideoCall(false),
  }
  return videoCall ? (
    <div
      style={{
        display: "flex",
        width: "90%",
        height: "85%",
        margin: "auto",
        // background: "black",
      }}
    >
      <AgoraUIKit
        rtcProps={rtcProps}
        callbacks={{ ...callbacks, Screensharing: () => true }}
        styleProps={{
          UIKitContainer: {
            height: "100%",
            display: "grid",
          },
          pinnedVideoContainer: {
            width: "100%",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gridGap: ".5rem",
          },

          scrollViewContainer: {
            display: "grid",
            gridTemplateRows: "1fr",
            gridGap: ".5rem",
            height: "40rem",
          },
          iconSize: 25,
        }}
      />
    </div>
  ) : (
    <Button size="large" type="dashed" onClick={() => setVideoCall(true)}>
      ReJoin Call
    </Button>
  )
}
