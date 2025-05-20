'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TransactionDetail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      TransactionDetail.belongsTo(models.Transaction, { foreignKey: 'transaction_id' });
      TransactionDetail.belongsTo(models.Category, { foreignKey: 'category_id' });
      TransactionDetail.belongsTo(models.SubCategory, { foreignKey: 'sub_category_id' });
    }
  }
  TransactionDetail.init({
    transaction_id: DataTypes.INTEGER,
    category_id: DataTypes.INTEGER,
    sub_category_id: DataTypes.INTEGER,
    grade: DataTypes.STRING,
    price: DataTypes.FLOAT,
    quantity: DataTypes.INTEGER,
    total: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'TransactionDetail',
  });
  return TransactionDetail;
};