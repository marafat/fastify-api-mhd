const boom = require('boom');

const CarRepository = require('../repositories/CarRepository');

const carRepository = new CarRepository();

class CarController {

    // constructor(carRepo) {
    //     this._carRepository = carRepo;
    // }

    async getCars(req, reply) {
        try {
            const cars = await carRepository.getAll();
            return cars
        } catch (e) {
            throw boom.boomify(e)
        }
    }

    async getSingleCar(req, reply) {
        try {
            const id = req.params.id;
            const car = await carRepository.getById(id);
            return car
        } catch (e) {
            throw boom.boomify(e)
        }
    }

    async addCar(req, reply) {
        try {
            const car = carRepository.add({ ...req.body });
            return car;
        } catch (e) {
            throw boom.boomify(e)
        }
    }

    async updateCar(req, reply) {
        try {
            const id = req.params.id;
            const { ...patch } = req.body;
            const updated = await carRepository.update(id, patch);
            return updated;
        } catch (e) {
            throw boom.boomify(e);
        }
    }

    async deleteCar(req, reply) {
        try {
            const id = req.params.id;
            const deleted = await carRepository.delete(id);
            return deleted;
        } catch (e) {
            throw boom.boomify(e);
        }
    }

}

module.exports = CarController;
