const fastify = require('fastify')({ logger: true });
const mongoose = require('mongoose');

// connect to db
const connectDB = async (fastify, mongoose) => {
    try {
        await mongoose.connect('mongodb://localhost/mycargarage', { useNewUrlParser: true });
        fastify.log.info('MongoDB connected...');
    } catch (e) {
        fastify.log.error(e);
    }
};

fastify.get('/', async (request, reply) => {
    return { hello: 'world' }
});

const startServer = async (fastify) => {
    try {
        await fastify.listen(3210);
    } catch (e) {
        fastify.log.error(e);
        process.exit(1)
    }
};

(async function (fastify, mongoose){
  await connectDB(fastify, mongoose);
  await startServer(fastify);
})(fastify, mongoose);
