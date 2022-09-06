import { BillbeeAttributeType } from 'pickgood-types'
import { DataTypes, Model } from 'sequelize'
import sequelize from '../../state/sequelize'

class BillbeeAttributeModel extends Model implements BillbeeAttributeType {
  declare Id: string
  declare Name: string
  declare Value: string
  declare Price: number
}
BillbeeAttributeModel.init(
  {
    Id: { type: DataTypes.STRING, allowNull: false, primaryKey: true },
    Name: { type: DataTypes.STRING, allowNull: true },
    Value: { type: DataTypes.STRING, allowNull: true },
    Price: { type: DataTypes.INTEGER, allowNull: true },
  },
  { sequelize, modelName: 'BillbeeAttribute' }
)

export default BillbeeAttributeModel

class BillbeeAttributeBelongsToOrderItemModel extends Model {
  declare BillbeeOrderItemBillbeeId: number
  declare BillbeeAttributeId: string
}
BillbeeAttributeBelongsToOrderItemModel.init(
  {},
  {
    sequelize,
    modelName: 'BillbeeAttributeBelongsToOrderItem',
    freezeTableName: true,
  }
)
export { BillbeeAttributeBelongsToOrderItemModel }
