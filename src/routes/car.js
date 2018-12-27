const CarController = require('../controllers/CarController');
// const CarRepository = require('../repositories/CarRepository');

// const carRepository = new CarRepository();
const carController = new CarController();

const routes = [
    {
        method: 'GET',
        url: '/api/cars',
        handler: carController.getCars
    },
    {
        method: 'GET',
        url: '/api/cars/:id',
        handler: carController.getSingleCar
    },
    {
        method: 'POST',
        url: '/api/cars',
        handler: carController.addCar,
        // schema: documentation.addCarSchema
    },
    {
        method: 'PUT',
        url: '/api/cars/:id',
        handler: carController.updateCar
    },
    {
        method: 'DELETE',
        url: '/api/cars/:id',
        handler: carController.deleteCar
    }
];

module.exports = function (fastify, opts, next) {
    routes.forEach((route) => {
        fastify.route(route);
    });

    next();
};
