const fastify = require('fastify')({ logger: true });
const swaggerPlugin = require('fastify-swagger');
const mongoose = require('mongoose');
const carRoutes = require('./routes/car');
const swagger = require('../config/swagger');

// connect to db
const connectDB = async (fastify, mongoose) => {
  try {
    await mongoose.connect('mongodb://localhost/mycargarage', { useNewUrlParser: true });
    fastify.log.info('MongoDB connected...');
  } catch (e) {
    fastify.log.error(e);
  }
};

const registerPlugins = (fastify, ...plugins) => {
  plugins.forEach((plugin) => fastify.register(plugin))
};

const startServer = async (fastify) => {
  try {
    await fastify.listen(3210);
    console.log(fastify.printRoutes());
  } catch (e) {
    fastify.log.error(e);
    process.exit(1)
  }
};

(async function (fastify, mongoose){
  fastify.register(swaggerPlugin, swagger.options);
  registerPlugins(fastify, carRoutes);
  await connectDB(fastify, mongoose);
  await startServer(fastify);

})(fastify, mongoose);
