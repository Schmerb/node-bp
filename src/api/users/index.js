import express from 'express';
import bodyParser from 'body-parser';

import usersController from './controller';
import { getPassportAuthenticate } from '../../modules/authenticate';

const authenticate = getPassportAuthenticate();

export const router = express.Router();

const jsonParser = bodyParser.json();

router
  .route('/')
  .post(jsonParser, usersController.createUser) // registers a new user
  .get(usersController.getAllUsers); // returns all users DANGEROUS

router
  .route('/me')
  .all(authenticate)
  .get(usersController.getUser) // gets current user from JWT
  .delete(usersController.deleteAccount) // removes user's account
  .put(usersController.updateUser); // updates user's account

export default router;
