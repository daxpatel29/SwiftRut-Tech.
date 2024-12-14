import express from 'express';
import { authCheck, login, logout, signup} from '../controllers/auth.controller.js';
import { isAuthenticated } from "../midleware/isAuth.js"
const router = express.Router();

router.post('/signup',signup);
router.post('/login',login);
router.post('/logout',logout)
router.get('/authCheck', isAuthenticated, authCheck);

export default router;