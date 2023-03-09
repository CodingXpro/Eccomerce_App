import express from 'express';
const router=express.Router();
import {requireSignIn,isAdmin} from '../middleware/authMiddleware.js';
import {CreateCategoryController,updateCategoryController,categoryController,singleCategoryController,deleteCategoryController} from '../controller/CategoryController.js';

//routes
//create category
router.post('/create-category',requireSignIn,isAdmin,CreateCategoryController)

//update category

router.put('/update-category/:id',requireSignIn,isAdmin,updateCategoryController);

//get All Category

router.get('/get-category',categoryController);

//Single Category

router.get('/single-category/:slug',singleCategoryController);

//Delete Category

router.delete('/delete-category/:id',requireSignIn,isAdmin,deleteCategoryController);

export default router;
