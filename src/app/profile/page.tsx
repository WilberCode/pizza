'use client'; 
import { useSession } from "next-auth/react"
import Button from "../components/Button"; 
import Input from "../components/Input";
import useForm from "../hook/useForm"; 
import { ChangeEvent, FormEvent,  useEffect, useState } from "react"; 
import { redirect } from "next/navigation"; 
import axios from "axios";
import { toast } from "react-toastify";
import { ArrowUpTrayIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { uploadImage } from "../lib/uploadImage"; 
 
type formProps = {
    name?: string;
    email?: string;
    image?: string | null;
}

const Page = () => {

    const { data: session, status } = useSession();


    const {form, setForm,  handleChange } =  useForm<formProps>({name:"",  email:"", image:""})
    const [updatingUser, setUpdatingUser] = useState<boolean>(false) 
 
    useEffect(() => {
        if (status === 'authenticated' && session?.user) { 
            setForm({
                ...session.user
             } as formProps); 

        }  
    }, [session, status]); 

    if (status === 'loading') {
        return <div>Loading...</div>
    }
    if (status === 'unauthenticated') {
        return  redirect('/login')
    } 
   
    const updateInfo = async(e: FormEvent<HTMLFormElement>) => {
        e.preventDefault() 
        setUpdatingUser(true)
        const updatingToast = toast.loading('Actualizando...',{autoClose: 100}) 
        await axios.put('/api/profile',form).then(res=>{     
            if (res.data.error) {
                toast.dismiss(updatingToast)  
                toast.success(res.data.message,{autoClose: 2000})
                setUpdatingUser(false)
            }  
        }).catch(err=>{  
            setUpdatingUser(false)
            
        })
    }  
 
    const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files && files[0]) {
            const file = files[0]; 
          try {
            const url = await uploadImage(file);
            setForm({
                ...form,
                image: url,
            }); 
          } catch (error) {
            console.error("Error al subir la imagen:", error);
          }
        }
      };
    
  
    return ( 

            <main>
                <div className="container">
                    <div className="flex max-w-[600px] mx-auto gap-6 py-10 ">
                        <div className=" ">  
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
                                        <input  type="file"  onChange={handleFileChange}   className="hidden" />  
                                    </label>
                                </div> 


                        </div>
                        <div className="flex-grow">
                           <form onSubmit={updateInfo}  >
                                <Input handleChange={handleChange} type="text" placeholder="Nombre" name="name"  value={ form.name } disabled={updatingUser} />
                                <div  className="mt-3" >
                                    <Input handleChange={handleChange} type="email" placeholder="Correo" name="email"   value={form.email} disabled/>   
                                </div>
                                <Button type="submit"  className="w-full mt-3" disabled={updatingUser} >Guardar cambios</Button>
                           </form>  
                         </div> 
                    </div>
                </div> 
            </main>
    )
}

export default Page
