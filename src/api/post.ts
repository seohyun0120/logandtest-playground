import express, { Request, Response } from 'express';
import { logger } from '../logger';

const router = express.Router();

const dummyData = [
  { id: 0, name: 'SH', title: 'Welcome! My name is SH' },
  { id: 1, name: 'TJ', title: 'Welcome! My name is TJ' },
  { id: 2, name: 'LG', title: 'Welcome! My name is LG' },
];

router.get('/', (req: Request, res: Response) => {
  let respond = 'Welcome to the playground';
  logger.info(respond);
  return res.status(200).json({ isSucceeded: true, data: respond });
});

router.get('/post/:id', (req: Request, res: Response) => {
  let post = dummyData[req.params.id];
  if (!post) {
    let error = { isSucceeded: false, error: `postID ${req.params.id} does not exists` };
    logger.error(JSON.stringify(error));
    return res.status(404).json(error);
  }
  return res.status(200).json({ isSucceeded: true, data: post });
});

export default router;