<script lang="ts" setup>
import { Invoice, InvoiceStatusPossibilitiesType, PackingInvoice } from 'pickgood-types';
import { ref, Ref } from 'vue';
import { useRoute } from 'vue-router';
import api from '../services/api';
import Product from '../types/Product';

const { params } = useRoute()
const invoiceID = typeof params.invoiceId === 'string' ? params.invoiceId : params.invoiceId[0]


const invoice: Ref<Invoice<number, InvoiceStatusPossibilitiesType> | null> = ref(null)
const invoicePacking: Ref<PackingInvoice<number, InvoiceStatusPossibilitiesType> | null> = ref(null)

invoice.value = (await api.get(`/invoices/${invoiceID}`)).data

</script>

<template>
  <div class="container container-invoice-overview" v-if="invoice !== null">
    <h2>
      Invoice: {{ invoice.invoiceID }}
    </h2>
    <div class="status" :class="`status-${invoice.status}`">
      Status: {{ invoice.status }} <div v-if="invoice.status === 'Packing'"></div>
    </div>
  </div>
  <div class="container container-invoice-overview" v-else>
    Loading...
  </div>
</template>

<style scoped>
.status {
  color: hsl(0, 0%, 39%);
}

.status-packing {
  color: hsl(130, 61%, 28%);
}
</style>