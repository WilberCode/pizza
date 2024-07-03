import { ChangeEvent, useState } from "react"
 

const useForm = <T extends Object>(initialState:T) => {
  const [form, setForm] = useState(initialState)
  const handleChange =  (e:ChangeEvent<HTMLInputElement>|ChangeEvent<HTMLTextAreaElement>) => { 
    
     const {name,value} = e.target
     setForm({...form,[name]:value})
  }
  return  {form, handleChange, setForm}
}

export default useForm