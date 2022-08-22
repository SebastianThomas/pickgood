import express from 'express'
import Station from '../dao/models/Station'

const router = express.Router()

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
