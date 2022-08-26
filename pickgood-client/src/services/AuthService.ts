import api from './api'

// Import types
import { User } from 'pickgood-types'
import { RefreshTokenType as RefreshToken } from 'pickgood-types'

// Setup store
import pinia from '../store/pinia'
import { useStore as useAuthStore } from '../store/authStore'

const store = useAuthStore(pinia)

class AuthService {
  static async login({
    firstName,
    lastName,
    pwd,
  }: {
    firstName: string
    lastName: string
    pwd: string
  }) {
    const response: {
      refreshToken: RefreshToken<string>
      accessToken: string
      userInfo: User<string>
      totalUserTokens: number
    } = (
      await api.post('/auth/signin', {
        firstName,
        lastName,
        pwd,
      })
    ).data

    if (typeof response.accessToken !== 'undefined') {
      store.loginSuccessful(response)
    }

    return response
  }

  static async register({
    firstName,
    lastName,
    pwd,
  }: {
    firstName: string
    lastName: string
    pwd: string
  }) {
    const response:
      | {
          ok: true
          userInfo: User<string>
        }
      | {
          ok: false
          error: string
        } = (
      await api.post('/users/', {
        firstName,
        lastName,
        pwd,
      })
    ).data

    if (!response.ok) {
      throw new Error(response.error)
    }

    return response.userInfo
  }

  static async logout() {
    try {
      return (
        await api.post('/auth/signout/', {
          refreshToken: store.refreshKey?.token,
        })
      ).data
    } catch (err) {
      console.log('Error during log out')
      console.log(err)
    } finally {
      store.removeUser()
    }
  }
}
export default AuthService
