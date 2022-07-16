<script setup lang="ts">
import { ref, Ref } from 'vue'
import { io } from 'socket.io-client'
// Vue Components
import PickGoodHeader from './components/PickGoodHeader.vue'
import PickGoodFooter from './components/PickGoodFooter.vue'
import { ConnectedStatus, DisconnectedStatus, Status } from './types/status';

import config from './assets/config.json'

const status: Ref<string> = ref('')
const statusColor: Ref<string> = ref('red')

const setStatus = (connected: boolean) => {
  const newStatus: Status = connected ? ConnectedStatus : DisconnectedStatus;
  status.value = newStatus.displayString
  statusColor.value = newStatus.color
}

const socket =
  typeof import.meta.env.VITE_SOCKET_IO_SERVER_URL !== 'undefined'
    ? io(import.meta.env.VITE_SOCKET_IO_SERVER_URL)
    : io()

socket.on('ack', () => {
  console.log('ACK')
  setStatus(true)
})
</script>

<template>
  <pick-good-header :status="status" :statusColor="statusColor" :config="config" />
  <router-view></router-view>
  <pick-good-footer />
</template>

<style scoped>
</style>
