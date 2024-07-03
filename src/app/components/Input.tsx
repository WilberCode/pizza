import { ChangeEvent } from "react";

type InputProps = {
    handleChange: (e: ChangeEvent<HTMLInputElement>)=>void;
    name:string;
    value?:string|number;
    placeholder:string | React.JSX.Element;
    type?:string; 
    disabled?:boolean;
    defaultValue?:string; 

} 

const Input = ({handleChange,name, value, placeholder,type, disabled, defaultValue}:InputProps) => {
 
  return   (
        <label htmlFor={name}  className="w-full block  " > 
          <span  className="text-sm mb-1 block">{placeholder} </span>  
        
          <input type={type} id={name} name={name} value={value} defaultValue={defaultValue}   onChange={handleChange} disabled={disabled} className={` px-4  ${value?'bg-gray-100   ':'bg-white'}`}/>
       
        </label>   
  ) 
}

export default Input