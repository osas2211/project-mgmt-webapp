import {
  BaseQueryApi,
  FetchArgs,
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react"
import type { User } from "../../types"
import { mutations } from "../endpoints/mutation_endpoints"
import { Client, Account, Models } from "appwrite"

const client = new Client()
client
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject(import.meta.env.VITE_PROJECT_ID)
const account = new Account(client)

export const projectifyApi = createApi({
  reducerPath: "projectifyAPI",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8000/api/v1/" }),
  endpoints: (builder) => ({
    //SignUp
    signUp: mutations.signUpEndpoint(builder).signUp,
    //Get User Session
    getUserSession: builder.query({
      async queryFn() {
        try {
          const user = await account.get()
          const { jwt } = await account.createJWT()
          const userData: User = { ...user, jwt }
          return {
            data: userData,
          }
        } catch (error: any) {
          return {
            error: error.message,
          }
        }
      },
    }),
    //Add Task
    addTask: mutations.addTaskEndpoint(builder).addTask,
    createProject: mutations.createProjectEndpoint(builder).createProject,
  }),
})

export const {
  useSignUpMutation,
  useGetUserSessionQuery,
  useAddTaskMutation,
  useCreateProjectMutation,
} = projectifyApi
