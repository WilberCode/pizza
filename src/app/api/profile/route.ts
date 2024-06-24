import mongoose from "mongoose";
import { User } from "../models/User";  
import { getServerSession } from "next-auth";  
import { authOptions } from "@/app/lib/authOptions";
import { log } from "console";
export async function PUT(req:any, res:any) {
    const body =  await req.json();
    mongoose.connect(process.env.MONGO_URI as string ) 
    const session  = await getServerSession(authOptions);
   const email =  session?.user?.email 
   if (body) {     
        const result  = await  User.updateOne({email}, body);   
        
        return  Response.json({error:true,message: 'Se actualizó correctamente'})   
    }  
   return Response.json({error:false,message: 'No fue actualizado el usuario '}) 
    
}

 