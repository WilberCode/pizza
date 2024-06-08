import mongoose from "mongoose";
import { User } from "../models/User";  
import {compareSync} from "bcrypt-ts";

export async function POST(req:any, res:any) {
    try {
        const body =  await req.json();
        mongoose.connect(process.env.MONGO_URI as string )
        const {email, password} = body; 

        if (!email ||!password) {
            return Response.json({ error: true, message: 'Email o contraseña incorrecta' });
        }

        let user = await User.findOne({email});  
        
        if (!user){
            return Response.json({error:true,message: 'No estas registrado'})
        }

        const passwordMatch =  compareSync(password, user.password); 
        
        if (!passwordMatch) {
            return Response.json({ error: true, message: 'Contraseña incorrecta' });
        }

        return Response.json({ error: false, user, message: 'Inicio correctamente!' });
    } catch (error) { 
        return Response.json({ error: true, message: 'Ocurrio un error, intentelo nuevamente' });
    } 
}

 