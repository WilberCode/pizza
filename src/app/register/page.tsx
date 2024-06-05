"use client"
import React, { use, useState } from 'react'
import Input from '../components/Input'
import useForm from '../hook/useForm'
import Button from '../components/Button'
import axios from 'axios'
import Link from 'next/link'

function page() {
 const {form,handleChange} =  useForm({email:'',password:''}) 

 const [creatingUser, setCreatingUser] = useState<boolean>(false)
 const [createdUser, setCreatedUser] = useState<boolean>(false)
 const [errorMessage, setErrorMessage] = useState<string>('')

 const submitRegister = async(e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault()
    setCreatingUser(true)
    await axios.post('/api/register',form).then(res=>{  
                       if (res.data.error) {
                           setCreatedUser(false)
                           setCreatingUser(false) 
                           setErrorMessage(res.data.message) 
                       } 
                       else{
                            setErrorMessage(res.data.message)
                            setCreatingUser(false) 
                            setCreatedUser(true)
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
            <div className="text-center" > Registrado!! puedes <Link href="/login"  className='underline font-semibold' >Ingresar{'>>'}</Link> </div>
            }
            <form onSubmit={submitRegister} className="space-y-3"> 
                <Input type='email' name="email" placeholder="Correo" handleChange={handleChange} value={form?.email} disabled={creatingUser}  />  
                <Input type='password' name="password" placeholder="Contraseña" handleChange={handleChange} value={form?.password} disabled={creatingUser}  /> 
                <Button type="submit"  className='w-full' disabled={creatingUser}>Regitrarse</Button> 
            </form>
            {errorMessage && <div className="text-red-500 text-center">{errorMessage}</div>}
        </div>
    </div>
  )
}

export default page