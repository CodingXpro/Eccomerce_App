import express from 'express';
import {isAdmin,requireSignIn} from '../middleware/authMiddleware.js';
import {createProductController,getProductController,getSingleProductController,productPhotoController,productDeleteController,updateProductController} from '../controller/productController.js';
import formidable from 'express-formidable';
const router=express.Router();


//routes

router.post('/create-product',requireSignIn,isAdmin,formidable(), createProductController);

//get all products

router.get('/get-product',getProductController);

//get Single Product

router.get('/get-product/:slug',getSingleProductController);

//get product photo

router.get('/product-photo/:_id',productPhotoController);

//Delete the Product

router.delete('/product/:_id',productDeleteController);

//Update the Product

router.put('/update-product/:_id',requireSignIn,isAdmin,formidable(), updateProductController);

export default router;
