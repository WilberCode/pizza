import { ChangeEvent } from "react";

type InputProps = {
    handleChange: (e: ChangeEvent<HTMLInputElement>)=>void;
    name:string;
    value:string|number;
    placeholder:string | React.JSX.Element;
    type?:string; 
    disabled?:boolean
} 

const Input = ({handleChange,name, value, placeholder,type, disabled}:InputProps) => {

  let  input_field =     <input type={type} id={name} name={name} value={value}  onChange={handleChange} disabled={disabled} className={` px-4  ${!value?'bg-primary-500 bg-opacity-5 ':'bg-white'}`}/>
  return   (
        <label htmlFor={name}  className="w-full block  " > 
          <span  className="text-sm mb-1 block">{placeholder} </span>  
        
          {name!=='price'?( 
             <>{input_field}</> 
          ):
          (
          <div  className="flex relative" >
            <span className="block absolute left-4 top-2">{'S/'}</span>
            {input_field} 
          </div>
          )
          }
        </label>   
  ) 
}

export default Input