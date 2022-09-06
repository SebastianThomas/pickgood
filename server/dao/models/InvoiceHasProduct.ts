import { DataTypes, ForeignKey, Model } from 'sequelize'
import sequelize from '../../state/sequelize'
import InvoiceModel from './Invoice'
import ProductModel from './Product'

class InvoiceHasProductModel extends Model {
  declare invoiceID: ForeignKey<InvoiceModel['invoiceID']>
  declare productID: ForeignKey<ProductModel['productID']>
}
InvoiceHasProductModel.init(
  {
    invoiceID: {
      type: DataTypes.INTEGER,
      references: {
        model: InvoiceModel,
        key: 'invoiceID',
      },
    },
    productID: {
      type: DataTypes.INTEGER,
      references: {
        model: ProductModel,
        key: 'productID',
      },
    },
  },
  { sequelize, modelName: 'InvoiceHasProduct' }
)

export default InvoiceHasProductModel
