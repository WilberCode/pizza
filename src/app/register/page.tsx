"use client"
import React, { use, useState } from 'react'
import Input from '../components/Input'
import useForm from '../hook/useForm'
import Button from '../components/Button'
import axios from 'axios'
import Link from 'next/link'
import { toast } from 'react-toastify'
import {CheckIcon } from '@heroicons/react/24/outline'

function Page() {
 const {form,handleChange} =  useForm({email:'',password:''}) 

 const [creatingUser, setCreatingUser] = useState<boolean>(false)
 const [createdUser, setCreatedUser] = useState<boolean>(false) 
 const submitRegister = async(e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault()
    setCreatingUser(true)
    await axios.post('/api/register',form).then(res=>{    
                    if (res.data.error) {
                        setCreatingUser(false) 
                        setCreatedUser(false) 
                        toast.error(res.data.message,{autoClose: 2000})
                    } 
                    else{ 
                        setCreatingUser(false) 
                        setCreatedUser(true)
                        toast.success(res.data.message,{autoClose: 2000})
                    }    
                }).catch(err=>{ 
                    setCreatingUser(false) 
                      console.log(err); 
                      console.log('Ocurrio un error'); 
                })
 }
  return (
    <div className="py-10" >
        <div className="max-w-[400px] mx-auto">
            <h1 className="text-center" >Crear una cuenta</h1>
            {createdUser && 
             <div className="text-center mt-6 mb-6 " > 
                <span  className=" bg-green-700 rounded-full w-[35px] h-[35px] inline-flex items-center justify-center " ><CheckIcon  className="size-5 text-white" /></span> <br />
                Ya puedes <Link href="/login"  className='underline font-semibold' >ingresar sesión{'>>'}  
             </Link> </div>
            }
            <form onSubmit={submitRegister} className="space-y-3"> 
                <Input type='email' name="email" placeholder="Correo" handleChange={handleChange} value={form?.email} disabled={creatingUser}  />  
                <Input type='password' name="password" placeholder="Contraseña" handleChange={handleChange} value={form?.password} disabled={creatingUser}  /> 
                <Button type="submit"  className='w-full' disabled={creatingUser}>Regitrarse</Button> 
            </form> 
            <hr className='my-5' />
            <div className="  text-gray-700 text-center"> ¿Ya tengo cuenta?
                <Link href="/login"  className='underline font-semibold' > Iniciar Sesion &raquo; </Link>
            </div>
        </div>
    </div>
  )
}

export default Page