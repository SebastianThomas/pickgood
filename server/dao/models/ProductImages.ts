import { BillbeeImageType, ProductImages } from 'pickgood-types'
import { DataTypes, Model } from 'sequelize'

import sequelize from '../../state/sequelize'

class ProductImagesModel
  extends Model
  implements ProductImages<number>, BillbeeImageType
{
  declare productID: number
  declare imgURL: string
  declare Url: string
  declare Position: number
  declare IsDefaultImage: boolean
  declare ExternalId: string
}
ProductImagesModel.init(
  {
    productID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: false,
    },
    imgURL: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    // From Billbee:
    IsDefaultImage: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    Position: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    ExternalId: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  { sequelize, modelName: 'ProductImages' }
)

export default ProductImagesModel
