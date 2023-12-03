const database = require('../models')
class Services {
  constructor(modelName) {
    this.modelName = modelName;
  }
  async getAllRecords() {
    return database[this.modelName].findAll({ where: { ...where } });
  }

  async getOneRecord(where = {}) {
    return database[this.modelName].findOne({ where: { ...where } });
  }

  async createRecord(data) {
    return database[this.modelName].create(data);
  }

  async putRecord(data, id, transaction = {}) {
    return database[this.modelName]
      .update(data, { where: { id: id } }, transaction)
  }

  async putRecords(data, id, transaction = {}) {
    return database[this.modelName]
      .update(data, { where: { ...where } }, transaction)
  }

  async deleteRecord(id) {
    return database[this.modelName].destroy({ where: { id: Number(id) } });
  }
}

module.exports = Services