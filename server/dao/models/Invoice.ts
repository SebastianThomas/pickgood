import { Invoice } from 'pickgood-types'
import { DataTypes, Model } from 'sequelize'
import sequelize from '../../state/sequelize'

const invoiceStatus = <const>[
  'Ordered',
  'Payed',
  'Packing',
  'Sent',
  'Completed',

  'PaymentReminder',
  'ProblemOrQuestion',
  'PendingClientAnswer',
  'PendingProductDelivery',
]

type InvoiceStatusPossibilitiesType = typeof invoiceStatus
type InvoiceStatusType = typeof invoiceStatus[number]

class InvoiceModel
  extends Model
  implements Invoice<number, InvoiceStatusPossibilitiesType>
{
  declare invoiceID: number
  declare status: InvoiceStatusType
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
