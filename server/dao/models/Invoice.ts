import {
  Invoice,
  InvoiceStatusPossibilitiesType,
  InvoiceStatusType,
} from 'pickgood-types'
import { invoiceStatus } from 'pickgood-types/lib/invoices/Invoice'
import { DataTypes, Model } from 'sequelize'
import sequelize from '../../state/sequelize'
import Product from './Product'

class InvoiceModel
  extends Model
  implements Invoice<number, InvoiceStatusPossibilitiesType>
{
  declare invoiceID: number
  declare status: InvoiceStatusType

  declare products: Product[] // TODO: Verify this actually exists
}
InvoiceModel.init(
  {
    invoiceID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    status: {
      type: DataTypes.ENUM(...invoiceStatus),
      allowNull: false,
    },
  },
  { sequelize, modelName: 'Invoice' }
)

export default InvoiceModel
