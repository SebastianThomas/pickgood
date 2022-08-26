import { Station } from 'pickgood-types'
import { DataTypes, Model } from 'sequelize'
import sequelize from '../../state/sequelize'

export class StationModel extends Model implements Station {
  declare name: string
  declare description: string
}
StationModel.init(
  {
    name: { type: DataTypes.STRING, primaryKey: true, allowNull: false },
    description: { type: DataTypes.TEXT, allowNull: false },
  },
  { sequelize, modelName: 'Station' }
)

export default StationModel

// Init default station
StationModel.findByPk('NULL').then(async (station: StationModel | null) => {
  if (station === null)
    station = await StationModel.create({
      name: 'NULL',
      description:
        'Default station meaning that the user is currently not assigned to any station.',
    })
})
