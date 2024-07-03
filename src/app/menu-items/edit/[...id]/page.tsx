'use client'
  
import LayoutAuthenticated from "../../../layouts/LayoutAuthenticated";  
import { useEffect, useState } from "react";
import axios from "axios";
import { MenuProps } from "../../../../../typings";
import FormMenu from "@/app/components/FormMenu";

 
interface PropsQuery { 
  params: {
    id: string;
  }; 
}

const EditPage = ({params:{id}}:PropsQuery) => {  
  const [menu, setMenu] = useState<MenuProps>()
   
  useEffect(() => {
   if (!id) return;
   axios.get('/api/menu?id='+id).then((res)=>setMenu(res.data)) 
  }, [id])
  
  return (
    <LayoutAuthenticated>
      <h1>Categorias</h1>    
      {menu && (<FormMenu menu = {menu} />) }
    </LayoutAuthenticated>
  )
} 

export default  EditPage  