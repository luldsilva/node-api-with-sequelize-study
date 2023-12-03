const Services = require('../services/Services')
const levelsServices = new Services('Niveis')
class NivelController {

  static async pegaTodosOsNiveis(req, res) {
    try {
      const todosOsNiveis = await levelsServices.getAllRecords()
      return res.status(200).json(todosOsNiveis)
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }
}