import { Schema, model, models } from "mongoose"; 
const MenuSchema = new Schema({
    name: { type: String, required:true}, 
    price: { type: Number, required:true},
    description: { type: String},
    image: { type: String}, 
    sizes: [{
        name: { type: String},
        price: { type: Number},
    }],
    extraIngredientPrices: [{
        name: { type: String},
        price: { type: Number},
    }],
    category: { type: Schema.Types.ObjectId, ref: 'Category' },
    
  
}, {timestamps: true} )

 


export const Menu = models?.Menu || model('Menu', MenuSchema)