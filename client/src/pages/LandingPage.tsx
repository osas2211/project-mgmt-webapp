import { useState } from "react"
import { Logo } from "../components/Logo"
import { Link } from "react-router-dom"
import bolt from "../assets/bolt.svg"
import projectIcon from "../assets/project.svg"
import taskIcon from "../assets/tasks.png"
import heroImg from "../assets/team_hero.png"
import heroImgLight from "../assets/team_hero_light.png"
import { Features } from "../components/landing_page/Features"
import { TechStack } from "../components/landing_page/TechStack"
import { Button } from "antd"
import { MenuFoldOutlined, CloseCircleFilled } from "@ant-design/icons"
import { createPortal } from "react-dom"

const LandingPage = () => {
  const [collapsed, setCollapsed] = useState<boolean>(false)
  const toggleCollapsed = () => {
    setCollapsed(!collapsed)
  }

  return (
    <div className="landing">
      <nav className="landing_desktop-nav">
        <Logo />
        <div className="landing_desktop_nav_list">
          <ul>
            <li>
              <a href="#features">Features</a>
            </li>
            <li>
              <a href="#tech_stack">Tech Stack</a>
            </li>
            {/* <li>
              <a href="#sponsors">Sponsors</a>
            </li> */}
            <li>
              <a href="https://osaretinfrank.netlify.app/" target="_blank">
                About The Developer
              </a>
            </li>
          </ul>
          <div>
            <div>
              <Link to="login" className="landing_btn_2">
                Log In
              </Link>
              <Link to="signup" className="landing_btn_1">
                Get Started
              </Link>
            </div>
          </div>
        </div>

        <div className="landing-mobile-nav">
          <Button type="primary" onClick={toggleCollapsed}>
            {collapsed ? <CloseCircleFilled /> : <MenuFoldOutlined />}
          </Button>
          {collapsed && <LandingMobileNav />}
        </div>
      </nav>

      <section className="hero">
        <div>
          <h1>
            Your <img src={bolt} alt="lighting bolt" />
            teams, <img src={projectIcon} alt="project icon" />
            projects,{" "}
          </h1>
          <h1>
            & <img src={taskIcon} alt="target icon" />
            tasks. Together in one place.
          </h1>
        </div>
        <div>
          <p>
            Collaborate, manage projects, and reach new productivity peaks. From
            high rises to the home office, the way your team works is unique.
            Accomplish it all with projectify.
          </p>
          <Link to="signup" className="landing_btn_1">
            Get Started
          </Link>
        </div>
        <div className="hero-img-dark">
          <img src={heroImg} alt="Hero" />
        </div>
        <div className="hero-img-light">
          <img src={heroImgLight} alt="Hero" />
        </div>
      </section>
      <Features />

      <TechStack />

      <footer>
        <p style={{ marginBottom: "0px" }}>
          May / June 2023, Hashnode x Appwrite Hackathon
        </p>
        <p style={{ marginTop: "0px" }}>
          Developed by{" "}
          <a
            href="https://osaretinfrank.netlify.app/"
            target="_blank"
            rel="noreferrer"
            style={{ textDecoration: "underline", color: "rgb(13, 162, 231)" }}
          >
            Osariemen Osaretin Frank
          </a>
        </p>
      </footer>
    </div>
  )
}

export const LandingMobileNav = () => {
  return createPortal(
    <div className="landing-mobile-nav-list">
      <ul>
        <li>
          <a href="#features">Features</a>
        </li>
        <li>
          <a href="#tech_stack">Tech Stack</a>
        </li>
        {/* <li>
              <a href="#sponsors">Sponsors</a>
            </li> */}
        <li>
          <a href="https://osaretinfrank.netlify.app/" target="_blank">
            About The Developer
          </a>
        </li>
      </ul>
      <div>
        <Link to="/login" className="landing_btn_2">
          Log In
        </Link>
        <Link to="/signup" className="landing_btn_1">
          Get Started
        </Link>
      </div>
    </div>,
    document.body
  )
}

export default LandingPage
