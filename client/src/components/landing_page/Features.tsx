import React from "react"
import { Link } from "react-router-dom"
import work from "../../assets/work.svg"
import collaborate from "../../assets/collaborate.svg"
import chat from "../../assets/chat.svg"

export const Features = () => {
  return (
    <section id="features" className="features">
      <h2>Projectify - Features.</h2>
      <div style={{ margin: "4rem 0" }}>
        {/* ------------------------------Feature 1------------------------------ */}
        <div className="feature">
          <div className="feature-text">
            <h3>Organize your projects and work neatly.</h3>
            <p>
              All the conveniences in managing your projects can be found in
              Projectify. You can analyze the success of your activities and
              that of your teammates. Handling your projects is made super easy.
            </p>
            <Link className="landing_btn_2" to="/signup">
              See more
            </Link>
          </div>
          <div className="feature-img">
            <img src={work} alt="A man working" />
          </div>
        </div>

        {/* ------------------------------Feature 2------------------------------ */}
        <div className="feature">
          <div className="feature-text">
            <h3>Grow your team and collaborate efficiently.</h3>
            <p>
              Projectify has the essentials to scale a global team. See your
              team grow in the sense of being able to manage tasks to match the
              target through collaboration.
            </p>
            <Link className="landing_btn_2" to="/signup">
              See more
            </Link>
          </div>
          <div className="feature-img">
            <img src={collaborate} alt="Team Collaborating" />
          </div>
        </div>

        {/* ------------------------------Feature 3------------------------------ */}
        <div className="feature">
          <div className="feature-text">
            <h3>Set up meetings and communicate in RealTime.</h3>
            <p>
              Projectify comes with a chat system and video calling tool. You
              can set up online meetings and also keep your team together
              through chats. No need to travel and meet up all the time.
              Projectify handles communication needs for a global team.
            </p>
            <Link className="landing_btn_2" to="/signup">
              See more
            </Link>
          </div>
          <div className="feature-img">
            <img src={chat} alt="Team having a realtime communication" />
          </div>
        </div>
      </div>
    </section>
  )
}
