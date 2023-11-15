const { Router } = require('express');
const PeopleController = require('../controllers/PeopleController.js');

const router = Router();

router.get('/people', PeopleController.getAllPeople)
router.get('/people/:id', PeopleController.getPeople)
router.post('/people', PeopleController.createPeople)
router.put('/people/:id', PeopleController.putPeople)
router.delete('/people/:id', PeopleController.deletePeople)

module.exports = router