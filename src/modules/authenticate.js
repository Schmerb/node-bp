/**
 *
 * Authentication via Passport
 *
 *
 */

let auth;

export const init = (passport) => {
  auth = passport.authenticate('jwt', { session: false });
  // console.log('insider service', auth);
};

export const getPassportAuthenticate = () => auth;

export default {
  init,
  getPassportAuthenticate,
};
