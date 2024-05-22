import { TProduct } from "./product.interface";
import { Product } from "./product.model";

const createProduct= async (payLoad:TProduct)=>{
    const result = await Product.create(payLoad);
    return result;
}

const getAllProducts= async ()=>{
    const result = await Product.find();
    return result;
}

const getProductById= async (id: string)=>{
    const result = await Product.findById(id);
    return result;
}

export const ProductServices = {
    createProduct,
    getAllProducts,
    getProductById
}