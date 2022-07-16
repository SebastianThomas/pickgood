<script setup lang="ts">
// Vue imports
import { Ref, ref } from 'vue';
// Component imports
import ModalComponent from '../components/ModalComponent.vue'
import ShowProductDetail from '../components/ShowProductDetail.vue'
// Types
import Product from '../types/Product';

// Props
defineProps<{ product: Product }>()

const pointerdown = (e: PointerEvent) => {
  showModal.value = true
}

// Handle Modal
const showModal: Ref<boolean> = ref(false)
</script>

<template>
  <div class="row-grid-container" @pointerdown.prevent="pointerdown">
    <!-- Table columns to display: -->
    <div class="images">
      <img v-for="(imgLink, key) in product.images" :key="key" src="imgLink">
    </div>
    <div v-for="(value, property, index) in product.getDisplayProperties()" :key="index"
      :class="property">
      <span>{{ value }}</span>
    </div>
  </div>

  <teleport to='body'>
    <modal-component :show="showModal" :modalwidth="750" @close="showModal = false">
      <template #header>
        <!-- Empty Header: -->
        <span></span>
      </template>
      <template #body>
        <show-product-detail :product="product" />
      </template>
    </modal-component>
  </teleport>
</template>

<style scoped>
.row-grid-container {
  height: 3rem;
  text-align: center;
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 2fr;
}

.row-grid-container>* {
  border: 1px solid var(--background-lighter-color);
}

.row-grid-container>* {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>