const express = require('express');
const router = express.Router();
const stationController = require('../controllers/stationController');
const auth = require('../middleware/auth');

router.post('/', auth, stationController.createStation);
router.get('/', stationController.getAllStations);
router.put('/:id', auth, stationController.updateStation);
router.delete('/:id', auth, stationController.deleteStation);

module.exports = router; 