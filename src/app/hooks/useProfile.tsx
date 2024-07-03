import axios from "axios";
import { useEffect, useState } from "react";
import { userProps } from "../../../typings";

 
const useProfile = () => {

    const [user, setUser] = useState<userProps>()
    const [loading, setLoading] = useState(true)
    useEffect(() => { 
        axios.get('/api/profile').then(res=>{
            if (res.data.user) {
                setUser(res.data.user)
                setLoading(false)  
            }else{
                setLoading(false)
            }
        }).catch(err=>{
            setLoading(false) 

        })
    }, []); 

  return {
    user,
    loading
  }
}

export default useProfile