import { Header } from "./Header"
import { Outlet, useNavigate, useNavigation } from "react-router-dom"
import { Account, Client } from "appwrite"
import { useEffect, useState } from "react"
import { Spin } from "antd"
import { Navigator } from "./Navigator"
const client = new Client()
client
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject(import.meta.env.VITE_PROJECT_ID)
const account = new Account(client)

export default function CentralPage() {
  const [isUser, setIsUser] = useState<any>()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getUserState = async () => {
      try {
        const user = await account.get()
        if (user) setLoading(false)
        console.log(user)
        setIsUser(user)
        if (!user) navigate("/login")
      } catch (error) {
        navigate("/login")
      }
    }
    getUserState()
    console.log(isUser)
  }, [])
  return (
    <div>
      {!loading ? (
        <>
          <Header name={isUser.name as string} id={isUser.$id as string} />
          <main className="all-content">
            <Navigator />
            <Outlet />
          </main>
        </>
      ) : (
        <div
          style={{
            width: "100%",
            height: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Spin size="large" />
        </div>
      )}
    </div>
  )
}
