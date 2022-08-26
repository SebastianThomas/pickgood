<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useStore as useStatusStore } from '../store/statusStore';
import StatusBar from './StatusBar.vue';

const { config } = storeToRefs(useStatusStore())

const showSettings = () => {
  console.error('Show Settings not implemented')
}
</script>

<template>
  <div class="card light-bg-card header-container">
    <div class="top">
      <div class="left">
        <router-link :to="{ name: 'Home' }">
          Start
        </router-link>
      </div>

      <div class="center">
        {{ config.company_name }}
      </div>

      <div class="right">
        <a @click.prevent="showSettings">
          <font-awesome-icon :icon="['fa', 'gear']" />
        </a>
      </div>
    </div>
    <div class="status-bar">
      <status-bar @show-settings="showSettings" />
    </div>
  </div>
</template>

<style scoped>
.card {
  padding: 0.5rem 2rem;
  margin: 0.5rem;
}

.top {
  width: 100%;
  margin: 0;
  display: grid;
  grid-template-columns: 180px 1fr 180px;
}

.top>*:nth-child(2n - 1) {
  padding: 0.5rem 4rem;
}

.top>*:nth-child(2n) {
  padding: 0.5rem;
}

.left {
  justify-self: left;
}

.right {
  justify-self: end
}
</style>
