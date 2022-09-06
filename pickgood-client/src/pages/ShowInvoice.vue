<script setup lang="ts">
// Vue imports
import { Invoice, InvoiceStatusPossibilitiesType, PackingInvoice, PackingInvoiceStatusPossibilitiesType } from 'pickgood-types';
import { Ref, ref } from 'vue';
import { useRoute } from 'vue-router';
// Vue Components
import HeadConfiguration from '../components/HeadConfiguration.vue';
import ShowProductRow from '../components/ShowProductRow.vue'
import InvoiceService from '../services/InvoiceService';
// Types
import Product from '../types/Product';

const { params } = useRoute()
const invoiceID = Number(typeof params.invoiceId === 'string' ? params.invoiceId : params.invoiceId[0])

const invoice: Ref<Invoice<number, InvoiceStatusPossibilitiesType> | null> = ref(null)
const invoicePacking: Ref<PackingInvoice<number, PackingInvoiceStatusPossibilitiesType> | null> = ref(null)
const products: Ref<Array<Product>> = ref([])

InvoiceService.fetchAndStoreInvoice(invoiceID, invoice, invoicePacking, products)
</script>

<template>
  <HeadConfiguration :title="`Invoice #${invoiceID}`" />

  <div class="card">
    <show-product-row v-for="(product, key) in products" :key="key" :product="product" />
  </div>
</template>

<style scoped>
</style>
