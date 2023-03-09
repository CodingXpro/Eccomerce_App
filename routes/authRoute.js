import express from 'express';
import { registerController, LoginController, testController, forgotPasswordController } from '../controller/authController.js';
import { requireSignIn, isAdmin } from '../middleware/authMiddleWare.js';


const router = express.Router();
//Register
router.post('/register', registerController);

//Login

router.post('/login', LoginController);

//test

router.get('/test', requireSignIn, isAdmin, testController);

//protected user route auth

router.get('/user-auth', requireSignIn, (req, res) => {
    res.status(200).send({ ok: true });
})
//protected Admin route auth

router.get('/admin-auth', requireSignIn,isAdmin, (req, res) => {
    res.status(200).send({ ok: true });
})
//Forgot password || POST
router.post('/forgot-password', forgotPasswordController);

export default router;