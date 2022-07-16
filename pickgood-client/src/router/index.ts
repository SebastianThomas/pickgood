import { createRouter, createWebHistory } from 'vue-router'
import Home from '/src/pages/Home.vue'
import ShowInvoice from '/src/pages/ShowInvoice.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/invoices/:invoiceId',
    name: 'ShowSingleInvoice',
    component: ShowInvoice,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
