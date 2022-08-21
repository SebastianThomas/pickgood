import express from 'express'
import { body, validationResult } from 'express-validator'
import User from '../dao/models/User'
import { UserRecord } from '../types/UserRecord'
import { requireAuthenticated } from '../middleware/authMiddleware'

export const validateResult = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }
  return next()
}

const router = express.Router()

router.get(
  '/',
  requireAuthenticated,
  (_req: express.Request, res: express.Response<{}, UserRecord>) => {
    res.status(200).json({
      ok: true,
      user: res.locals.user,
    })
  }
)

router.get(
  '/:id',
  async (req: express.Request<{ id: string }>, res: express.Response) => {
    const user = await User.findById(req.params.id)
    return user
      ? res.status(200).json({
          user,
        })
      : res.status(404).json({ error: 'User not found' })
  }
)

/**
 * POST /api/users
 * Create a new user
 */
router.post(
  '/',
  // Use express-validator middleware functions
  // to validate the request body
  body('password').trim().isLength({ min: 8 }),
  body('firstName').trim().isLength({ min: 1 }),
  body('lastName').trim().isLength({ min: 1 }),
  validateResult,
  async (req: express.Request, res: express.Response<{}, UserRecord>) => {
    const { password, firstName, lastName } = req.body
    try {
      const newPassword = await User.hashPwd(password)

      const newUser = await User.create({
        firstName,
        lastName,
        password: newPassword,
      })

      return res.status(201).json({ ok: true, id: newUser.userID })
    } catch (err) {
      return res.status(400).json({ error: 'User could not be inserted.' })
    }
  }
)

/**
 * Update password for current user.
 */
router.put(
  '/password',
  body('password').trim().isLength({ min: 8 }),
  body('passwordCtrl').trim().isLength({ min: 8 }),
  validateResult,
  async (req, res: express.Response<{}, UserRecord>) => {
    const user = res.locals.user
    if (typeof user === 'undefined' || user === null)
      return res.status(403).json({ error: 'User is not authenticated!' })
    const { password, passwordCtrl } = req.body
    if (!password || !passwordCtrl || password === passwordCtrl)
      return res.status(400).json({ error: 'The passwords must match!' })

    const affectedRows = await User.updatePwd(user, password)
    return res.status(200).json({ msg: 'Update complete', affectedRows })
  }
)

export default router
