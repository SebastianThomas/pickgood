import { PackingInvoice } from 'pickgood-types'
import { StationNameType } from 'pickgood-types/lib/stations/Station'
import { Association, DataTypes, Model, NonAttribute } from 'sequelize'
import sequelize from '../../state/sequelize'
import Invoice from './Invoice'

const packingInvoiceStatus = <const>[
  'Pending',
  'QueuedAtStation',
  'PackingAtStation',
  'Question',
  'ProblemOrQuestion',
]

type InvoiceStatusPossibilitiesType = typeof packingInvoiceStatus
type InvoiceStatusType = typeof packingInvoiceStatus[number]

class PackingInvoiceModel
  extends Model
  implements PackingInvoice<number, InvoiceStatusPossibilitiesType>
{
  declare invoiceID: number
  declare currentStation: StationNameType
  declare packingStatus: InvoiceStatusType

  declare invoice: NonAttribute<Invoice>
  declare static associations: {
    invoice: Association<PackingInvoiceModel, Invoice>
  }
}
PackingInvoiceModel.init(
  {
    invoiceID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    currentStation: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    packingStatus: {
      type: DataTypes.ENUM(...packingInvoiceStatus),
      allowNull: false,
    },
  },
  { sequelize, modelName: 'PackingInvoice' }
)

export default PackingInvoiceModel
