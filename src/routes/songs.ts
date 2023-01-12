import express from 'express';
import verifyAuth from '../middlewares/verifyAuth';

const router = express.Router();

router.use(verifyAuth());

export default router;
