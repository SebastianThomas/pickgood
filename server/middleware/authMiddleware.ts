import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { UserRank } from 'pickgood-types'
import User from '../dao/models/User'
import { UserRecord } from '../types/UserRecord'

export const authMiddleware = async (
  req: Request,
  res: Response<{}, UserRecord>,
  next: NextFunction
) => {
  try {
    // Get access token and user
    if (
      handleAuthAccessHeader(req, res) &&
      typeof res.locals.accessToken !== 'undefined'
    ) {
      const verified = jwt.verify(
        res.locals.accessToken,
        process.env.ACCESS_TOKEN_JWT_SECRET || 'Default'
      )
      if (verified) {
        const decoded = jwt.decode(res.locals.accessToken) as { id: string } // jwt.JwtPayload is the id in the object

        if (decoded !== null) res.locals.user = await User.findById(decoded.id)
      }
      if (!res.locals.user) res.locals.wrongToken = true
      else res.locals.wrongToken = false
    }
  } catch (err) {}
  // Handle unauthenticated
  if (typeof res.locals.user === 'undefined') res.locals.unauthenticated = true
  else res.locals.unauthenticated = false

  // Get potential refresh token
  if (req.body?.refreshToken) res.locals.refreshToken = req.body.refreshToken

  // Handle wrong token request
  if (res.locals.wrongToken)
    return res.status(403).json({
      err: 'Token not valid!',
    })

  // Resume middleware queue
  next()
}

const handleAuthAccessHeader = (
  req: Request,
  res: Response<{}, UserRecord>
) => {
  if (req.headers['Authorization'] || req.headers['authorization']) {
    const authHeader =
      req.headers['Authorization'] || req.headers['authorization'] || ''
    const bearerToken =
      typeof authHeader === 'string' ? authHeader : authHeader[0]
    const token = bearerToken.split(' ')[1]

    if (token.length < 2) return false

    res.locals.accessToken = token

    return true
  }
}

export const requireAuthenticated = <R>(
  req: Request<R>,
  res: Response<{ error: string }, UserRecord>,
  next: NextFunction
) => {
  if (
    res.locals.unauthenticated ||
    typeof res.locals.user?.userID === 'undefined'
  )
    return res.status(403).json({ error: 'Not authenticated' })
  next()
}

export const requireAuthenticatedAsAdmin = <R>(
  req: Request<R>,
  res: Response<{ error: string }, UserRecord>,
  next: NextFunction
) => {
  if (
    res.locals.unauthenticated ||
    typeof res.locals.user?.userID === 'undefined' ||
    res.locals.user?.rank !== UserRank.Administrator
  )
    return res.status(403).json({ error: 'Not authenticated' })
  next()
}
