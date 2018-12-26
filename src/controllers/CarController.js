const boom = require('boom');

class CarController {

    constructor(carRepo) {
        this._carRepository = carRepo;
    }

    async getCars(req, reply) {
        try {
            const cars = await this._carRepository.getAll();
            return cars
        } catch (e) {
            throw boom.boomify(e)
        }
    }

    async getSingleCar(req, reply) {
        try {
            const id = req.params.id;
            const car = await this._carRepository.getById(id);
            return car
        } catch (e) {
            throw boom.boomify(e)
        }
    }

    async addCar(req, reply) {
        try {
            const car = this._carRepository.add({ ...req.body });
            return car;
        } catch (e) {
            throw boom.boomify(e)
        }
    }

    async updateCar(req, reply) {
        try {
            const id = req.params.id;
            const { ...patch } = req.body;
            const updated = await this._carRepository.update(id, patch);
            return updated;
        } catch (e) {
            throw boom.boomify(e);
        }
    }

    async deleteCar(req, reply) {
        try {
            const id = req.params.id;
            const deleted = await this._carRepository.delete(id);
            return deleted;
        } catch (e) {
            throw boom.boomify(e);
        }
    }

}

module.exports = CarController;
