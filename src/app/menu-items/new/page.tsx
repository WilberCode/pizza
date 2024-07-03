'use client'
  
import FormMenu from "@/app/components/FormMenu";
import LayoutAuthenticated from "../../layouts/LayoutAuthenticated";  

const CategoriesPage = () => {  

  return (
    <LayoutAuthenticated>
      <h1>Categorias</h1> 
      <FormMenu/> 
    </LayoutAuthenticated>
  )
} 

export default  CategoriesPage  