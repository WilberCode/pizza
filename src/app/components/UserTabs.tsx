import Link from "next/link"
import { usePathname } from "next/navigation"

type Props = {
    admin:boolean
}
 
const UserTabs = ({admin}:Props) => {
    const current_path =  usePathname()
  const currentPath = (link_name:string)=>{ 
    return  current_path?.includes(link_name ) ? 'bg-primary-500 text-white' : 'bg-gray-200 text-gray-600'
  } 
  const classLink = 'px-4 py-2 rounded-full font-semibold ';
  return (
    <div  className="flex gap-2 mt-8 mb-4 ">
        <Link href="/profile" className={`${classLink} ${currentPath('/profile')}`} >Profile</Link>
       
        {admin && (
              <>
              <Link href="/categories" className={`${classLink} ${currentPath('/categories')}`}>Categorias</Link>
              <Link href="/menu-items" className={`${classLink} ${currentPath('/menu-items')}`}>Lista de Menu</Link>
              <Link href="/users" className={`${classLink} ${currentPath('/users')}`}>Usiarios</Link>
            </>
        )  
        }
    </div>
  )
}

export default UserTabs