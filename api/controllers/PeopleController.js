const database = require('../models')

class PersonController {
  static async getAllPeople(req, res) {
    try {
      const allPeople = await database.Pessoas.findAll();
      return res.status(200).json(allPeople);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async getPeople(req, res) {
    const { id } = req.params;
    try {
      const person = await database.Pessoas.findOne({
        where: {
          id: Number(id)
        }
      })
      return res.status(200).json(person);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async createPeople(req, res) {
    const newPeople = req.body;
    try {
      const newPeopleCreated = await database.Pessoas.create(newPeople);
      return res.status(201).json(newPeopleCreated);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async putPeople(req, res) {
    const { id } = req.params;
    const newInfos = req.body;
    try {
      await database.Pessoas.update(newInfos, { where: { id: Number(id) } });
      const updatedPeople = await database.Pessoas.findOne({ where: { id: Number(id) } });
      return res.status(200).json(updatedPeople);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async deletePeople(req, res) {
    const { id } = req.params;
    try {
      await database.Pessoas.destroy({ where: { id: Number(id) } });
      return res.status(200).json({ mensagem: `id ${id} deletado.` });
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }
}

module.exports = PersonController