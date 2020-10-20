/**
 * OnlyRouter Controller
 *
 *
 */

const {
  checkForFields,
  checkForValidStrings,
  // checkForSizedFields,
  // checkForValidType,
} = require('../../utils/validators');

const isDev = process.env.NODE_ENV !== 'production';

/**
 * TODO: rename method
 */
exports.myMethod = (data) =>
  new Promise((resolve, reject) => {
    // 1. check for required fields
    const fields = ['']; // TODO:
    const fieldError = checkForFields(data, fields);
    if (fieldError) return reject(fieldError); // return to stop code execution
    // 1. check for string fields
    const stringFieldError = checkForValidStrings(data, fields);
    if (stringFieldError) return reject(stringFieldError); // return to stop code execution

    // const {} = data;

    somePromiseMethod() // TODO: add code here
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        // eslint-disable-next-line no-console
        if (isDev) console.error(err);

        reject({ code: 500, err }); // 500 Internal Server Error
      });
  });
