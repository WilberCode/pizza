"use client"
import React, { use, useEffect, useState } from 'react'
import Input from '../components/Input'
import useForm from '../hooks/useForm'
import Button from '../components/Button'
import axios from 'axios'
import Link from 'next/link'
import { toast } from 'react-toastify'   
import { redirect } from 'next/navigation'

function Page() {
 const {form,handleChange} =  useForm({email:'',password:''}) 

 const [creatingUser, setCreatingUser] = useState<boolean>(false)
 const [createdUser, setCreatedUser] = useState<boolean>(false) 

 

    const submitRegister = async(e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        setCreatingUser(true)
        await axios.post('/api/login',form).then(res=>{    
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
                        toast.error('Ocurrio un error, intenta nuevamente',{autoClose: 2000}) 
                    })
    } 
 
    if (createdUser) {
        redirect('/dashboard')
    }
 
 
  return (
    <div className="py-10" >
        <div className="max-w-[400px] mx-auto">
            <h1 className="text-center" >Ingresar sessión</h1> 
            <form onSubmit={submitRegister} className="space-y-3"> 
                <Input type='email' name="email" placeholder="Correo" handleChange={handleChange} value={form?.email} disabled={creatingUser}  />  
                <Input type='password' name="password" placeholder="Contraseña" handleChange={handleChange} value={form?.password} disabled={creatingUser}  /> 
                <Button type="submit"  className='w-full' disabled={creatingUser}>Iniciar Sesion</Button> 
            </form> 
            <hr className='my-5' />
            <div className="  text-gray-700 text-center"> ¿Aun no tengo cuenta?
                <Link href="/register"  className='underline font-semibold' > Registrarse &raquo; </Link>
            </div>
        </div>
    </div>
  )
}

export default Page