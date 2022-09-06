import express from 'express'
import Invoice from '../dao/models/Invoice'
import Product from '../dao/models/Product'
import ProductAtStation from '../dao/models/ProductAtStation'
import Station from '../dao/models/Station'
import { UserRecord } from '../types/UserRecord'

const router = express.Router()

// GET /api/products
// Get general information about all products
router.get('/', (req, res) => {
  const info = Product.getGeneralInformation()
  return res.status(200).json({
    info,
  })
})

// GET /api/products/:id -> typeof id === number
// Get information about the product `req.params.id`, including images
router.get(
  '/:id',
  async (
    req: express.Request<{ id: number }>,
    res: express.Response<
      { product: (Product & { images?: string[] }) | null; error?: string },
      UserRecord
    >
  ) => {
    if (typeof req.params.id !== 'number')
      return res
        .status(404)
        .json({ product: null, error: 'Parameter ID must be a number' })
    const product = await Product.findByPk(req.params.id, {
      include: Product.associations.images,
    })
    if (product === null)
      return res.status(404).json({ product: null, error: 'Product not found' })

    return res.status(200).json({
      product,
    })
  }
)

// GET /api/products/:id
// Get all products that were bought in a given invoice
router.get(
  '/invoice/:id',
  async (
    req: express.Request<{ id: number }>,
    res: express.Response<
      { products: Product[] } | { products: null; error: string }
    >
  ) => {
    if (typeof req.params.id !== 'number')
      return res
        .status(404)
        .json({ error: 'Parameter ID must be a number.', products: null })
    const invoice = await Invoice.findByPk(req.params.id, {
      include: {
        model: Product,
      },
    })
    if (invoice === null)
      return res
        .status(404)
        .json({ error: 'Invoice not found', products: null })
    return res.status(200).json({ products: invoice.products })
  }
)

// GET /api/products/:pid/station/:sid -> typeof pid === number && typeof sid === string
// Get information about when a product last packed at a specific station
router.get(
  '/:pid/station/:sid',
  async (
    req: express.Request<{ pid: number; sid: string }>,
    res: express.Response<{
      product:
        | (ProductAtStation & {
            product?: Product
            station?: Station
          })
        | null
    }>
  ) => {
    return res.status(200).json({
      product: await ProductAtStation.findOne({
        where: { productID: req.params.pid, stationName: req.params.sid },
        include: [
          ProductAtStation.associations.product,
          ProductAtStation.associations.station,
        ],
      }),
    })
  }
)

export default router
