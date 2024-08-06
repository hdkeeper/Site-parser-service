import express from 'express';
import 'express-async-errors';
import logger from 'morgan';
import bodyParser from 'body-parser';

import { listenPort } from './config';
import analyzeHandler from './handlers/analyze';
import { notFound, internalError } from './lib/error';

const app = express();
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/analyze', analyzeHandler);

// 404 fallback handler
app.use((req, res, next) => notFound(res));

// Error handler
app.use((err, req, res, next) => internalError(res, err));

app.listen(listenPort, async () => {
    console.info(`Listening on port ${listenPort}`);
});
