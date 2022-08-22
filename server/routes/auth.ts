import express from 'express'
import { body, validationResult } from 'express-validator'

import { validateResult } from './users'

import {
  performSignin,
  refreshAccessToken,
} from '../controllers/AuthController'
import RefreshToken from '../dao/models/RefreshToken'
import { UserRecord } from '../types/UserRecord'

const router = express.Router()

// GET /api/auth/signin
// Sign in the user with `email` and `pwd` via `req.body`
// returns to the user:
// {
//     refreshToken: RefreshToken;
//     accessToken: string;
//     userInfo: {
//         id: ID;
//         firstName: string;
//         lastName: string;
//     };
// }
router.post(
  '/signin',
  body('firstName').isLength({ min: 1 }),
  body('lastName').isLength({ min: 1 }),
  body('pwd').isLength({ min: 8 }),
  validateResult,
  async (req: express.Request, res: express.Response<{}, UserRecord>) => {
    const { firstName, lastName, pwd } = req.body

    try {
      const { refreshToken, accessToken, userInfo } = await performSignin(
        firstName,
        lastName,
        pwd
      )

      return res.status(200).json({
        refreshToken,
        accessToken,
        userInfo,
        currentStation: userInfo.stationName, // TODO: Compare current station with this in frontend and potentially update
      })
    } catch (err: any) {
      res.status(err.statusCode || 400).json({ error: err.message })
    }
  }
)

// POST /api/auth/refresh
// Acquire a new access token using a refresh token.
router.post(
  '/refresh',
  validateResult,
  async (_req: express.Request, res: express.Response<{}, UserRecord>) => {
    // Token in locals is from `req.body`
    const token = res.locals.refreshToken

    if (typeof token !== 'string')
      return res.status(401).json({
        error:
          'You must send a refresh token in order to get a new access token.',
      })

    try {
      const newToken = await refreshAccessToken(token)
      return res.status(200).json(newToken)
    } catch (err) {
      // in production, there will be many false refresh tries, and this error is absolutely expected
      return res.status(403).json({ error: 'Refresh token is invalid' })
    }
  }
)

// POST /api/auth/signout
// Sign out a user (remove refresh token from DB)
router.post(
  '/signout',
  validateResult,
  async (_req: express.Request, res: express.Response<{}, UserRecord>) => {
    const token = res.locals.refreshToken

    if (typeof token !== 'string')
      return res.status(401).json({
        error: 'You are not logged in.',
      })

    await RefreshToken.destroy({
      where: {
        token,
      },
    })
    return res.status(200).json({
      msg: 'Successfully signed out!',
    })
  }
)

export default router
