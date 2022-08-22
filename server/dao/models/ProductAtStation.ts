import { ProductAtStation } from 'pickgood-types'
import { StationNameType } from 'pickgood-types/lib/stations/Station'
import { Association, DataTypes, Model, NonAttribute } from 'sequelize'
import sequelize from '../../state/sequelize'
import ProductModel from './Product'
import StationModel from './Station'

/**
 * Model to keep track of a single product that is being packed at a specific station.
 */
class ProductAtStationModel extends Model implements ProductAtStation<number> {
  declare stationName: StationNameType
  declare productID: number
  declare lastPacked: Date
  declare countPacked: number

  declare product: NonAttribute<ProductModel>
  declare station: NonAttribute<StationModel>

  declare static associations: {
    product: Association<ProductAtStationModel, ProductModel>
    station: Association<ProductAtStationModel, StationModel>
  }
}
ProductAtStationModel.init(
  {
    stationName: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    productID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: false,
      primaryKey: true,
    },
    lastPacked: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    countPacked: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0, // TODO: Verify the number is default in the DB and not a string '0'
    },
  },
  { sequelize, modelName: 'ProductAtStation' }
)

export default ProductAtStationModel
