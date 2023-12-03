//ponto de entrada para distribuir os arquivos conforme forem solicitados
const PeopleServices = require('./PeopleServices');
const ClassServices = require('./ClassServices');
const LevelServices = require('./LevelServices');
const RegistrationServices = require('./RegistrationServices');

module.exports = {
  PeopleServices: PeopleServices,
  ClassServices: ClassServices,
  LevelServices: LevelServices,
  RegistrationServices: RegistrationServices

}