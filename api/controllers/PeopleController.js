const { Sequelize } = require('sequelize');
const database = require('../models')
const { PeopleServices } = require('../services')
const peopleServices = new PeopleServices()

class PersonController {
  static async getAllActivePeople(req, res) {
    try {
      const allActivePeople = await peopleServices.getActiveRecords()
      return res.status(200).json(allActivePeople);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async getAllPeople(req, res) {
    try {
      const allActivePeople = await peopleServices.getAllRecords();
      return res.status(200).json(allActivePeople);
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

  static async restorePeople(req, res) {
    const { id } = req.params
    try {
      await database.Pessoas.restore({ where: { id: Number(id) } })
      return res.status(200).json({ mensagem: `id ${id} restaurado.` })
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }

  static async getOneRegistration(req, res) {
    const { estudanteId, matriculaId } = req.params;
    try {
      const matricula = await database.Matriculas.findOne({
        where: {
          id: Number(matriculaId),
          estudante_id: Number(estudanteId)
        }
      })
      return res.status(200).json(matricula);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async createRegistration(req, res) {
    const { estudanteId } = req.params;
    const novaMatricula = { ...req.body, estudante_id: Number(estudanteId) };
    try {
      const novaMatriculaCriada = await database.Matriculas.create(novaMatricula);
      return res.status(201).json(novaMatriculaCriada);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async putRegistration(req, res) {
    const { estudanteId, matriculaId } = req.params;
    const newInfos = req.body;
    try {
      await database.Matriculas.update(newInfos,
        {
          where: {
            id: Number(matriculaId),
            estudante_id: Number(estudanteId)
          }
        });
      const updatedRegistration = await database.Matriculas.findOne({ where: { id: Number(updatedRegistration) } });
      return res.status(200).json(updatedRegistration);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async deleteRegistration(req, res) {
    const { matriculaId } = req.params;
    try {
      await database.Matriculas.destroy({
        where: {
          id: Number(matriculaId)
        }
      });
      return res.status(200).json({ mensagem: `Matricula de id ${matriculaId} deletado.` });
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async getRegistration(req, res) {
    const { estudanteId } = req.params;
    try {
      // const registrations = await database.Matriculas.findAll({
      //   where: { estudante_id: Number(estudanteId) }
      // });
      const people = await database.Pessoas.findOne({ where: { id: Number(estudanteId) } })
      const registrations = await people.getAulasMatriculadas()
      return res.status(200).json(registrations);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async getRegistrationPerClass(req, res) {
    const { turmaId } = req.params;
    try {
      const allRegistrations = await database.Matriculas.findAndCountAll({
        where: {
          turma_id: Number(turmaId),
          status: 'confirmado'
        },
        limit: 20,
        order: [['estudante_id', 'ASC']]
      })
      return res.status(200).json(allRegistrations);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async getRegistrationFullClass(req, res) {
    const capacityClass = 2;
    try {
      const fullClass = await database.Matriculas
        .findAndCountAll({
          where: {
            status: 'confirmado'
          },
          attributes: ['turma_id'],
          group: ['turma_id'],
          having: Sequelize.literal(`count(turma_id) > ${capacityClass}`)
        })
      return res.status(200).json(fullClass.count)
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async inactivatePeople(req, res) {
    const { estudanteId } = req.params;
    try {
      await peopleServices.inactivatePeopleAndRegistration(Number(estudanteId));
      return res.status(200).json({ message: `Matrículas ref. estudante ${estudanteId} canceladas.` })
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }
}

module.exports = PersonController