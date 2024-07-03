'use client';  
import UserTabs from "../components/UserTabs";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import useProfile from "../hooks/useProfile";

 
const LayoutAuthenticated = ({children}:any) => {

    const { data: session, status } = useSession();
    const { loading, user} = useProfile()

    if (status === 'loading') {
        return <div>Loading...</div>
    }  
    if (status === 'unauthenticated') {
        return  redirect('/login')
    }    
    if (loading) {
        return <div>Loading...</div>
    }  
    if(!user?.admin) {
        return 'No eres Admin'
    }   
 

  return (
    <>
    <div className="container">  
        <UserTabs admin={user?.admin}/>
        {children} 
    </div>
    </>
  )
}

export default LayoutAuthenticated