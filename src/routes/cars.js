const express = require('express');
const router = express.Router();

const CarController = require('../controllers/CarController');
const carController = new CarController();

router.get('/', carController.getCars);
router.get('/:id', carController.getSingleCar);
router.post('/', carController.addCar);
router.put('/:id', carController.updateCar);
router.delete('/:id', carController.deleteCar);

module.exports = router;
