import {
  BaseQueryApi,
  FetchArgs,
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react"
import type { User } from "../../types"
import { mutations } from "../endpoints/mutation_endpoints"
import { Client, Account, Models } from "appwrite"
import { queries } from "../endpoints/query_endpoints"

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
        const client = new Client()
        client
          .setEndpoint("https://cloud.appwrite.io/v1")
          .setProject(import.meta.env.VITE_PROJECT_ID)
        const account = new Account(client)
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
    // Create project
    createProject: mutations.createProjectEndpoint(builder).createProject,
    // Get Projects
    getProjects: queries.getProjectsEndpoint(builder).getProjects,
    //GET Project
    getProject: queries.getProjectEndpoint(builder).getProject,
    //Add Task
    addTask: mutations.addTaskEndpoint(builder).addTask,
    //Get Tasks
    getTasks: queries.getTasksEndpoint(builder).getTasks,
    // Add Collaborator
    addCollaborator: mutations.addCollaboratorEndpoint(builder).addCollaborator,
  }),
})

export const {
  useSignUpMutation,
  useGetUserSessionQuery,
  useAddTaskMutation,
  useGetTasksQuery,
  useCreateProjectMutation,
  useGetProjectsQuery,
  useGetProjectQuery,
  useAddCollaboratorMutation,
} = projectifyApi
