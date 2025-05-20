'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Transaction.hasMany(models.TransactionDetail, { foreignKey: 'transaction_id' });
      Transaction.hasMany(models.TransactionParties, { foreignKey: 'transaction_id' });
    }
  }
  Transaction.init({
    order_id: DataTypes.STRING,
    order_finished_date: DataTypes.STRING,
    order_finished_time: DataTypes.STRING,
    type_transaction: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Transaction',
  });
  return Transaction;
};