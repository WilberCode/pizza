import { Schema, model, models } from "mongoose"; 
const CategorySchema = new Schema({
    name: { type: String, required: true},
    slug: { type: String},  
  
}, {timestamps: true} )

 


export const Category = models?.Category || model('Category', CategorySchema)    