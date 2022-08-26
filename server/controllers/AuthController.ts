import User from '../dao/models/User'
import jwt from 'jsonwebtoken'
import RefreshToken from '../dao/models/RefreshToken'

/**
 * Performs a sign in for a user:
 * - save a new refresh token to DB
 * - return that refresh and a newly generated access token (JWT)
 *
 * Checks whether the user exists.
 * @param firstName the firstname input by the user
 * @param lastName the lastname input by the user
 * @param password the password input by the user
 * @returns All information for the user to be sent to client (refresh and access token as well as some information)
 *
 * @throws Error with param `statusCode = 403` if user does not exists (username not found) or the password is incorrect
 */
export const performSignin = async (
  firstName: string,
  lastName: string,
  password: string
) => {
  try {
    const user = await User.findOne({
      where: {
        firstName,
        lastName,
      },
    })

    if (user === null) {
      const err: any = new Error(`Password or username is wrong!`)
      err.statusCode = '403'
      throw err
    }

    if (!(await User.comparePwd(password, user.password))) {
      throw new Error(`Password or username is wrong!`)
    }
    const uid = user.userID
    console.log(`UID: ${uid}`)
    const accessToken = genAccessToken(uid)
    console.log(`AccessToken: ${accessToken}`)
    const refreshToken = await RefreshToken.createAndSaveToken({ id: uid })

    return {
      refreshToken,
      accessToken,
      userInfo: user,
    }
  } catch (err) {
    console.log(err)
    const error: any = new Error(`Password or username is wrong!`)
    error.statusCode = '404'
    throw error
  }
}

/**
 * Refresh the access token for the current user.
 * @param reqToken The refresh token sent with the request
 * @returns A new access token
 * @throws Error with `statusCode = 403` if the refresh token is invalid
 */
export const refreshAccessToken = async (reqToken: string) => {
  try {
    // Find Refresh Token and validate it
    let refreshToken = await RefreshToken.findByPk(reqToken)
    if (!refreshToken) {
      const err: any = new Error(`Refresh token not valid`)
      err.statusCode = '403'
      throw err
    }
    if (RefreshToken.verifyExpiration(refreshToken)) {
      refreshToken.destroy()

      const err: any = new Error(`Refresh token not valid`)
      err.statusCode = '403'
      throw err
    }

    // Sign new token
    let newAccessToken = genAccessToken(refreshToken.userID)
    return {
      accessToken: newAccessToken,
      refreshToken: refreshToken.token,
      tokenObject: refreshToken,
    }
  } catch (err) {
    throw new Error('Something failed on server, please try again.')
  }
}

/**
 * Generate a new JWT (Access Token) for a user
 * @param userId the user id to generate token with and for
 * @returns The new JWT
 */
const genAccessToken = (userId: string) => {
  const accessTokenJWTSecret = process.env.ACCESS_TOKEN_JWT_SECRET || 'Default'
  const expiresInAccessToken =
    Number(process.env.EXPIRES_IN_ACCESS_TOKEN) || 60 * 60 * 1000

  return jwt.sign({ id: userId }, accessTokenJWTSecret, {
    expiresIn: expiresInAccessToken,
  })
}
