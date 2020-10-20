/**
 *
 * init App
 *
 *
 */

const customApiRoutes = require('./customApi/index.js');
const onlyRouterRoutes = require('./onlyRouter/index.js');
const stripeRoutes = require('./stripe/index.js');
// *__imports

const { getPassportAuthenticate } = require('../modules/authenticate');

export const initializeApi = async (app, connectToDatabase) => {
  // eslint-disable-next-line no-console
  console.log('>>> initApi');

  const connectDb = async (req, res, next) => {
    try {
      await connectToDatabase();
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log('ERROR', { error });

      return res.send({ error });
    }
    next();
  };

  const authenticate = getPassportAuthenticate();

  app.get('/', (req, res) => {
    res.send('CODE HAS BEEN UPDATED');
  });

  customApiRoutes(app, connectDb, authenticate);
  onlyRouterRoutes(app, connectDb, authenticate);
  stripeRoutes(app, connectDb, authenticate);
  // *__init
};
