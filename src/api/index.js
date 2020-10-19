/**
 *
 * init App
 *
 *
 */

import userRoutes from './users';
import authRoutes from '../auth/router';
// const authRoutes = require('../auth/router');
// const { getPassportAuthenticate } = require('../modules/authenticate');
//* __imports

export const initializeApi = async (app, connectToDatabase) => {
  // eslint-disable-next-line no-console
  console.log('>>> initApi');

  // const connectDb = async (req, res, next) => {
  //   try {
  //     await connectToDatabase();
  //   } catch (error) {
  //     // eslint-disable-next-line no-console
  //     console.log('ERROR', { error });

  //     return res.send({ error });
  //   }
  //   next();
  // };

  // const authenticate = getPassportAuthenticate();

  app.get('/', (req, res) => {
    res.send('CODE HAS BEEN UPDATED');
  });

  //* __init

  // userRoutes(app, connectDb, authenticate);
};
