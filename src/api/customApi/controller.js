/**
 * CustomApi Controller
 *
 *
 */

import CustomApis from '../../models/customApi';
import {
  checkForFields,
  checkForValidStrings,
  checkIfNotFound,
  checkIfAuthorized,
} from '../../utils/validators';

const isDev = process.env.NODE_ENV !== 'production';

/**
 * List CustomApis
 */
exports.listCustomApis = (query) =>
  new Promise((resolve, reject) => {
    const queryableFields = ['_creator', '_createdAt'];
    const queries = {};
    if (query) {
      for (const field of queryableFields) {
        if (field in query) {
          queries[field] = {
            $regex: new RegExp(`^${query[field]}`, 'i'),
          };
        }
      }
    }

    const populate = query.populate === 'true';
    const page = parseInt(query.page, 10) || 0;
    const perPage = parseInt(query.limit, 10) || 10;
    CustomApis.find()
      .populate(populate && '_creator')
      .limit(perPage)
      .skip(perPage * page)
      .exec()
      .then((customApis) => {
        resolve(customApis.map((customApi) => customApi.apiRepr()));
      })
      .catch((err) => {
        // eslint-disable-next-line no-console
        if (isDev) console.error(err);

        reject({ code: 500, err }); // 500 Internal Server Error
      });
  });

/**
 * Fetch CustomApi by id
 */
exports.fetchCustomApiById = (customApiId) =>
  new Promise((resolve, reject) => {
    CustomApis.findById(customApiId)
      .exec()
      .then((customApi) => {
        resolve(customApi ? customApi.apiRepr() : null);
      })
      .catch((err) => {
        // eslint-disable-next-line no-console
        if (isDev) console.error(err);

        reject({ code: 500, err }); // 500 Internal Server Error
      });
  });

/**
 * create CustomApi
 *
 */
exports.createCustomApi = (newCustomApi, userId) =>
  new Promise((resolve, reject) => {
    // - - - - - - - - - -
    // Validate customApi fields
    // - - - - - - - - - -
    const optionalFields = ['']; // TODO: add optional fields

    // 1. check for required fields
    const fields = ['']; // TODO: add required fields
    const fieldError = checkForFields(newCustomApi, fields);
    if (fieldError) return reject(fieldError); // return to stop code execution
    // 2. check for valid string fields
    const stringFields = ['']; // TODO: add string fields
    const stringError = checkForValidStrings(newCustomApi, stringFields);
    if (stringError) return reject(stringError);

    // create customApi object,
    // add required _creator
    const customApi = {
      url: newCustomApi.url,
      _creator: userId,
    };
    // add optional fields
    for (const field of optionalFields) {
      if (field in newCustomApi) {
        customApi[field] = newCustomApi[field];
      }
    }
    CustomApis.create(customApi)
      .then((_customApi) => {
        resolve(_customApi.apiRepr());
      })
      .catch((err) => {
        // eslint-disable-next-line no-console
        if (isDev) console.error(err);

        reject({ code: 500, err }); // 500 Internal Server Error
      });
  });

/**
 * update CustomApi
 */
exports.updateCustomApi = (customApiId, data, userId) =>
  new Promise((resolve, reject) => {
    (async () => {
      const updatableFields = [''];

      try {
        // make sure user is owner
        const customApi = await CustomApis.findById(customApiId).exec();
        // if no customApi, let user know
        const notFoundErr = checkIfNotFound(customApi);
        if (notFoundErr) return reject(notFoundErr);
        // make sure user is authorized to update/write customApi
        const notAuthErr = checkIfAuthorized(
          customApi,
          userId,
          'update',
          'CustomApi'
        );
        if (notAuthErr) return reject(notAuthErr);
        //
        // Good to Go!
        // perform update
        //

        // const updatedCustomApi = {};
        for (const field of updatableFields) {
          if (field in data) {
            // updatedCustomApi[field] = data[field];
            customApi[field] = data[field];
          }
        }

        customApi.save().catch((saveError) => {
          // eslint-disable-next-line
          console.log({ saveError });
          reject({ code: 500, err: saveError }); // 500 Internal Server Error
        });

        return resolve(customApi.apiRepr());
      } catch (err) {
        // eslint-disable-next-line
        console.log({ err });

        reject({ code: 500, err }); // 500 Internal Server Error
      }
    })();
  });

/**
 * Destroy CustomApi
 */
exports.destroyCustomApi = (customApiId, userId) =>
  new Promise(async (resolve, reject) => {
    try {
      // first lookup object and see if it is created by userId
      const customApi = await CustomApi.findById(customApiId).exec();
      // if no customApi, let user know
      const notFoundErr = checkIfNotFound(customApi);
      if (notFoundErr) return reject(notFoundErr);
      // make sure user is authorized to update/write customApi
      const notAuthErr = checkIfAuthorized(
        customApi,
        userId,
        'delete',
        'CustomApi'
      );
      if (notAuthErr) return reject(notAuthErr);
      // Good to Go!
      // delete document directly on instance
      customApi.remove();

      // let user know success
      resolve(true);
    } catch (err) {
      // eslint-disable-next-line no-console
      if (isDev) console.error(err);

      reject({ code: 500, err }); // 500 Internal Server Error
    }
  });
