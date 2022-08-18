import StationModel from './models/Station'
import UserModel from './models/User'
import ProductModel from './models/Product'
import ProductImagesModel from './models/ProductImages'
import ProductAtStationModel from './models/ProductAtStation'
import PackingInvoiceModel from './models/PackingInvoice'
import InvoiceModel from './models/Invoice'
import StationPackedProductModel from './models/StationPackedProduct'

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

  // User many - one station
  StationModel.hasMany(UserModel, {
    foreignKey: {
      name: 'stationName',
      allowNull: false,
    },
  })
}
