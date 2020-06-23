import express, { Request, Response } from 'express';
import { logger } from '../logger';

const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
  try {
    let respond = 'welcome to the playground';
    logger.info(respond);
    return res.status(200).json({ isSucceeded: true, data: respond });
  } catch (error) {
    logger.error(error);
  }
});

export default router;