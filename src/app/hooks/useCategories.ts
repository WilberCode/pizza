 
import axios from "axios"
import { useEffect,useState } from "react"

 
 
const useCategories = () => {

    const [categories, setCategories] = useState([]) 

    useEffect(() => {  
        getCategories() 
    },[0])   
    const getCategories = () =>{
        axios.get('/api/category').then((res) =>{
            if (res.data.category) {
                setCategories(res.data.category)  
              } 
        }) 
   }
   return {categories,getCategories}
}
  

export default useCategories