import mongoose from "mongoose";
import { User } from "../models/User";  
import { getServerSession } from "next-auth";  
import { authOptions } from "@/app/lib/authOptions"; 
import { userProps } from "../../../../typings";
export async function PUT(req:any, res:any) {
    const body =  await req.json();
    mongoose.connect(process.env.MONGO_URI as string ) 
    const session  = await getServerSession(authOptions);
   const emailForUpdate =  session?.user?.email
  
   if (body) {     
        const user:any  = await  User.findOneAndUpdate({email:emailForUpdate}, body,  { new: true });    
    
        return  Response.json({error:false,message: 'Se actualizó correctamente'}) 
    }   
   return Response.json({error:true,message: 'No fue actualizado el usuario '}) 
    
}
export async function GET(req:any, res:any) { 
    mongoose.connect(process.env.MONGO_URI as string ) 
    const session  = await getServerSession(authOptions);
    const emailForFind =  session?.user?.email
  
   if (emailForFind) {   
        const user  = await  User.findOne({email:emailForFind});     
        const { name, email, image, phone, address, postalCode, city, country, admin } = user;
        return  Response.json({user:{ name, email, image, phone, address, postalCode, city, country, admin }})  
    }   
   return Response.json({error:true,message: 'No fue actualizado el usuario '}) 
    
}

 