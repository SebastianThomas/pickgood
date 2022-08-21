import { DataTypes, Model } from 'sequelize'

import { User, Station } from 'pickgood-types'
import { StationNameType } from 'pickgood-types/lib/stations/Station'

import bcrypt from 'bcrypt'

import sequelize from '../../state/sequelize'
import StationModel from './Station'
import { getHashFromIntID, getIntIDFromHash } from '../../util/dbutils'
import config from '../../state/configuration'

export type UserAtStation = User<string> & {
  station: Station
}

const saltRounds = config.auth.saltRounds

class UserModel extends Model implements User<string> {
  declare userID: string
  declare firstName: string
  declare lastName: string
  declare password: string
  declare stationName: StationNameType | null

  static async findById(id: string): Promise<UserModel | null> {
    return await UserModel.findByPk(Number(getIntIDFromHash(id)))
  }

  static async getUserAtStation(userId: string): Promise<UserAtStation | null> {
    const user = await this.findOne({
      where: { userID: userId },
    })
    if (user === null) return null
    // Build to use native sequelize
    const station = await StationModel.findOne({
      where: { name: user.stationName },
    })
    if (station === null) return null

    return {
      ...user,
      station,
    }
  }

  /**
   * Compare two passwords (text and hash) and return the result.
   * @param plainPwd The clear text input password from client
   * @param hashedPwd The has to validate the password against
   * @returns A promise resolving when the password has been compared; boolean indicating whether the password is correct (true) or not (false)
   * @throws an error if the compare cannot be performed
   */
  static comparePwd(plainPwd: string, hashedPwd: string): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      bcrypt.compare(plainPwd, hashedPwd, (err: any, result: boolean) => {
        if (err) {
          return reject(err)
        }

        return resolve(result)
      })
    })
  }

  /**
   * Hash a password with [bcrypt](https://www.npmjs.com/package/bcrypt).
   * @param pwd The password to hash
   * @returns Hash of the password
   */
  static hashPwd(pwd: string): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      bcrypt.genSalt(saltRounds, (err: Error | undefined, salt: string) => {
        if (err) {
          return reject(err)
        }
        bcrypt.hash(pwd, salt, (err: any, hash: string) => {
          if (err) {
            return reject(err)
          }
          return resolve(hash)
        })
      })
    })
  }

  static async updatePwd(user: UserModel, newPwd: string): Promise<UserModel> {
    return await user.update({ password: UserModel.hashPwd(newPwd) })
  }
}
UserModel.init(
  {
    userID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      get(): string {
        return getHashFromIntID(this.getDataValue('userID'))
      },
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { sequelize, modelName: 'User' }
)

export default UserModel
