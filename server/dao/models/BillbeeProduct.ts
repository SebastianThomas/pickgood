import { BillbeeImageType, BillbeeProductType } from 'pickgood-types'
import { Association, DataTypes, Model } from 'sequelize'
import sequelize from '../../state/sequelize'
import ProductImages from './ProductImages'

class BillbeeProductModel extends Model implements BillbeeProductType {
  declare OldId: string
  declare Id: string
  declare Title: string
  declare Weight: number
  declare SKU: string
  declare SkuOrId: string
  declare IsDigital: boolean
  declare EAN: string
  declare PlatformData: string
  declare TARICCode: string
  declare CountryOfOrigin: string
  declare BillbeeId: number

  declare Images: ProductImages[]

  declare static associations: {
    Images: Association<BillbeeProductModel, ProductImages>
  }
}
BillbeeProductModel.init(
  {
    OldId: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    Id: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    Title: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    Weight: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    SKU: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    SkuOrId: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    IsDigital: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    EAN: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    PlatformData: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    TARICCode: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    CountryOfOrigin: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    BillbeeId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      primaryKey: true,
    },
  },
  { sequelize, modelName: 'BillbeeProduct' }
)

export default BillbeeProductModel
