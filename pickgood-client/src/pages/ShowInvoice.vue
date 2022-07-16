<script setup lang="ts">
// Vue imports
import { Ref, ref } from 'vue';
import { useRoute } from 'vue-router';
// Vue Components
import ShowProductRow from '../components/ShowProductRow.vue'
// Types
import Product from '../types/Product';

// Handle route 
const { params } = useRoute()
// Handle Invoice fetching
const invoiceId = typeof params.invoiceId === 'string' ? params.invoiceId : params.invoiceId[0]

const products = [new Product(invoiceId + '1', 'TODO: Test title', 5, '', [])]
console.log(products)
</script>

<template>
  <div class="card">
    <show-product-row v-for="(product, key) in products" :key="key" :product="product" />
  </div>
</template>

<style scoped>
</style>
