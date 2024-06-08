import { Schema, model, models } from "mongoose";
import {genSaltSync, hashSync} from "bcrypt-ts";

const UserSchema = new Schema({
    email: { type: String, unique:true, required: [true, ' El correo es obligatorio ' ] }, 
    password: { type: String, required: [true, 'La contraseña es requerida'] ,
        validate: { 
            validator: function(pass:string){  
                 return !pass || pass.length >= 5;
            }, 
            message:  'La contraseña debe ser mayor a 5 caracteres'
        } 
            /* if( !pass.length || pass.length<5){ */
               /*  new Error('La contraseña debe ser mayor a 5 caracteres') */
              /*  return Response.json({message:'La contraseña debe ser mayor a 5 caracteres'});  */
             /*    return 'La contraseña debe ser mayor a 5 caracteres'; */
           /*  }  */
         
     },
  
}, {timestamps: true} )

UserSchema.post('validate', function(user){
    const notHashedPassword = user.password 
    const salt = genSaltSync(10);
    user.password = hashSync(notHashedPassword, salt); 
    

})


export const User = models?.User || model('User', UserSchema)    