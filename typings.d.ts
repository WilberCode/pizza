 

export type userProps = {
    name: string;
    email: string;
    image?: string | null;
    phone?: number; 
    address?: string;
    postalCode?: number;
    city?: string;
    country?: string;
    admin?: boolean;
} 


export type CategoryProps = {
    name:string;
    slug?:string;
    _id?:string;
}

export type Property = {
    name: string;
    price: string;
    _id?: string;
}; 

export type MenuProps = {
    name:string;
    description:string;
    price:number;
    image?: string | null; 
    sizes?: Property[] | null;
    extraIngredientPrices?: Property[] | null;
    category?: string;
    _id?: string;
}  
