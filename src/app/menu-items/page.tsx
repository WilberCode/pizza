'use client'
import { FormEvent, useEffect, useState } from "react";  
import LayoutAuthenticated from "../layouts/LayoutAuthenticated"; 
import axios from "axios";
import { CategoryProps, MenuProps } from "../../../typings";
import ButtonLink from "../components/ButtonLink";
import Link from "next/link";
import Image from "next/image";
 

const MenuPage = () => {
 
  const [menus, setMenus] = useState<MenuProps[]>([])  

  useEffect(() => { 
    getMenus()
  }, []); 

   const getMenus = ()=>{
      axios.get('/api/menu').then(res=>{
        if (res.data.menus) {
          setMenus(res.data.menus)  
        } 
      }).catch(err=>{ 
          console.log(err); 
      })
   }

  return (
    <LayoutAuthenticated> 
      <div className="flex justify-between">
        <h1>Pizzas</h1>
        <ButtonLink href="/menu-items/new">Nuevo</ButtonLink>
      </div>
      <section  className="mt-6"> 
           <ul  className="grid grid-cols-4 gap-8" > 
            {menus?.map((menu:MenuProps,index:number)=>(
              <li  key={index} >
                <Link className="flex flex-col group h-full rounded-lg border border-gray-200 overflow-hidden shadow-sm text-gray-700 font-semibold" href={`/menu-items/edit/${menu._id}`}>
                  <div  className="relative h-40 overflow-hidden " >
                      <Image  src={menu.image as string} alt={menu.name}   layout="fill" objectFit="cover" className="group-hover:scale-105 " /> 
                      <span  className="absolute inline-flex top-3 left-3 z-10 bg-white rounded-lg border border-gray-100 p-2 ">S/{menu.price}</span>
                  </div>
                  <div className="px-5 py-4 ">
                
                    <h2 className="text-lg font-semibold mt-2">{menu.name}</h2>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
          
          </section>
       
    </LayoutAuthenticated>
  )
} 

export default  MenuPage  