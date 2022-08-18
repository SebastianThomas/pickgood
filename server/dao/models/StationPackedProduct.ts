import { StationPackedProduct } from 'pickgood-types'
import { StationNameType } from 'pickgood-types/lib/stations/Station'
import { DataTypes, Model } from 'sequelize'
import sequelize from '../../state/sequelize'

class StationPackedProductModel
  extends Model
  implements StationPackedProduct<number>
{
  declare productID: number
  declare invoiceID: number
  declare stationName: StationNameType
  declare userID: number
  declare quantity: number
}
StationPackedProductModel.init(
  {
    productID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: false,
      primaryKey: true,
    },
    invoiceID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: false,
      primaryKey: true,
    },
    s_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userID: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  { sequelize, modelName: 'StationPackedProduct', freezeTableName: true }
)

export default StationPackedProductModel
