const Car = require('../models/Car');

class CarRepository {

  getAll() {
    return Car.find();
  }

  getById(id) {
    return Car.findById(id);
  }

  add(car) {
    const newCar = new Car(car);
    return newCar.save();
  }

  update(id, patch) {
    return Car.findByIdAndUpdate(id, patch, { new: true });
  }

  delete(id) {
    return Car.findByIdAndRemove(id);
  }
}

module.exports = CarRepository;
