import { defineStore } from 'pinia'

import api from '../services/api'
import { RefreshTokenType as RefreshToken } from 'pickgood-types'
import { User } from 'pickgood-types'
import { useToast } from 'vue-toast-notification'

export type AuthStoreState = {
  status: { loggedIn: boolean }
  user: User<string> | null
  accessKey: string
  refreshKey: RefreshToken<string> | null
  loading: Promise<boolean> | null
}

const useStore = defineStore('auth', {
  state: (): AuthStoreState => ({
    status: {
      loggedIn: false,
    },
    user: null,
    accessKey: '',
    refreshKey: null,
    loading: null,
  }),
  getters: {
    localRefreshToken: () =>
      JSON.parse(
        localStorage.getItem('refreshToken') as string
      ) as RefreshToken<string>,
    localAccessToken: state => state.accessKey,
  },
  actions: {
    initUser() {
      this.loading = new Promise(async resolve => {
        const item = localStorage.getItem('refreshToken')
        if (item == null) {
          this.status.loggedIn = false
          return resolve(false)
        }
        const refreshToken: RefreshToken<string> = JSON.parse(item)

        if (refreshToken.token == null) this.status.loggedIn = false
        else {
          useToast().info('Automatic login successful.')
          await this.refreshAccessToken(refreshToken)
        }

        resolve(true)
      })
    },
    async refreshAccessToken(refreshToken?: RefreshToken<string>) {
      try {
        // Default refreshToken to store
        if (typeof refreshToken === 'undefined') {
          if (this.refreshKey == null)
            throw new Error('No Refresh Token, not logged in')
          refreshToken = this.refreshKey
        }

        // Get new accessToken
        const result = (
          await api.post('/auth/refresh', {
            refreshToken: refreshToken.token,
          })
        ).data

        // Set refresh and accessToken
        this.refreshKey = result.tokenObject
        this.accessKey = result.accessToken

        // Get User info
        const data = (await api.get('/users')).data
        this.user = data.user

        if (!this.user) return 'User not logged in'

        // Set logged in status
        this.status.loggedIn = true
      } catch (e) {
        console.log('Could not refresh')
        console.log(e)
        this.removeUser()
      }
    },
    loginSuccessful(input: {
      accessToken: string
      refreshToken: RefreshToken<string>
      userInfo: User<string>
    }) {
      this.status.loggedIn = true
      this.accessKey = input.accessToken
      this.refreshKey = input.refreshToken
      this.user = input.userInfo

      localStorage.setItem('refreshToken', JSON.stringify(input.refreshToken))
    },
    removeUser() {
      localStorage.removeItem('refreshToken')
      this.initUser()
    },
  },
})

export { useStore }
