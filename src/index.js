const fastify = require('fastify')({ logger: true });
const mongoose = require('mongoose');
const carRoutes = require('./routes/car');

// connect to db
const connectDB = async (fastify, mongoose) => {
    try {
        await mongoose.connect('mongodb://localhost/mycargarage', { useNewUrlParser: true });
        fastify.log.info('MongoDB connected...');
    } catch (e) {
        fastify.log.error(e);
    }
};

const configRoutes = (fastify, ...otherRoutes) => {
    fastify.get('/', async (request, reply) => {
        return { hello: 'world' }
    });

    otherRoutes.forEach((routes) => {
        routes.forEach((route) => {
            fastify.route(route);
            fastify.log.info(`Adding route: ${JSON.stringify(route)}`);
        });
    });
};

const startServer = async (fastify) => {
    try {
        await fastify.listen(3210);
    } catch (e) {
        fastify.log.error(e);
        process.exit(1)
    }
};

(async function (fastify, mongoose){

    configRoutes(fastify, carRoutes);
    await connectDB(fastify, mongoose);
    await startServer(fastify);

})(fastify, mongoose);
