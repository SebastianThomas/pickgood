<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import { useStore as useStatusStore } from '../store/statusStore';

const { errors } = storeToRefs(useStatusStore())

const showErrors = () => {
  console.error('Show Errors not implemented yet.')
}
</script>

<template>
  <div class="container container-show-errors">
    <div class="error show-one-error clickable" @click.prevent="showErrors">{{ errors[0] || '' }}
    </div>
    <!-- <div class="error" v-for="error in errors">{{ error }}</div> -->
  </div>
</template>

<style scoped>
.show-one-error {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  text-align: right;
  padding: 0 0.5rem;
}

.error {
  max-width: 100%;
  min-width: 0;
  color: red;
}
</style>