import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import type { User } from "../../types"
import { mutations } from "../endpoints/mutation_endpoints"

export const projectifyApi = createApi({
  reducerPath: "projectifyAPI",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8000/api/v1/" }),
  endpoints: (build) => ({
    signUp: mutations.signUpEndpoint(build).signUp,
  }),
})

export const { useSignUpMutation } = projectifyApi
