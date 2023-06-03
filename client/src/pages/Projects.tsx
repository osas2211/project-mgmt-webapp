import React from "react"
import { PlusSquareFilled } from "@ant-design/icons"
import { Row, Col } from "antd"
import { ProjectCard } from "../components/ProjectCard"
import projectImg from "../assets/project1.jpg"
import projectImg2 from "../assets/project2.png"
import projectImg3 from "../assets/project3.png"
import { AddProject } from "../components/AddProject"

export const Projects = () => {
  const data = [
    {
      description:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsam quamodit ea, cum pariatur eligendi libero quisquam ad doloribus qui.",
      tags: ["Website", "Android"],
      title: "The Paint Project",
      img: projectImg,
      links: ["", "", "", "", ""],
    },
    {
      description:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsam quamodit ea, cum pariatur eligendi libero quisquam ad doloribus qui.",
      tags: ["Website", "Android"],
      title: "Appwrite API",
      img: "",
      links: ["", "", ""],
    },
  ]
  const data2 = [
    {
      description:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsam quamodit ea, cum pariatur eligendi libero quisquam ad doloribus qui.",
      tags: ["Website", "Android"],
      title: "Let's Change the world",
      img: projectImg2,
      links: ["", "", "", "", ""],
    },
    {
      description:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsam quamodit ea, cum pariatur eligendi libero quisquam ad doloribus qui.",
      tags: ["Website", "Android"],
      title: "Hashnode API",
      img: "",
      links: ["", "", ""],
    },
  ]
  const data3 = [
    {
      description:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsam quamodit ea, cum pariatur eligendi libero quisquam ad doloribus qui.",
      tags: ["Website", "Android"],
      title: "The Avonova Project",
      img: projectImg3,
      links: ["", "", "", "", ""],
    },
    {
      description:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsam quamodit ea, cum pariatur eligendi libero quisquam ad doloribus qui.",
      tags: ["Website", "Android"],
      title: "Google API",
      img: "",
      links: ["", "", ""],
    },
  ]
  return (
    <div className="page">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h3>All Projects</h3>
        <AddProject />
      </div>
      <div className="projects">
        <Row gutter={[26, 24]}>
          {/* TODO PROJECTS */}
          <Col xs={24} md={12} lg={8} className="todo-projects">
            <h2>
              <span /> Todo Projects
            </h2>
            {data.map((datum, key) => (
              <ProjectCard {...datum} key={key} />
            ))}
          </Col>

          {/* IN PROGRESS */}
          <Col xs={24} md={12} lg={8} className="working-projects">
            <h2>
              <span style={{ backgroundColor: "#1c93e1" }} /> In Progress
            </h2>
            {data2.reverse().map((datum, key) => (
              <ProjectCard {...datum} key={key} />
            ))}
          </Col>

          {/* COMPLETED PROJECTS */}
          <Col xs={24} md={12} lg={8} className="todo-projects">
            <h2>
              <span style={{ backgroundColor: "#9BC53D" }} /> Completed Projects
            </h2>
            {data3.map((datum, key) => (
              <ProjectCard {...datum} key={key} />
            ))}
          </Col>
        </Row>
      </div>
    </div>
  )
}
