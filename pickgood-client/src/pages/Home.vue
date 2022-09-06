<script lang="ts" setup>
import { UserRank } from 'pickgood-types'
import { useStore as useAuthStore } from '../store/authStore'
import HeadConfiguration from '../components/HeadConfiguration.vue'
import api from '../services/api';

const userStore = useAuthStore()

const fetchOrders = () => {
  api.post('/invoices/orders/fetch')
}
</script>

<template>
  <HeadConfiguration :title="'Home'" />
  <div>
    <h2>
      Home
    </h2>

    <div class="admin-panel"
      v-if="userStore.status.loggedIn && userStore.user?.rank === UserRank.Administrator">
      <h3>Admin Panel</h3>
      <button @click.prevent="fetchOrders">Fetch all orders</button>
    </div>
  </div>
</template>
