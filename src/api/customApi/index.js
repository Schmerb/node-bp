/**
 * CustomApi Router
 *
 *
 */

const bodyParser = require('body-parser');

const customApi = require('./controller');

const jsonParser = bodyParser.json();

function customApiRoutes(router, authenticate) {
  /**
   * List CustomApis
   */
  router.get('/api/customApis', async (req, res) => {
    return customApi
      .listCustomApis()
      .then((data) => {
        return res.status(200).json(data); // 200 OK
      })
      .catch((err) => {
        if (err.reason === 'ValidationError') {
          return res.status(err.code).json(err);
        }
        return res.status(err.code || 500).send(err);
      });
  });

  /**
   * Fetch CustomApi by id
   */
  router.get('/api/customApis/:id', async (req, res) => {
    const { id } = req.params;

    return customApi
      .fetchCustomApiById(id)
      .then((data) => {
        return res.status(200).json(data); // 200 OK
      })
      .catch((err) => {
        if (err.reason === 'ValidationError') {
          return res.status(err.code).json(err);
        }
        return res.status(err.code || 500).send(err);
      });
  });

  /**
   * Create CustomApi
   */
  router.post('/api/customApis', jsonParser, authenticate, async (req, res) => {
    const { body } = req;
    return customApi
      .createCustomApi(body)
      .then((data) => {
        return res.status(200).json(data); // 200 OK
      })
      .catch((err) => {
        if (err.reason === 'ValidationError') {
          return res.status(err.code).json(err);
        }
        return res.sendStatus(err);
      });
  });

  /**
   * Update CustomApi
   */
  router.put('/api/customApis/:id', async (req, res) => {
    const { id } = req.params;
    const { body } = req;

    return customApi
      .updateCustomApi(id, body)
      .then((updatedCustomApi) => {
        return res.status(200).json(updatedCustomApi);
      })
      .catch((err) => {
        if (err.reason === 'ValidationError') {
          return res.status(err.code).json(err);
        }
        return res.status(err.code || 500).send(err);
      });
  });

  /**
   * Destroy technician
   */
  router.delete('/api/customApis/:id', authenticate, async (req, res) => {
    const { id } = req.params;

    return customApi
      .destroyCustomApi(id)
      .then(() => {
        return res.sendStatus(200); // 200 OK
      })
      .catch((err) => {
        if (err.reason === 'ValidationError') {
          return res.status(err.code).json(err);
        }
        return res.status(err.code || 500).send(err);
      });
  });
}

module.exports = customApiRoutes;
