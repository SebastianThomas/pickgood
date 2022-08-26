<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import { ref } from 'vue';
import { useStore as useStatusStore, StatusStoreState } from '../store/statusStore';

import ShowErrors from './ShowErrors.vue'

const emit = defineEmits<{
  (event: 'showSettings'): void
}>()

const { socketIOStatus } = storeToRefs(useStatusStore())

const showSettings = () => {
  emit('showSettings')
}
</script>

<template>
  <div class="container status-bar-container">
    <div class="empty"></div>
    <div class="status center" :style="`color: ${socketIOStatus.color}`">{{
        !socketIOStatus.status ? socketIOStatus.reason :
          socketIOStatus.displayString
    }}
    </div>
    <div class="errors">
      <show-errors />
    </div>
  </div>
</template>

<style scoped>
.status-bar-container {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
}
</style>
