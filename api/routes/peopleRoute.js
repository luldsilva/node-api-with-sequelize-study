const { Router } = require('express');
const PeopleController = require('../controllers/PeopleController.js');

const router = Router();

router.get('/people', PeopleController.getAllActivePeople)
router.get('/people/all', PeopleController.getAllPeople)
router.get('/people/:id', PeopleController.getPeople)
router.get('/people/:estudanteId/matricula', PeopleController.getRegistration)
router.get('/people/matricula/:turmaId/confirmadas', PeopleController.getRegistrationPerClass)
router.get('people/matricula/lotacao', PeopleController.getRegistrationFullClass)
router.post('/people', PeopleController.createPeople)
router.put('/people/:id', PeopleController.putPeople)
router.delete('/people/:id', PeopleController.deletePeople)
router.get('/people/:estudanteId/matricula/:matriculaId', PeopleController.getOneRegistration)
router.post('/people/:estudanteId/matricula', PeopleController.createRegistration)
router.put('/people/:estudanteId/matricula/:matriculaId', PeopleController.putRegistration)
router.delete('/people/:estudanteId/matricula/:matriculaId', PeopleController.deleteRegistration)
router.post('/people/:id/restaura', PeopleController.restorePeople)

module.exports = router