"use client"
import React, { use, useState } from 'react'
import Input from '../components/Input'
import useForm from '../hooks/useForm'
import Button from '../components/Button'
import axios from 'axios'
import Link from 'next/link'
import { toast } from 'react-toastify'
import {CheckIcon } from '@heroicons/react/24/outline'
import { signIn } from 'next-auth/react'

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
            <div className="py-5 text-center relative" >
                <span  className="after:content-[''] after:w-16 after:h-[1px] after:bg-gray-200 after:inline-flex  after:align-middle after:ms-2 before:w-16 before:h-[1px] before:bg-gray-200 before:inline-flex  before:align-middle before:me-2 " >OR</span>
            </div>
            <button onClick={()=>signIn('google',{callbackUrl:'/'})}    className="w-full inline-flex rounded-lg py-2 px-4 justify-center  items-center bg-white border border-gray-300 text-gray-800 hover:bg-gray-100 transition-all active:scale-105 focus:bg-white focus:text-gray-800 active:bg-gray-100 active:text-gray-800 "  >
                Iniciar  con google
                <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 48 48" className='w-6 h-6 ml-1'  ><path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"/><path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"/><path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"/><path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"/></svg>
            </button> 
            <hr className='my-5' />
            <div className="  text-gray-700 text-center"> ¿Ya tengo cuenta?
                <Link href="/login"  className='underline font-semibold' > Iniciar Sesion &raquo; </Link>
            </div>
        </div>
    </div>
  )
}

export default Page