import express from 'express';
import posts from './post';

const router = express.Router();

router.use('/api/v1', posts);

export default router;