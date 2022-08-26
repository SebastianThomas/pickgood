import express from 'express'
import Station from '../dao/models/Station'

const router = express.Router()

router.get(
  '/all',
  async (
    req,
    res: express.Response<{ names: string[] } | { names: null; error: string }>
  ) => {
    const data = await Station.findAll()

    const newRows = data.filter(row => row.name !== 'NULL')

    if (newRows.length === 0)
      return res.status(404).json({ names: null, error: 'No entry found' })
    return res.status(200).json({
      names: newRows.map(row => row.name),
    })
  }
)

// GET /api/stations/:name -> typeof name === string
// Get information about a station
router.get(
  '/:name',
  async (
    req: express.Request<{ name: string }>,
    res: express.Response<
      { station: Station } | { station: null; error: string }
    >
  ) => {
    const station = await Station.findByPk(req.params.name)
    return station === null
      ? res.status(404).json({ station: null, error: 'Station not found' })
      : res.status(200).json({ station })
  }
)

export default router
