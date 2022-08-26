<script setup lang="ts">
import { io } from 'socket.io-client'
// Vue Components
import PickGoodHeader from './components/PickGoodHeader.vue'
import PickGoodFooter from './components/PickGoodFooter.vue'
import { ConnectedStatus, DisconnectedStatus, Status } from './types/status';
import { useStore as useStatusStore } from './store/statusStore';
import { DisconnectDescription } from 'socket.io-client/build/esm/socket';
import { Ref, ref } from 'vue';

const statusStore = useStatusStore()

const setConnectedStatus = () => {
  statusStore.setSocketIOStatus(ConnectedStatus)
}
const setDisconnectedStatus = (reason: string, description?: DisconnectDescription) => {
  const newStatus: Status = DisconnectedStatus;
  if (!newStatus.status) { // Always true
    newStatus.reason = reason;
    newStatus.description = description
  }
  statusStore.setSocketIOStatus(newStatus)
}

const socket =
  typeof import.meta.env.VITE_SOCKET_IO_SERVER_URL !== 'undefined'
    ? io(import.meta.env.VITE_SOCKET_IO_SERVER_URL)
    : io()

socket.on('ack', () => {
  console.log('ACK')
  setConnectedStatus()
})
socket.on('disconnect', (reason, description) => {
  setDisconnectedStatus(reason, description)
})

// Handle user must be logged in
const showLoginPopup = ref(true)
const useRegister = ref(false)

import { useStore as useAuthStore } from './store/authStore'
import LoginComponent from './components/LoginComponent.vue'
import RegisterComponent from './components/RegisterComponent.vue'

const authStore = useAuthStore()

authStore.initUser()
authStore.loading.then(() => {
  if (authStore.status.loggedIn) showLoginPopup.value = false
})
</script>

<template>
  <pick-good-header />
  <div class="content">
    <login-component v-if="showLoginPopup && !useRegister" @successful="showLoginPopup = false"
      @gotoRegister="useRegister = true" />
    <register-component v-else-if="showLoginPopup && useRegister"
      @gotoLogin="useRegister = false" />
    <router-view v-else></router-view>
  </div>
  <pick-good-footer />
</template>

<style scoped>
</style>
