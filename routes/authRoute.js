import express from 'express';
import {
    registerController,
    loginController,
    testController,
    forgotPasswordController,
    updateProfileController,
    getuserController

} from  '../Controllers/authController.js'
import { requireSignIn } from '../middlewares/authMiddleware.js';
import { isAdmin } from '../middlewares/authMiddleware.js';
//router object
const router=express.Router()
router.post('/register',registerController);
//login || POST
router.post('/login',loginController);
//forgot password|| POST
router.post('/forgot-password', forgotPasswordController);
router.get('/test',requireSignIn,isAdmin,testController);
//protected user-route auth
router.get("/user-auth", requireSignIn, (req, res) => {
    res.status(200).send({ ok: true });
  });
//protected admin-route auth
router.get("/admin-auth", requireSignIn,isAdmin, (req, res) => {
    res.status(200).send({ ok: true });
});
//update profile
router.put('/profile',requireSignIn,updateProfileController);
export default router;

//get users
router.put("/get-users",getuserController);