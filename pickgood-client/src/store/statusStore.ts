import { defineStore } from 'pinia'
import Configuration from '../types/Configuration'

// Load Config
import _config from '../assets/config.json'
import { DisconnectedStatus, Status } from '../types/status'

export type StatusStoreState = {
  config: Configuration
  socketIOStatus: Status
  errors: string[]
}

export const useStore = defineStore('status', {
  state: (): StatusStoreState => ({
    config: _config,
    socketIOStatus: DisconnectedStatus,
    errors: [],
  }),
  getters: {},
  actions: {
    setSocketIOStatus(status: Status) {
      this.socketIOStatus = status
    },
    addError(error: string) {
      this.errors.push(error)
    },
    removeErrorByError(error: string) {
      this.errors.filter(e => e !== error)
    },
    removeErrorByIndex(index: number) {
      this.errors = this.errors.splice(index, 1)
    },
  },
})
