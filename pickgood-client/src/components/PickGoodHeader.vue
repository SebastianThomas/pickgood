<script setup lang="ts">
import Configuration from '../types/Configuration';

defineProps<{ status: string, statusColor: string, config: Configuration }>()
</script>

<template>
  <div class="card light-bg-card header-container">
    <div class="left">
      <router-link :to="{ name: 'Home' }">
        Start
      </router-link>
    </div>

    <div class="center">
      {{ config.company_name }}
    </div>

    <div class="right">
      <div class="status">

        Status:
        <span class="status-color" :style="`color: ${statusColor}`">
          {{ status }}
        </span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card {
  margin: 0 0 1rem;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  width: calc(100% - 4rem);

  padding: 0 2rem;
}

.card>* {
  padding: 0.5rem 2rem;
}

.left {
  justify-self: left;
}

.right {
  justify-self: end
}
</style>
