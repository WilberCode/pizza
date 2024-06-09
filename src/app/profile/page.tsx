'use client';
import Link from "next/link"
import ButtonLink from "../components/ButtonLink"
import { signOut, useSession } from "next-auth/react"
import Button from "../components/Button";

 

const Page = () => {

    const session = useSession()
    const status = session?.status
   
    
    return ( 

            <main>
                <div className="container">
                   sss
                </div> 
            </main>
    )
}

export default Page
