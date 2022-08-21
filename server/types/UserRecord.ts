import User from '../dao/models/User'

export type UserRecord = {
  user?: User | null
  wrongToken?: boolean
  unauthenticated?: boolean
  accessToken?: string
  refreshToken?: string
}
