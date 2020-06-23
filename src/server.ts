import cors from 'cors';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import express, { Application } from 'express';
import { logger, httpLogStream } from './logger';
import postRouter from './api';

const app: Application = express();

app.listen(3000, (err) => {
  if (err) {
    logger.error(err);
    return;
  }
  logger.info('Ready to start SERVER, listening port 3000');
});

app.use(morgan('dev', { stream: httpLogStream }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use('/', postRouter);