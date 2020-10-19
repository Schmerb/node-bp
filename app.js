/**
 * App entry file for AWS Lambda / Netlify Functions
 *
 */

import express from 'express';
// const express = require('express');

import { bindMiddleware } from './src/modules/middleware';
import { connectToDatabase } from './src/modules/database';
import { initializeApi } from './src/api';

const isDev = process.env.NODE_ENV !== 'production';

// EXPRESS INSTANCE
const app = express();

// setup all the middlewares
bindMiddleware(app);
// eslint-disable-next-line no-console
console.log('>>> bindMiddleware');

initializeApi(app, connectToDatabase);
// eslint-disable-next-line no-console
console.log('>>> initializeApi');

// Fallback for all non-valid endpoints
app.use('*', (req, res) => res.status(404).json({ message: 'Not Found' }));

// app.listen(8080, () => {
//   // connectToDatabase();
//   console.log('listening on 8080');
// });

export default app;
