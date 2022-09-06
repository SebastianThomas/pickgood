import {
  BillbeeAddressType,
  BillbeeCommentType,
  BillbeeCustomerType,
  BillbeeHistoryEventType,
  BillbeeOrderItemType,
  BillbeeOrderType,
  BillbeePaymentType,
  BillbeeShippingIDType,
  BillbeeShippingServiceType,
  BillbeeShopInfoType,
} from 'pickgood-types'
import { Association, DataTypes, Model } from 'sequelize'
import sequelize from '../../state/sequelize'
import BillbeeOrderItem from './BillbeeOrderItem'

class BillbeeOrderModel extends Model implements BillbeeOrderType {
  declare RebateDifference: number
  declare AcceptLossOfReturnRight: boolean
  /**
   * ID of the order; might be null
   */
  declare Id: string
  declare OrderNumber: string
  declare State: number
  declare VatMode: number
  declare CreatedAt: Date
  declare ShippedAt: Date
  declare ConfirmedAt: Date
  declare PayedAt: Date
  declare SellerComment: string
  declare InvoiceNumberPrefix: string
  declare InvoiceNumberPostfix: string
  declare InvoiceNumber: number
  declare InvoiceDate: Date
  declare PaymentMethod: number
  declare ShippingCost: number
  declare TotalCost: number
  declare AdjustmentCost: number
  declare AdjustmentReason: string
  declare Currency: string
  declare UpdatedAt: Date
  declare TaxRate1: number
  declare TaxRate2: number
  /**
   * Billbee's internal Order ID, PK.
   */
  declare BillBeeOrderId: number
  declare BillBeeParentOrderId: number
  declare VatId: string
  declare ShipWeightKg: number
  declare LanguageCode: string
  declare PaidAmount: number
  declare ShippingProfileId: string
  declare ShippingProviderId: number
  declare ShippingProviderProductId: number
  declare ShippingProviderName: string
  declare ShippingProviderProductName: string
  declare ShippingProfileName: string
  declare PaymentInstruction: string
  declare IsCancelationFor: string
  declare PaymentTransactionId: string
  declare DistributionCenter: string
  declare DeliverySourceCountryCode: string
  declare CustomInvoiceNote: string
  declare CustomerNumber: string
  declare PaymentReference: string
  declare LastModifiedAt: Date
  declare ApiAccountId: number
  declare ApiAccountName: string
  declare MerchantVatId: string
  declare CustomerVatId: string
  declare IsFromBillbeeApi: true

  declare Tags: string[]
  declare ShippingIds: BillbeeShippingIDType[]
  declare Comments: BillbeeCommentType[]
  declare InvoiceAddress: BillbeeAddressType
  declare Seller: BillbeeShopInfoType
  declare ShippingAddress: BillbeeAddressType
  declare OrderItems: BillbeeOrderItemType[]
  declare Buyer: BillbeeShopInfoType
  declare ShippingServices: BillbeeShippingServiceType[]
  declare Customer: BillbeeCustomerType
  declare History: BillbeeHistoryEventType[]
  declare Payments: BillbeePaymentType[]

  declare static associations: {
    OrderItems: Association<BillbeeOrderModel, BillbeeOrderItem>
  }
}

BillbeeOrderModel.init(
  {
    RebateDifference: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    AcceptLossOfReturnRight: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    Id: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    OrderNumber: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    State: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    VatMode: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    CreatedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    ShippedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    ConfirmedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    PayedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    SellerComment: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    InvoiceNumberPrefix: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    InvoiceNumberPostfix: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    InvoiceNumber: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    InvoiceDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    PaymentMethod: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    ShippingCost: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    TotalCost: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    AdjustmentCost: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    AdjustmentReason: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    Currency: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    UpdatedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    TaxRate1: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    TaxRate2: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },

    BillBeeOrderId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    BillBeeParentOrderId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    VatId: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    ShipWeightKg: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    LanguageCode: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    PaidAmount: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    ShippingProfileId: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    ShippingProviderId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    ShippingProviderProductId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    ShippingProviderName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    ShippingProviderProductName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    ShippingProfileName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    PaymentInstruction: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    IsCancelationFor: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    PaymentTransactionId: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    DistributionCenter: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    DeliverySourceCountryCode: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    CustomInvoiceNote: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    CustomerNumber: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    PaymentReference: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    LastModifiedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    ApiAccountId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    ApiAccountName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    MerchantVatId: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    CustomerVatId: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    IsFromBillbeeApi: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  { sequelize, modelName: 'BillbeeOrder', timestamps: false }
)
export default BillbeeOrderModel
