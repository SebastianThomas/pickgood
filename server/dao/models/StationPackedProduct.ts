import { StationPackedProduct } from 'pickgood-types'
import { StationNameType } from 'pickgood-types/lib/stations/Station'
import { Association, DataTypes, Model, NonAttribute } from 'sequelize'
import sequelize from '../../state/sequelize'
import Invoice from './Invoice'
import Product from './Product'
import Station from './Station'

class StationPackedProductModel
  extends Model
  implements StationPackedProduct<number>
{
  declare productID: number
  declare invoiceID: number
  declare stationName: StationNameType
  declare userID: number
  declare quantity: number

  declare product: NonAttribute<Product>
  declare invoice: NonAttribute<Invoice>
  declare station: NonAttribute<Station>

  declare static associations: {
    product: Association<StationPackedProductModel, Product>
    invoice: Association<StationPackedProductModel, Invoice>
    station: Association<StationPackedProductModel, Station>
  }
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
