'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.bulkInsert('Pessoas', [{
      nome: 'Milena Strassburger',
      ativo: true,
      email: 'mistrass@gamil.com',
      role: 'estudante',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  async down(queryInterface, Sequelize) {

    await queryInterface.bulkDelete('People', null, {});
  }
};
