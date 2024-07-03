'use client'
import { FormEvent, useEffect, useState } from "react"; 
import useForm from "../hooks/useForm" 
import Input from "../components/Input";
import Button from "../components/Button";
import LayoutAuthenticated from "../layouts/LayoutAuthenticated"; 
import axios from "axios";
import { CategoryProps } from "../../../typings";
import { ArchiveBoxXMarkIcon, PencilSquareIcon } from "@heroicons/react/24/outline";
import { toast } from "react-toastify";  

import sweetalert2 from "sweetalert2"; 

type InputProps = {
    category:string;
}

const CategoriesPage = () => {

    const {form,handleChange,setForm} = useForm<InputProps>({
        category: "",
    }) 

    const [categories, setCategories] = useState<CategoryProps[]>([]) 
    const [editedCategory, setEditedCategory] = useState(false) 
    const [currentCategory, setCurrentCategory] = useState<CategoryProps>() 
    const [swalProps, setSwalProps] = useState({});

    useEffect(() => { 
      getCategory() 
    }, []); 

     const getCategory = ()=>{
        axios.get('/api/category').then(res=>{
          if (res.data.category) {
            setCategories(res.data.category)  
          } 
        }).catch(err=>{ 
            console.log(err); 
        })
     }

    const saveCategories = (e:FormEvent<HTMLFormElement>) =>{ 
      e.preventDefault()  
      if (editedCategory) {

          let categorries_back =   [...categories]
      
          const category =  categorries_back.find((item:CategoryProps) => item._id === currentCategory?._id)   
          if (category) {
            category.name = form.category
            category.slug = form.category.toLocaleLowerCase()
          } 

          const updatedCategory =  axios.put('/api/category',category).then(res=>{
            if (!res.data.error) {  
              getCategory()   
            } else{
              throw new Error("Error al eliminar")
            }
          }).catch(err=>{
            console.log(err);
          })
          showMessage(updatedCategory,"Actualizando...","Actualizado","Error al actualizar")
          setEditedCategory(false)
          setForm({category:''})   

      
      } else {
        const newCategory = {name:form.category, slug: form.category.toLocaleLowerCase()}   
        const createdCategory =  axios.post('/api/category',newCategory).then(res=>{
          if (!res.data.error) { 
            getCategory()   
          } else{
            throw new Error("Error al eliminar")
          }
        }).catch(err=>{
          console.log(err);
        })
        showMessage(createdCategory,"Guardando...","Guardado!","Error al guardar")
        setForm({category:''})   
      }
    } 
  
    const editCategory = (category:any) =>{ 
        setForm({...form,category:category.name})   
        setCurrentCategory(category)
        setEditedCategory(true) 

    } 
    const deleteCategory = async(category:any) =>{  
      sweetalert2.fire({
        title: '¿Está seguro?', 
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: '¡Sí, bórralo!',
      }).then((result) => {
        if (result.isConfirmed) {
          const deletedCategory =  axios.delete('/api/category?id='+category?._id).then(res=>{
            if (!res.data.error) {    
              getCategory() 
            } else{
              throw new Error("Error al eliminar")
            }
          }).catch(err=>{
            console.log(err);
          })
          showMessage(deletedCategory,"Eliminando...","Eliminado","Error al eliminar")
        }
      });
    
  
    } 
    const showMessage  = async(promiseCategory:any,pending:string,render:string,error:string) =>{
      await toast.promise(promiseCategory, { 
        pending:pending, 
        success: {
            render: render,
            autoClose: 1000, 
          },
        error: error,   
    })    
    }
    const cancelEdit = (e:React.MouseEvent<HTMLButtonElement, MouseEvent>) =>{  
         e.preventDefault();
        setEditedCategory(false)
        setForm({category:''}) 
    } 
 

  return (
    <LayoutAuthenticated>
      <h1>Agregar categorias</h1>  
      <form onSubmit={saveCategories} className="mt-5">
        <section  className="md:flex items-center w-full md:space-x-2 " >  
          <Input handleChange={handleChange} name="category" value={form.category} placeholder="Nombre  de la categoria"  ></Input> 
            <Button  type="submit" className="mt-auto" >  {editedCategory?'Actualizar':'Agregar'} </Button>  
            {editedCategory &&  <Button  onClick={cancelEdit} outline type="submit" className="mt-auto" > Cancelar </Button>  }
           
        </section>
        <h3 className="mt-8" >Lista de categorías</h3>
        <section  className="mt-6"> 
           <ul  className="space-y-2" > 
            {categories?.map((category:any,index:number)=>(
              <li  className="px-3 py-2 rounded-lg border border-gray-300 bg-gray-100 text-gray-700 font-semibold flex justify-between  items-center"  key={index}>
                {category.name}
                <div  className="space-x-2" >
                  <Button size="sm" outline  onClick={()=>editCategory(category)}  > <PencilSquareIcon className="size-6 mr-1" /><span className="max-sm:hidden">Editar</span></Button> 
                  <Button size="sm" outline onClick={()=>deleteCategory(category)}  >  <ArchiveBoxXMarkIcon className="size-6 mr-1" /><span className="max-sm:hidden">Borrar</span></Button> 
                </div>
               </li>
            ))}
          </ul>
          {categories.length === 0 && <p className="bg-gray-50 rounded-lg px-3 py-6 border border-gray-200 text-center text-gray-600" >No hay categorías registradas</p>}
          </section>
        </form> 
    </LayoutAuthenticated>
  )
} 

export default  CategoriesPage  