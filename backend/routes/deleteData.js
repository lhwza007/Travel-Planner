import express from 'express';
import { deletePost } from '../controllers/deleteData.js';

const router = express.Router();

router.delete('/deletePost', deletePost); 

export default router;