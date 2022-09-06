import {
  BillbeeAttributeType,
  BillbeeOrderItemType,
  BillbeeProductType,
} from 'pickgood-types'
import { Association, DataTypes, Model } from 'sequelize'
import sequelize from '../../state/sequelize'
import BillbeeAttributeModel from './BillbeeAttribute'
import BillbeeProductModel from './BillbeeProduct'

class BillbeeOrderItemModel extends Model implements BillbeeOrderItemType {
  declare BillBeeOrderId: number
  declare BillbeeId: number
  declare TransactionId: string
  declare Quantity: number
  declare TotalPrice: number
  declare TaxAmount: number
  declare TaxIndex: number
  declare Discount: number
  declare GetPriceFromArticleIfAny: boolean
  declare IsCoupon: boolean
  declare ShippingProfileId: string
  declare DontAdjustStock: boolean
  declare UnrebatedTotalPrice: number
  declare SerialNumber: string
  declare InvoiceSKU: string

  declare productId: number

  declare Product: BillbeeProductType
  declare Attributes: BillbeeAttributeType[]
  declare static associations: {
    Product: Association<BillbeeOrderItemModel, BillbeeProductModel>
    Attributes: Association<BillbeeOrderItemModel, BillbeeAttributeModel>
  }
}
BillbeeOrderItemModel.init(
  {
    BillBeeOrderId: { type: DataTypes.INTEGER, allowNull: false },
    BillbeeId: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true },
    TransactionId: { type: DataTypes.STRING, allowNull: true },
    Quantity: { type: DataTypes.INTEGER, allowNull: true },
    TotalPrice: { type: DataTypes.INTEGER, allowNull: true },
    TaxAmount: { type: DataTypes.INTEGER, allowNull: true },
    TaxIndex: { type: DataTypes.INTEGER, allowNull: true },
    Discount: { type: DataTypes.INTEGER, allowNull: true },
    GetPriceFromArticleIfAny: { type: DataTypes.BOOLEAN, allowNull: true },
    IsCoupon: { type: DataTypes.BOOLEAN, allowNull: true },
    ShippingProfileId: { type: DataTypes.STRING, allowNull: true },
    DontAdjustStock: { type: DataTypes.BOOLEAN, allowNull: true },
    UnrebatedTotalPrice: { type: DataTypes.INTEGER, allowNull: true },
    SerialNumber: { type: DataTypes.STRING, allowNull: true },
    InvoiceSKU: { type: DataTypes.STRING, allowNull: true },
    productId: { type: DataTypes.INTEGER, allowNull: false },
  },
  { sequelize, modelName: 'BillbeeOrderItem' }
)

export default BillbeeOrderItemModel
