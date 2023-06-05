export interface User {
  $id: string
  $createdAt: string
  $updatedAt: string
  name: string
  password?: string
  registration: string
  status: boolean
  email: string
  phone: string
  emailVerification: boolean
  phoneVerification: boolean
  prefs: any
  jwt: string
}
