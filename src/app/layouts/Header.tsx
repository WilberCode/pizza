'use client';
import Link from "next/link"
import ButtonLink from "../components/ButtonLink"
import { signOut, useSession } from "next-auth/react"
import Button from "../components/Button";

 

const Header = () => {

    const session = useSession()
    const status = session?.status
   
    
    return (
        <header>

            <div className="container">
            <div className="flex   gap-8 items-center py-2 mt-4">
                    <div>
                        <Link href="/" ><h1 className="text-4xl" >Wph <span  className="text-orange-600" >Pizza</span> </h1></Link>
                    </div>
                    <div className="flex-grow" >
                        <nav className="flex justify-between gap-4 items-center " >
                            <ul  className="flex gap-4 font-bold ">
                                <li> <Link href="/" >Home</Link> </li>
                                <li> <Link href="/menu" >Menu</Link> </li>
                                <li> <Link href="/about" >About</Link> </li>
                                <li> <Link href="/contactanos" >Contact</Link> </li>
                            </ul> 
                            <ul  className="flex items-center gap-4" >
                              
                                    {status === 'authenticated' &&  (
                                        <>
                                          <li><Link href="/profile"  className="hover:underline" > Hola, <strong> {session?.data?.user?.name?.split(' ')[0]}</strong></Link></li>
                                          <li><Button onClick={()=>signOut()} className=" !rounded-full " size="md" >Logout</Button></li>
                                        </>
                                    )}
                                    {status === 'unauthenticated' && (
                                       <>
                                         <li>   <Link href={'/login'} className="  font-bold" >Iniciar sessión</Link>   </li>
                                        <li>  <ButtonLink href={'/register'} className=" font-extrabold  " size={'lg'} >Registrarse</ButtonLink>  </li>
                                       </>
                                    )} 
                             
                               
                            </ul>
                        </nav>
                    </div>
            </div>
            </div>
        </header>
    )
}

export default Header
