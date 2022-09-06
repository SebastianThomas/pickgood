import StationModel from './models/Station'
import UserModel from './models/User'
import ProductModel from './models/Product'
import ProductImagesModel from './models/ProductImages'
import ProductAtStationModel from './models/ProductAtStation'
import PackingInvoiceModel from './models/PackingInvoice'
import InvoiceModel from './models/Invoice'
import StationPackedProductModel from './models/StationPackedProduct'
import RefreshTokenModel from './models/RefreshToken'
import InvoiceHasProductModel from './models/InvoiceHasProduct'
import BillbeeProductModel from './models/BillbeeProduct'
import BillbeeOrderModel from './models/BillbeeOrder'
import BillbeeOrderItemModel from './models/BillbeeOrderItem'
import BillbeeAttributeModel, {
  BillbeeAttributeBelongsToOrderItemModel,
} from './models/BillbeeAttribute'

export default () => {
  ProductAtStationModel.belongsTo(StationModel, {
    foreignKey: 's_name',
  })

  ProductAtStationModel.belongsTo(ProductModel, {
    foreignKey: 'productID',
  })

  ProductImagesModel.belongsTo(ProductModel, {
    foreignKey: {
      name: 'productID',
    },
  })

  PackingInvoiceModel.belongsTo(InvoiceModel, {
    foreignKey: 'invoiceID',
  })

  PackingInvoiceModel.belongsTo(StationModel, {
    foreignKey: 'currentStation',
  })

  StationPackedProductModel.belongsTo(InvoiceModel, {
    foreignKey: 'invoiceID',
  })

  StationPackedProductModel.belongsTo(ProductModel, {
    foreignKey: 'productID',
  })

  StationPackedProductModel.belongsTo(StationModel, {
    foreignKey: 's_name',
  })

  StationPackedProductModel.belongsTo(UserModel, {
    foreignKey: 'userID',
  })

  ProductModel.belongsToMany(InvoiceModel, { through: InvoiceHasProductModel })
  InvoiceModel.belongsToMany(ProductModel, { through: InvoiceHasProductModel })

  ProductModel.belongsTo(BillbeeProductModel, {
    foreignKey: 'billbeeProductID',
  })
  BillbeeProductModel.hasOne(ProductModel, {
    foreignKey: 'billbeeProductID',
  })

  BillbeeOrderItemModel.belongsTo(BillbeeOrderModel, {
    foreignKey: 'BillBeeOrderId',
  })
  BillbeeOrderModel.hasMany(BillbeeOrderItemModel, {
    foreignKey: 'BillBeeOrderId',
  })

  BillbeeOrderItemModel.belongsTo(BillbeeProductModel, {
    foreignKey: 'productId',
  })
  BillbeeProductModel.hasOne(BillbeeOrderItemModel, {
    foreignKey: 'productId',
  })

  BillbeeOrderItemModel.belongsToMany(BillbeeAttributeModel, {
    through: BillbeeAttributeBelongsToOrderItemModel,
  })
  BillbeeAttributeModel.belongsToMany(BillbeeOrderItemModel, {
    through: BillbeeAttributeBelongsToOrderItemModel,
  })

  // User many - one station
  StationModel.hasMany(UserModel, {
    foreignKey: {
      name: 'stationName',
      allowNull: false,
    },
  })

  RefreshTokenModel.belongsTo(UserModel, {
    foreignKey: 'userID',
  })
}
