import categoryModel from '../models/categoryModel.js';
import slugify from 'slugify';



//Create Category

export const CreateCategoryController=async(req,res)=>{

    try{
        const{name}=req.body;
        if(!name){
            return res.status(401).send({
                message:"Name is required"
            })
        }
        const existingCategory=await categoryModel.findOne({name});
        if(existingCategory){
            return res.status(200).send({
                succes:true,
                message:"Category Already Exists"
            })
        }
        const category=await new categoryModel({name,slug:slugify(name)}).save();
        res.status(200).send({
            succes:true,
            message:"new Category Created",
            category
        })

    }catch(error){
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error in category",
            error
        })
    }
}
// Update Category
export const updateCategoryController=async(req,res)=>{
    try{
        const{name}=req.body;
        const{id}=req.params;
        const category=await categoryModel.findByIdAndUpdate(id,{name,slug:slugify(name)},{new:true});
        res.status(200).send({
            succes:true,
            message:"Category Updated SuccessFully",
            category
        })
    }catch(error){
        console.log(error);
    }

}
// get All Category

export const categoryController=async(req,res)=>{
    try{
        const category=await categoryModel.find({});
        res.status(200).send({
            succes:true,
            message:"All Categories list",
            category
        })
    }catch(error){
        console.log(error);
        res.status(500).send({
            succes:false,
            message:"Error while getting all category",

        })
    }
}

//single Category

export const singleCategoryController=async(req,res)=>{
    try{
        const category=await categoryModel.findOne({slug:req.params.slug});
        res.status(200).send({
            succes:true,
            message:"Get Single Category SuccessFully ",
            category
        })
    }catch(error){
        console.log(error);
        res.status(500).send({
            succes:false,
            message:"Error while getting Single category",

        })
    }

}

//Delete Category

export const deleteCategoryController=async(req,res)=>{
    try{
        const _id = req.params.id;
        const deleteCategory=await categoryModel.findByIdAndDelete({_id});
        res.status(200).send({
            success:true,
            message:"Category Deleted Successfully",
            
        })
    }catch(error){
        console.log(error);
        res.status(500).send({
            succes:false,
            message:"Error while Deleting category",
            error,
        })
    }
}
