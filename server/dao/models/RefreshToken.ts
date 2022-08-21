import { v4 as uuid } from 'uuid'
import { RefreshTokenType } from 'pickgood-types'

import { DataTypes, Model } from 'sequelize'

import { getHashFromIntID, getIntIDFromHash } from '../../util/dbutils'
import sequelize from '../../state/sequelize'

class RefreshTokenModel extends Model implements RefreshTokenType<string> {
  declare token: string
  declare userID: string
  declare expiryDate: Date

  /**
   *
   * @param user The user (with an `id`-field) to create the user for
   * @returns The new Refresh Token object
   */
  static async createAndSaveToken(user: { id: string }) {
    const expiresInRefreshToken: number =
      Number(process.env.EXPIRES_IN_REFRESH_TOKEN) || 60 * 60 * 24

    const expiredAt = new Date()
    expiredAt.setSeconds(expiredAt.getSeconds() + expiresInRefreshToken)
    const token: string = uuid()
    const userID: string = user.id
    const expiryDate: Date = new Date(expiredAt.getTime())

    return await RefreshTokenModel.create({
      token,
      userID,
      expiryDate,
    })
  }

  /**
   * Check if the token has expired
   * @param token token to perform check on
   * @returns true if the token has expired, otherwise false
   */
  static verifyExpiration(token: RefreshTokenModel) {
    return token.expiryDate.getTime() < new Date().getTime()
  }
}
RefreshTokenModel.init(
  {
    token: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },
    userID: {
      type: DataTypes.INTEGER,
      set(value: string) {
        this.setDataValue('userID', getIntIDFromHash(value))
      },
      get(): string {
        return getHashFromIntID(this.getDataValue('userID'))
      },
      allowNull: false,
    },
    expiryDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  { sequelize, modelName: 'RefreshToken' }
)

export default RefreshTokenModel
