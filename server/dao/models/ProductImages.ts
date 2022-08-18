import { ProductImages } from 'pickgood-types'
import { DataTypes, Model } from 'sequelize'

import sequelize from '../../state/sequelize'

class ProductImagesModel extends Model implements ProductImages<number> {
  declare productID: number
  declare imgURL: string
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
  },
  { sequelize, modelName: 'ProductImages' }
)

export default ProductImagesModel
