const fastify = require('fastify')({
    logger: true
});

fastify.get('/', async (request, reply) => {
    return { hello: 'world' }
});

const start = async () => {
    try {
        await fastify.listen(3210);
    } catch (e) {
        fastify.log.error(e);
        process.exit(1)
    }
};

start();
