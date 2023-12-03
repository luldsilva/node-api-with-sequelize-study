const Sequelize = require('sequelize');
const { RegistrationServices } = require('../services');
const registrationServices = new RegistrationServices();

class RegistrationServices {
  static async getRegistration(req, res) {
    const { studentId, registrationId } = req.params;
    try {
      const oneRegistration = await registrationServices.getRegistration({ id: registrationId, estudante_id: studentId })
      return res.status(200).json(oneRegistration);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }
}