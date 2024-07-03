import mongoose from "mongoose"; 
import { getServerSession } from "next-auth";  
import { authOptions } from "@/app/lib/authOptions";  
import { Category } from "../models/Category";
export async function POST(req:any, res:any) {
  const body =  await req.json();
  mongoose.connect(process.env.MONGO_URI as string )  
 if (body) {     
      const category:any  = await  Category.create(body);  
      return  Response.json({error:false,message: 'Se actualizó correctamente'}) 
  }   
 return Response.json({error:true,message: 'No fue actualizado el usuario '}) 
  
}
export async function PUT(req:any, res:any) {
  const body =  await req.json();
  mongoose.connect(process.env.MONGO_URI as string )   
 if (body) {     
      const category:any  = await Category.findByIdAndUpdate({_id:body._id},body) 
      return  Response.json({error:false,message: 'Se actualizó correctamente'}) 
  }   
 return Response.json({error:true,message: 'No fue actualizado el usuario '}) 
  
}
export async function GET(req:any, res:any) { 
  mongoose.connect(process.env.MONGO_URI as string )  
   
  const category  = await  Category.find();      
  
  return  Response.json({category})   
}
export async function DELETE(req:any, res:any) { 
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id'); 
  mongoose.connect(process.env.MONGO_URI as string )  
  if (id) {     
    const category  = await  Category.findByIdAndDelete(id); 
    if(category){  
      return  Response.json({error:false,message: 'Se eliminó correctamente '}) 
    }
    
  }   
  return Response.json({error:true,message: 'No se ha podido eliminar '}) 
     
   
}
