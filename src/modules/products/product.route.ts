import express, { Request, Response } from 'express'
import { Product } from './product.model';

const router=express.Router()

router.post('/', async (req: Request, res:Response)=>{
    
    const result = await Product.create(req.body);
    res.json({
        success:true,
        message:"Product created successfully!",
        data:result
    })

});

export const ProductRoutes = router;