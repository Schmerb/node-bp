/**
 * Stripe Router
 *
 *
 */

const bodyParser = require('body-parser');

const { BASE_PATH } = require('../../config');

const stripeController = require('./controller');

const jsonParser = bodyParser.json();

function stripeRoutes(router, connectDb, authenticate) {
  router.get(`${BASE_PATH}/api/stripe`, connectDb, authenticate, (req, res) => {
    res.send('SEND ITT!!');
  });

  router.post(
    `${BASE_PATH}/api/stripe`,
    connectDb,
    jsonParser,
    authenticate,
    (req, res) =>
      stripeController
        .myServiceControllerMethod(req.body)
        .then((data) => {
          console.log({ data });
          return res.status(200).json(data); // 200 OK
        })
        .catch((err) => {
          if (err.reason === 'ValidationError') {
            return res.status(err.code).json(err);
          }
          return res.status(err.code || 500).send(err);
        })
  );
}

module.exports = stripeRoutes;
