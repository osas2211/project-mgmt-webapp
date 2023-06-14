// import { LandingPage } from "./pages/LandingPage"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { connect } from "socket.io-client"
import React, { Suspense } from "react"
import { ConfigProvider, theme } from "antd"
import _404 from "./pages/404"
import ResetPassword from "./pages/ResetPassword."
import { UserProfile } from "./pages/UserProfile"
import { store } from "./redux/store"
import { Provider } from "react-redux"
import CentralPage from "./components/CentralPage"
import { Dashboard } from "./pages/Dashboard"
import { Projects } from "./pages/Projects"
import { Invitations } from "./pages/Invitations"
import { Meetings } from "./pages/Meetings"
import { ProjectDetails } from "./pages/ProjectDetails"
import { Chats } from "./pages/Chats"
import { Chat } from "./pages/Chat"
import { Timer } from "./pages/Timer"
import { MeetingRoom } from "./pages/MeetingRoom"
import { Workload } from "./pages/Workload"

// const socket = connect(`http://localhost:${import.meta.env.VITE_SERVER_PORT}`)
const socket = connect(`https://projectify-prk7.onrender.com`)

function App() {
  const LandingPage = React.lazy(() => import("./pages/LandingPage"))
  const Login = React.lazy(() => import("./pages/Login"))
  const Signup = React.lazy(() => import("./pages/Signup"))
  const Main = React.lazy(() => import("./components/CentralPage"))

  return (
    <div className="app">
      <Provider store={store}>
        <ConfigProvider
          theme={{
            algorithm: theme.defaultAlgorithm,
          }}
        >
          <Router>
            <Routes>
              <Route
                path="/"
                element={
                  <Suspense fallback={<div>loading...</div>}>
                    <LandingPage />
                  </Suspense>
                }
              />
              <Route
                path="/login"
                element={
                  <Suspense fallback={<div>loading...</div>}>
                    <Login />
                  </Suspense>
                }
              />
              <Route
                path="/signup"
                element={
                  <Suspense fallback={<div>loading...</div>}>
                    <Signup />
                  </Suspense>
                }
              />
              <Route path="reset-password" element={<ResetPassword />} />
              <Route
                path="/main"
                element={
                  <Suspense fallback={<div></div>}>
                    <Main />
                  </Suspense>
                }
              >
                <Route path="profile" element={<UserProfile />} />
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="projects" element={<Projects />} />
                <Route
                  path="project/:id"
                  element={<ProjectDetails socket={socket} />}
                />
                <Route path="chats" element={<Chats socket={socket} />}>
                  <Route path=":id" element={<Chat socket={socket} />} />
                </Route>
                <Route path="timer" element={<Timer />} />

                <Route path="meetings" element={<Meetings />} />
                <Route path="meet" element={<MeetingRoom />} />
                <Route path="tasks" element={<Workload />} />
                <Route path="*" element={<_404 />} />
              </Route>

              <Route path="*" element={<_404 />} />
            </Routes>
          </Router>
        </ConfigProvider>
      </Provider>
    </div>
  )
}

export default App
