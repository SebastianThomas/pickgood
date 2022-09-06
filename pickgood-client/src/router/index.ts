import { createRouter, createWebHistory } from 'vue-router'
import Home from '/src/pages/Home.vue'
import ShowInvoice from '/src/pages/ShowInvoice.vue'
import InvoiceOverview from '/src/pages/InvoiceOverview.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/invoices/:invoiceId',
    name: 'InvoiceOverview',
    component: InvoiceOverview,
  },
  {
    path: '/invoices/details/:invoiceId',
    name: 'ShowSingleInvoice',
    component: ShowInvoice,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
