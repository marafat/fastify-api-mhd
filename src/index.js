/**
 * Module dependencies.
 */

const app = require('./app');
const debug = require('debug')('server');
const http = require('http');
const mongoose = require('mongoose');

/**
 * Get port from environment and store in Express.
 */

const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

/**
 * Create HTTP server.
 */

const server = http.createServer(app);

/**
 * Connect to db
 */
const connectDB = async (mongoose) => {
  await mongoose.connect('mongodb://localhost/mycargarage', { useNewUrlParser: true });
  debug('MongoDB connected...');
};

/**
 * Listen on provided port, on all network interfaces.
 */
const serverListen = async (server, port) => {
  await server.listen(port);
  onListening();
};

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * KICK-OFF
 */
(async function(server, mongoose) {
  try {
    await connectDB(mongoose);
    await serverListen(server, port);
  } catch (e) {
    debug('Could not start! Something wrong happened!');
    onError(e);
  }
})(server, mongoose);

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof port === 'string'
      ? 'Pipe ' + port
      : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  const addr = server.address();
  const bind = typeof addr === 'string'
      ? 'pipe ' + addr
      : 'port ' + addr.port;
  debug('Listening on ' + bind);
}
