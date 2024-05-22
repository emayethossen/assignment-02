import { Request, Response } from "express"
import { ProductServices } from "./product.service"

// Create a Product
const createProduct= async (req: Request, res:Response)=>{
    
    const productData=req.body

const result= await ProductServices.createProduct(productData);

    res.json({
        success:true,
        message:"Product created successfully!",
        data:result
    })
};

// Get all products
const getAllProducts= async (req: Request, res:Response)=>{
    try{
        const result = await ProductServices.getAllProducts();
        
        res.status(200).json({
            success:true,
            message:"Products fetched successfully!",
            data:result
        });
    } catch(err:any){
        res.status(500).json({
            success:false,
            message:"Could not fetch products",
            error:err
        })
    }
}

// Get specific id
const getProductById= async (req: Request, res:Response)=>{
    try{

        const {productId}=req.params;

        const result = await ProductServices.getProductById(productId);
        
        res.status(200).json({
            success:true,
            message:"Products fetched successfully!",
            data:result
        });
    } catch(err:any){
        res.status(500).json({
            success:false,
            message:"Could not fetch products",
            error:err
        })
    }
}

export const ProductControllers={
    createProduct,
    getAllProducts,
    getProductById
}