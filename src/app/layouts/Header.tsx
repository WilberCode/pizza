import Link from "next/link"
import ButtonLink from "../components/ButtonLink"

 

const Header = () => {
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
                       {/*   {auth?.user?(
                            <Link  href={route('logout')} method="post" as="button"  className="py-4 px-4 rounded-full font-extrabold bg-orange-600 text-white hover:bg-orange-700 ">Cerrar Sessión</Link>

                        ):(
                            <>
                            <ul  className="flex items-center gap-4" >
                                <li>  <Link href={route('login')} className="  font-bold" >Iniciar sessión</Link>  </li>
                                <li>  <ButtonLink href={route('register')} className="py-3 !rounded-full font-extrabold !text-sm " >Registrarse</ButtonLink>  </li>
                            </ul>
                            </>
                        )} */}
                        <ul  className="flex items-center gap-4" >
                            <li>  <Link href={'/login'} className="  font-bold" >Iniciar sessión</Link>  </li>
                            <li>  <ButtonLink href={'/register'} className=" font-extrabold  " size={'lg'} >Registrarse</ButtonLink>  </li>
                        </ul>
                    </nav>
                 </div>
           </div>
        </div>
    </header>
  )
}

export default Header
