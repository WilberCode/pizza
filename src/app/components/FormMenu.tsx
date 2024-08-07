import { ChangeEvent, FormEvent, useEffect, useState } from "react"; 
import useForm from "../hooks/useForm" 
import Input from "../components/Input";
import Button from "../components/Button"; 
import axios from "axios";
import { CategoryProps, MenuProps, Property } from "../../../typings";
import { ArrowUpTrayIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { toast } from "react-toastify";
import { uploadImage } from "@/app/lib/uploadImage"; 
import Properties from "@/app/components/Properties"; 
import { redirect, useRouter } from "next/navigation";
import useCategories from "../hooks/useCategories";

 
const FormMenu = ({menu}:{menu?:MenuProps}) => {

   const router = useRouter() 
  const [savingMenu, setSavingMenu] = useState<boolean>(false)  
  
  const [sizes, setSizes] = useState<Property[]>(menu?.sizes || [])
  const [extraIngredientPrices, setExtraIngredientPrices] = useState<Property[]>(menu?.extraIngredientPrices || []) 
   
  const {form,handleChange,setForm} = useForm<MenuProps>({
    name:"",
    description:"",
    price:0,   
  })    


  const {categories} = useCategories()
  const [category, setCategory] = useState(menu?.category || '') 

/* console.log(sizes); 
 */

  useEffect(() => {
 
    if (menu) {
        const {sizes, extraIngredientPrices,...menuData} = menu  
        setForm(prevForm =>({...prevForm, ...menuData}))    
    } 
   

  }, [menu, setForm])
  const saveMenu = async(e: FormEvent<HTMLFormElement>) => {
    e.preventDefault() 
    console.log(sizes);
    const menu = {
        ...form,
        sizes,
        extraIngredientPrices,
        category
    }   

    
     setSavingMenu(true) 
    
    

    if (menu?._id) {
        const saveMenuPromise = axios.put('/api/menu',menu).then(res=>{    
            if (!res.data.error) {   
                setSavingMenu(false)  
            }else{
                throw new Error("Error al actualizar el producto")
            }
        }).catch(err=>{  
            setSavingMenu(false) 
            throw new Error("Error al actualizar el producto")
        }) 
        await toast.promise(saveMenuPromise, { 
            pending: "Actualizando...", 
            success: {
                render: "Actualizado!",
                autoClose: 1000, 
              },
            error: "Error al actualizar el producto",  
            
        })  
        return router.push('/menu-items/edit/'+menu?._id)
        
    }else{
        const saveMenuPromise = axios.post('/api/menu',menu).then(res=>{    
            if (!res.data.error) {   
                setSavingMenu(false)  
            }else{
                throw new Error("Error al crear el producto")
            }
        }).catch(err=>{  
            setSavingMenu(false) 
            throw new Error("Error al crear el producto")
        }) 
        await toast.promise(saveMenuPromise, { 
            pending: "Creando...", 
            success: {
                render: "Producto creado correctamente",
                autoClose: 1000, 
              },
            error: "Error al crear el producto",  
            
        })  
         
        return router.push('/menu-items')
    }

  



  }  

  const handleImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
        const file = files[0];     
        const uploadImagePromise  =  uploadImage(file).then(url=>{ 
            if (url) {
                setForm({
                    ...form,
                    image: url,
                }); 
            } 
        }).catch(error=>{
            throw new Error("Error al subir la imagen")
        }) 

        await toast.promise(uploadImagePromise, { 
            pending: "Subiendo la imagen...", 
            success: {
                render: "Imagen subida exitosamente",
                autoClose: 1000, 
              },
            error: "Error al subir la imagen",  
            
        }) 
    }
  };


  const deleteMenu = ()=>{ 
    const deleteMenuPromise = axios.delete('/api/menu?id='+menu?._id).then(res=>{
        if (!res.data.error) {
            setSavingMenu(false)
        }else{
            throw new Error("Error al eliminar el producto")
        }
    }).catch(err=>{
        setSavingMenu(false)
        throw new Error("Error al eliminar el producto")
    })
   toast.promise(deleteMenuPromise, {
        pending: "Eliminando...",
        success: {
            render: "Producto eliminado correctamente",
            autoClose: 1000,
          },
        error: "Error al eliminar el producto",

    }).then((data)=>{ 
        router.push('/menu-items') 
    }).catch(err=>{
        console.log(err);

    })
      
  }



  return ( 
      <div className="flex max-md:flex-col max-w-[600px] mx-auto gap-6 py-10 ">
                        <div className="flex justify-center ">  
                            <div className="  " >   
                                <div  className="relative group   bg-gray-200  w-[150px]  h-[150px]   rounded-lg overflow-hidden border border-gray-200" >   
                                        {form.image && ( 
                                            <>
                                                    <span onClick={()=>setForm({...form, image:null})} className=" bg-black bg-opacity-80 border inline-flex items-center justify-center cursor-pointer w-[30px] h-[30px]    active:scale-75 ease-in-out scale-100 rounded-full  place-content-center absolute top-2 right-2 z-[2] text-white " > 
                                                        <XMarkIcon className="w-5 h-5 text-white fill-current " /> 
                                                    </span>
                                                <img  src={form.image as string}    className="w-full h-full object-cover object-center rounded-lg  z-[1]  !relative  transition-all ease-in-out    "  alt="imagen" />
                                            </>  
                                        )} 
                                        {form.image == "" && ( 

                                            <div role="status" className="absolute -translate-x-1/2 -translate-y-1/2 top-2/4 left-1/2">
                                            <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/></svg>
                                            <span className="sr-only">Loading...</span>
                                            </div>
                                        )}

                                </div>  
                                        
                                <label className={` inline-flex items-center gap-1 btn mt-2 w-full justify-center text-gray-700 bg-gray-200 hover:bg-gray-300 font-semibold rounded-lg px-3 py-2 cursor-pointer `} >
                                    <ArrowUpTrayIcon className="w-6 h-6" /> 
                                    <span className="" >{form.image?'Cambiar':'Subir'}  </span>
                                    <input  type="file"  onChange={handleImageChange}   className="hidden" />  
                                </label>
                            </div>  
                        </div>
                        <div className="flex-grow">
                           <form onSubmit={saveMenu}  >
                                <Input handleChange={handleChange} type="text" placeholder="Nombre" name="name"  value={ form.name }  />
                                <div  className="mt-3" >
                                    <Input handleChange={handleChange} type="text" placeholder="Descripción" name="description"   value={form.description} />   
                                </div>
                                <div  className="mt-3 " >
                                    <Input handleChange={handleChange} type="number" placeholder="Precio" name="price"   value={form.price}  />   
                                     
                                </div>     
                                <div  className="mt-3 " >
                                     <label htmlFor="category" >
                                        <span className="text-sm mb-1 block"  >Categoría</span> 
                                        <select onChange={(e)=>setCategory(e.target.value)}  value={category}  id="category"  className={`px-3 py-2 border  border-gray-400 rounded-lg w-full ${categories?.some((c:CategoryProps) => c?._id === category)?'bg-gray-100':'bg-white'}`}  >
                                            <option value="" >Ninguno</option> 
                                            {!!categories.length && categories?.map((category:CategoryProps,i) =>( 
                                                <option   key={i} value={category?._id}>{category?.name}</option>  
                                            ) )} 
                                        </select>
                                    
                                    </label>       
                                </div>     
                                <div  className="mt-3 " >
                                   <Properties name="Tamaños" propertiesParent={sizes} setPropertiesParent={setSizes} />          
                                </div>     
                                <div  className="mt-3 " >
                                   <Properties name="Ingredientes adicionales" propertiesParent={extraIngredientPrices} setPropertiesParent={setExtraIngredientPrices} />          
                                </div>     
                                <Button  type="submit"  className="w-full mt-3" disabled={savingMenu} >{menu?'Actualizar':'Crear'} </Button>
                           </form>  
                           {menu && <Button onClick={deleteMenu} outline className="w-full mt-3" disabled={savingMenu} >Eliminar este Menú</Button>}

                         </div> 
       </div>
  
  )
} 

export default  FormMenu  