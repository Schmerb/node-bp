/**
 *
 * init App
 *
 *
 */
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

  // *__init
};
