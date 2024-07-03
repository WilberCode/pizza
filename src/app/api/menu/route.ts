import mongoose from "mongoose";
import { User } from "../models/User";  
import { getServerSession } from "next-auth";  
import { authOptions } from "@/app/lib/authOptions"; 
import { MenuProps, userProps } from "../../../../typings";
import { Menu } from "../models/Menu";
import { NextRequest } from "next/server";
export async function POST(req:any, res:any) {
    const body =  await req.json();
    mongoose.connect(process.env.MONGO_URI as string )  
  
   if (body) {     
        const user:any  = await  Menu.create(body);     
        return  Response.json({error:false,message: 'Se creo correctamente'}) 
    }   
   return Response.json({error:true,message: 'No fue creado el usuario '}) 
    
}
 
export async function PUT(req:any, res:any) {
    const body =  await req.json();
    mongoose.connect(process.env.MONGO_URI as string )  
  
   if (body) {     
        const user:any  = await  Menu.updateOne({_id:body._id}, body);     
        return  Response.json({error:false,message: 'Se actualizó correctamente'}) 
    }   
   return Response.json({error:true,message: 'No fue actualizado el usuario '}) 
    
}
 
export async function GET(req:NextRequest, res:any) {  
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id'); 
    mongoose.connect(process.env.MONGO_URI as string )     

    if (id) {  
      const menu =  await Menu.findOne({_id:id})  
      return  Response.json(menu)
    }else{

      const menus  = await  Menu.find()    
      return  Response.json({menus})   
    }
  }
  

  export async function DELETE(req:any, res:any){  
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    mongoose.connect(process.env.MONGO_URI as string )
    if (id) {
      const menu  = await  Menu.findByIdAndDelete(id);
      if(menu){
        return  Response.json({error:false,message: 'Se eliminó correctamente '})
      }

    }
    return Response.json({error:true,message: 'No se ha podido eliminar '}) 
  }
