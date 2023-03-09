import productModel from '../models/productModel.js';
import slugify from 'slugify';
import fs from 'fs';

export const createProductController=async(req,res)=>{
    try{
        const {name,slug,description,price,category,quantity,shipping}=req.fields;
        const{photo}=req.files;
        switch(true){
            case !name:
                return res.status(500).send({Error:"Name is Required"})
            case !description:
                return res.status(500).send({Error:"Description is Required"})
            case !price:
                return res.status(500).send({Error:"Price is Required"})
            case !category:
                return res.status(500).send({Error:"Category is Required"})
            case !quantity:
                    return res.status(500).send({Error:"Quantity is Required"})
            case photo && photo.size>1000000:
                    return res.status(500).send({Error:"Photo is Required"})
          

        }

        const products=new productModel({...req.fields,slug:slugify(name)});
        if(photo){
            products.photo.data=fs.readFileSync(photo.path);
            products.photo.contentType=photo.type;
        }
        await products.save();
    res.status(201).send({
      success: true,
      message: "Product Created Successfully",
      products,
    });
    }catch(error){
        console.log(error);
        res.status(500).send({
            success:false,
            message:'Error in creating Product',
            error
        })
    }
}

//get all Products

export const getProductController=async(req,res)=>{
    try{
        const products=await productModel.find({}).populate('category').select("-photo").limit(12).sort({createdAt:-1});
        res.status(200).send({
            succes:true,
            countTotal:products.length,
            message:"All Products",
            products,
        })
    }catch(error){
        res.status(500).send({
            succes:false,
            message:"Error in getting the product",
            error:error.message
        })
    }
}

//get single product

export const getSingleProductController=async(req,res)=>{
    try{
        const product =await productModel.findOne({slug:req.params.slug}).select("-photo").populate('category');
        res.status(200).send({
            succes:true,
            message:"Single Product fetched",
            product
        })
    }catch(error){
        res.status(500).send({
            succes:false,
            message:"Error while getting the single product",
            error:error.message
        })
    }
}

//get product photo

export const productPhotoController = async (req, res) => {
    try {
      const product = await productModel.findById(req.params._id).select("photo");
      if (product.photo.data) {
        res.set("Content-type", product.photo.contentType);
        return res.status(200).send(product.photo.data);
      }
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Erorr while getting photo",
        error:error.message
        ,
      });
    }
  };

  //delete the product

  export const productDeleteController=async(req,res)=>{
    try{
        await productModel.findByIdAndDelete(req.params._id).select('-photo')
        res.status(200).send({
            success:true,
            message:"product Deleted Successfully"
        })
    }catch(error){
        console.log(error);
        res.status(500).send({
            succes:false,
            message:"Error while deleting the product",
            error
        })
    }
  }

  //update Product

  export const updateProductController=async(req,res)=>{
    try{
        const {name,slug,description,price,category,quantity,shipping}=req.fields;
        const{photo}=req.files;
        switch(true){
            case !name:
                return res.status(500).send({Error:"Name is Required"})
            case !description:
                return res.status(500).send({Error:"Description is Required"})
            case !price:
                return res.status(500).send({Error:"Price is Required"})
            case !category:
                return res.status(500).send({Error:"Category is Required"})
            case !quantity:
                    return res.status(500).send({Error:"Quantity is Required"})
            case photo && photo.size>1000000:
                    return res.status(500).send({Error:"Photo is Required"})
          

        }

        const products=await productModel.findByIdAndUpdate(req.params._id,{...req.fields,slug:slugify(name)},{new:true})
        if(photo){
            products.photo.data=fs.readFileSync(photo.path);
            products.photo.contentType=photo.type;
        }
        await products.save();
    res.status(201).send({
      success: true,
      message: "Product Updated  Successfully",
      products,
    });
    }catch(error){
        console.log(error);
        res.status(500).send({
            success:false,
            message:'Error in Updating the Product',
            error
        })
    }
}
  