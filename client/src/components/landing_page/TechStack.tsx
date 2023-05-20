import React from "react"
import redux from "../../assets/redux.svg"
import js from "../../assets/js.svg"
import ts from "../../assets/ts.svg"
import vite from "../../assets/vite.svg"
import react from "../../assets/react.svg"
import ant from "../../assets/ant.svg"
import docker from "../../assets/docker.svg"
import sass from "../../assets/sass.svg"
import appwriteImg from "../../assets/appwrite.svg"

export const TechStack = () => {
  return (
    <section id="tech_stack" className="tech_stack">
      <h2>Projectify - Tech Stack</h2>
      <div className="tools">
        <div className="tool">
          <div className="tool-img">
            <img src={appwriteImg} alt="" />
          </div>
          <p>Appwrite</p>
        </div>
        <div className="tool">
          <div className="tool-img">
            <img src={ts} alt="" />
          </div>
          <p>Typescript/Express</p>
        </div>
        <div className="tool">
          <div className="tool-img">
            <img src={react} alt="" />
          </div>
          <p>React.Js</p>
        </div>
        <div className="tool">
          <div className="tool-img">
            <img src={vite} alt="" />
          </div>
          <p>Vite</p>
        </div>
        <div className="tool">
          <div className="tool-img">
            <img src={ant} alt="" />
          </div>
          <p>Ant Design</p>
        </div>
        <div className="tool">
          <div className="tool-img">
            <img src={sass} alt="" />
          </div>
          <p>SCSS</p>
        </div>
        <div className="tool">
          <div className="tool-img">
            <img src={redux} alt="" />
          </div>
          <p>Redux Toolkit</p>
        </div>
        <div className="tool">
          <div className="tool-img">
            <img src={docker} alt="" />
          </div>
          <p>Docker</p>
        </div>
      </div>
    </section>
  )
}
