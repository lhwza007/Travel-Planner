import express from 'express';
import { addFavorite, removeFavorite, getFavoriteStatus, getFavoritePlans } from '../controllers/favorite.js';

const router = express.Router();

router.post('/addFavorite', addFavorite);
router.post('/removeFavorite', removeFavorite);
router.get('/getFavoriteStatus', getFavoriteStatus); 
router.post('/getFavoritePlans', getFavoritePlans);

export default router;