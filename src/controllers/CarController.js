const boom = require('boom');

const CarRepository = require('../repositories/CarRepository');

const carRepository = new CarRepository();

class CarController {

  // constructor(carRepo) {
  //     this._carRepository = carRepo;
  // }

  async getCars(req, res) {
    try {
      const cars = await carRepository.getAll();
      res.send(cars);
    } catch (e) {
      throw boom.boomify(e)
    }
  }

  async getSingleCar(req, res) {
    try {
      const id = req.params.id;
      const car = await carRepository.getById(id);
      res.send(car);
    } catch (e) {
      throw boom.boomify(e)
    }
  }

  async addCar(req, res) {
    try {
      const car = await carRepository.add({ ...req.body });
      res.send(car);
    } catch (e) {
      throw boom.boomify(e)
    }
  }

  async updateCar(req, res) {
    try {
      const id = req.params.id;
      const { ...patch } = req.body;
      const updated = await carRepository.update(id, patch);
      res.send(updated);
    } catch (e) {
      throw boom.boomify(e);
    }
  }

  async deleteCar(req, res) {
    try {
      const id = req.params.id;
      const deleted = await carRepository.delete(id);
      res.send(deleted);
    } catch (e) {
      throw boom.boomify(e);
    }
  }

}

module.exports = CarController;
