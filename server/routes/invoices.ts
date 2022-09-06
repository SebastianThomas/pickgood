import express from 'express'
import {
  fetchOrders,
  FetchOrdersResponseType,
} from '../connector/billbee/orders/fetchOrders'
import Invoice from '../dao/models/Invoice'
import PackingInvoice from '../dao/models/PackingInvoice'
import Product from '../dao/models/Product'
import Station from '../dao/models/Station'
import StationPackedProduct from '../dao/models/StationPackedProduct'
import { requireAuthenticated } from '../middleware/authMiddleware'
import { UserRecord } from '../types/UserRecord'

const router = express.Router()

// GET /api/invoices/:id -> typeof id === number
// Get information
router.get(
  '/:id',
  requireAuthenticated,
  async (
    req: express.Request<{ id: number }>,
    res: express.Response<
      { invoice: Invoice } | { invoice: null; error: string }
    >
  ) => {
    const invoice = await Invoice.findByPk(req.params.id)
    if (invoice === null)
      return res.status(404).json({ error: 'Invoice not found', invoice: null })
    return res.status(200).json({ invoice })
  }
)

// GET /api/invoices/:id/packing -> typeof id === number
// Get information about the packing of an invoice
router.get(
  '/:id/packing',
  requireAuthenticated,
  async (
    req: express.Request<{ id: number }>,
    res: express.Response<
      | {
          packingInvoice: PackingInvoice & {
            invoice?: Invoice
          }
        }
      | { packingInvoice: null; error: string },
      UserRecord
    >
  ) => {
    const packingInvoice = await PackingInvoice.findByPk(req.params.id, {
      include: PackingInvoice.associations.invoice,
    })

    return packingInvoice === null
      ? res
          .status(404)
          .json({ error: 'Invoice not found', packingInvoice: null })
      : res.status(200).json({ packingInvoice })
  }
)

// GET /api/invoices/:id/product/:pid
// Get information about a product that was packed as part of an invoice
router.get(
  '/:id/product/:pid',
  requireAuthenticated,
  async (
    req: express.Request<{ id: number; pid: number }>,
    res: express.Response<
      | {
          stationPackedProduct: StationPackedProduct & {
            product?: Product
            invoice?: Invoice
            station?: Station
          }
        }
      | { stationPackedProduct: null; error: string }
    >
  ) => {
    const stationPackedProduct = await StationPackedProduct.findOne({
      where: {
        invoiceID: req.params.id,
        productID: req.params.pid,
      },
    })

    return stationPackedProduct === null
      ? res.status(404).json({
          error: 'Combination Invoice - Product not found',
          stationPackedProduct: null,
        })
      : res.status(200).json({ stationPackedProduct })
  }
)

// POST /api/invoices/orders/fetch
// Fetch invoices from the Billbee API
router.post(
  '/orders/fetch',
  requireAuthenticated,
  async (
    req: express.Request,
    res: express.Response<
      (
        | (FetchOrdersResponseType & {
            ok: true
          })
        | {
            ok: false
            error: string
            status?: number | undefined
            data?: any
          }
      )[]
    >
  ) => {
    const pagedInvoices = [await fetchOrders({ page: 1 })]
    if (pagedInvoices[0].ok === false) {
      return res.status(500).json(pagedInvoices)
    }
    const totalPages = pagedInvoices[0].Paging.TotalPages

    const asyncHandlers: Promise<
      | (FetchOrdersResponseType & { ok: true })
      | { ok: false; error: string; status?: number | undefined; data?: any }
    >[] = []
    for (let i = 1; i < totalPages; i++) {
      asyncHandlers.push(fetchOrders({ page: i }))
    }

    pagedInvoices.push(
      ...(await Promise.all<
        | (FetchOrdersResponseType & { ok: true })
        | { ok: false; error: string; status?: number | undefined; data?: any }
      >(asyncHandlers))
    )

    console.log(pagedInvoices)

    const invoices = pagedInvoices
      .map(i => {
        return i.ok ? i.Data : []
      })
      .flat()
    console.log(invoices[0])

    return res.status(200).json(pagedInvoices)
  }
)

export default router
