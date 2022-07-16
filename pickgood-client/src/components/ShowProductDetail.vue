<script setup lang="ts">
import Product from '../types/Product';

const props = defineProps<{ product: Product }>()

console.log(`Loaded and showing product: ${props.product.id}`)
</script>

<template>
  <h1>
    {{ product.title }}
  </h1>
  <p>{{ product.description }}</p>
  <img v-for="(img, key) in product.images" :key="key" :src="img" />
</template>

<style scoped>
</style>