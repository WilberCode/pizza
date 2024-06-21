'use client';
import Link from "next/link"
import ButtonLink from "../components/ButtonLink"
import { signOut, useSession } from "next-auth/react"
import Button from "../components/Button"; 
import Input from "../components/Input";
import useForm from "../hook/useForm";
import Image from "next/image";
import { FormEvent,  useEffect, useState } from "react"; 
import { redirect } from "next/navigation";
import { UserCircleIcon } from "@heroicons/react/16/solid";
import axios from "axios";
import { toast } from "react-toastify";

 
type formProps = {
    name?: string;
    email?: string;
    image?: string;
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
    return ( 

            <main>
                <div className="container">
                    <div className="flex max-w-[600px] mx-auto gap-6 py-10 ">
                        <div className=" "> 
                        {form.image ? (
                            <Image width="96" height="96" priority className="rounded-xl" src={form.image} alt={form.name as string} />
                        ) : (
                            <div className="rounded-xl w-24 h-24 bg-gray-200 flex items-center justify-center">
                                <span> <UserCircleIcon  className="size-20 text-gray-800 " /> </span>
                            </div>
                        )}
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
