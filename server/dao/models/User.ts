import { DataTypes, Model } from 'sequelize'

import { User, Station } from 'pickgood-types'
import { StationNameType } from 'pickgood-types/lib/stations/Station'

import sequelize from '../../state/sequelize'
import StationModel from './Station'

export type UserAtStation = User<number> & {
  station: Station
}

class UserModel extends Model implements User<number> {
  declare userID: number
  declare firstName: string
  declare lastName: string
  declare stationName: StationNameType | null

  static async getUserAtStation(userId: number): Promise<UserAtStation | null> {
    const user = await this.findOne({
      where: { userID: userId },
    })
    if (user === null) return null

    const station = await StationModel.findOne({
      where: { name: user.stationName },
    })
    if (station === null) return null

    return {
      ...user,
      station,
    }
  }
}
UserModel.init(
  {
    userID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { sequelize, modelName: 'User' }
)

export default UserModel
