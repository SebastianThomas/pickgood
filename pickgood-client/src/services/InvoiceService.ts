import {
  Invoice,
  InvoiceStatusPossibilitiesType,
  PackingInvoice,
  PackingInvoiceStatusPossibilitiesType,
} from 'pickgood-types'
import { Ref } from 'vue'
import Product from '../types/Product'
import api from './api'

export default class InvoiceService {
  static async fetchAndStoreInvoice(
    invoiceID: number,
    invoiceRef: Ref<Invoice<number, InvoiceStatusPossibilitiesType> | null>,
    packingInvoiceRef: Ref<PackingInvoice<
      number,
      PackingInvoiceStatusPossibilitiesType
    > | null>,
    productsRef?: Ref<Product[]>
  ): Promise<boolean> {
    const returnValue = false
    try {
      invoiceRef.value = (await api.get(`/invoices/${invoiceID}`)).data
      if (invoiceRef.value === null) return returnValue
      if (invoiceRef.value?.status === 'Packing')
        packingInvoiceRef.value = await InvoiceService.fetchPackingInvoice(
          invoiceID
        )
      if (productsRef)
        productsRef.value = await InvoiceService.fetchProductsInvoice(invoiceID)
    } catch (err) {
      console.log('Error fetching invoice in ShowInvoice')
      console.log(err)
    } finally {
      return returnValue
    }
  }

  static async fetchPackingInvoice(invoiceID: number) {
    return (
      await api.get<{
        packingInvoice: PackingInvoice<
          number,
          PackingInvoiceStatusPossibilitiesType
        > & {
          invoice?: Invoice<number, InvoiceStatusPossibilitiesType>
        }
      }>(`/invoices/${invoiceID}/packing`)
    ).data.packingInvoice
  }

  static async fetchProductsInvoice(invoiceID: number): Promise<Product[]> {
    return (
      await api.get<{
        products: Product[]
      }>('/products/invoice/${invoiceID}')
    ).data.products
  }
}
