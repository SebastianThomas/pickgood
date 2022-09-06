import { ProductType } from 'pickgood-types'
import { Association, DataTypes, Model, NonAttribute } from 'sequelize'
import sequelize from '../../state/sequelize'
import ProductImages from './ProductImages'

class ProductModel extends Model implements ProductType {
  declare productID: number
  declare billbeeProductID: number

  declare title: string
  declare description: string
  declare price: string

  declare in_stock: number
  declare ordered: number
  declare available: number
  declare last_ordered: string
  declare last_stock_control: string

  declare images?: NonAttribute<string[]>

  declare static associations: {
    images: Association<ProductModel, ProductImages>
  }

  static async getGeneralInformation(): Promise<{ totalProductCount: number }> {
    const totalProductCount = await ProductModel.count()

    return { totalProductCount }
  }
}
ProductModel.init(
  {
    productID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    billbeeProductID: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      defaultValue: '',
    },
    price: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    in_stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    ordered: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    available: {
      type: DataTypes.VIRTUAL,
      get() {
        return this.in_stock - this.ordered
      },
    },
    last_ordered: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    last_stock_control: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  { sequelize, modelName: 'Product' }
)

export default ProductModel
export { ProductType }
