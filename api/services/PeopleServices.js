const Services = require('./Services')
const database = require('../models')

class PeopleServices extends Services {
  constructor() {
    super('Pessoas'),
      this.matriculas = new Services('Matriculas')
  }
  async getActiveRecords(where = {}) {
    return database[this.modelName].findAll({ where: { ...where } });
  }
  async getAllRecords(where = {}) {
    return database[this.modelName]
      .scope('todos')
      .findAll({ where: { ...where } });
  }

  async inactivatePeopleAndRegistration(studentId) {
    return database.sequelize.transaction(async t => {
      await super.putRecord({ ativo: false }, studentId, { transaction: t });
      await super.putRecords({ status: 'cancelado' }, { estudante_id: studentId }, { transaction: t })
    })
  }
}

module.exports = PeopleServices