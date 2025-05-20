'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TransactionParties extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      TransactionParties.belongsTo(models.Transaction, { foreignKey: 'transaction_id' });
    }
  }
  TransactionParties.init({
    transaction_id: DataTypes.INTEGER,
    type: DataTypes.STRING,
    role_name: DataTypes.STRING,
    name: DataTypes.STRING,
    parties_id: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'TransactionParties',
  });
  return TransactionParties;
};