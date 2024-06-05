import mongoose from "mongoose";
import { User } from "../models/User";  

export async function POST(req:any, res:any) {
    const body =  await req.json();
    mongoose.connect(process.env.MONGO_URI as string )
    const {email} = body; 
    let user = await User.findOne({email});
    if (user) return  Response.json({error:true,message: 'El usuario ya existe'}) 
    try {   
        const createdUser:any = await User.create(body)  
        return Response.json({error:false,message: 'Se registro correctamente!',...createdUser}); 
    } catch (error:any) {  
        if (error?.name === 'ValidationError') {
            const errors = Object.values(error.errors).map((val:any) => val.message);
            return Response.json({error:true,message:  errors[0]})   
        }
    } 
}

 