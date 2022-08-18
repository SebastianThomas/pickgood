import { PackingInvoice } from 'pickgood-types'
import { StationNameType } from 'pickgood-types/lib/stations/Station'
import { DataTypes, Model } from 'sequelize'
import sequelize from '../../state/sequelize'

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
