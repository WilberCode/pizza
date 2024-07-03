import { ArchiveBoxXMarkIcon, ArrowDownIcon, ChevronDownIcon, PlusIcon } from "@heroicons/react/24/outline"
import useProperties from "../hooks/useProperties"
import Button from "./Button"
import { Property } from "../../../typings";
import {useEffect, useState } from "react"; 



type PropertiesProps = { 
    propertiesParent: Property[];
    setPropertiesParent: (properties: Property[]) => void;
    name: string;
}
 
const Properties = ({propertiesParent,setPropertiesParent,name}:PropertiesProps) => {
  const {handlePropertyChange,addProperty,removeProperty, properties,setProperties } = useProperties(propertiesParent )
  const [open, setOpen] = useState(false)


    useEffect(() => {
      setProperties(propertiesParent);
    }, [propertiesParent, setProperties]);

    useEffect(() => {
      setPropertiesParent(properties);
    }, [properties, setPropertiesParent]);
  
    const handleTab = ( e: React.MouseEvent<HTMLButtonElement>)=>{
      e.preventDefault()
      setOpen(!open)
    }
 
   
  return (
    <div  className="bg-gray-200 rounded-lg" > 
    <button  className="inline-flex items-center justify-between w-full px-3 py-3 font-semibold " onClick={handleTab} >{name} ({properties.length}) <ChevronDownIcon className={`size-6 ${open?'rotate-180':''}`} /> </button>
    {open &&<div className="p-3 -mt-3">
        {
            properties?.length > 0 && properties.map((property:Property,i:number)=>(
            <div key={i}  className="grid grid-cols-[1fr_1fr_auto] gap-4 pt-4 items-end " >
                <label><span  className="text-sm" >Nombre</span>
                    <input onChange={(e)=>handlePropertyChange(i,e)} type="text" name="name" value={property.name}  />
                </label>
                <label><span  className="text-sm" >Precio</span>
                    <input onChange={(e)=>handlePropertyChange(i,e)} type="text" name="price" value={property.price} /> 
                </label>
                <Button size="sm" outline className="!py-2" onClick={()=>removeProperty(i)} > <ArchiveBoxXMarkIcon className="size-6" /></Button>
            </div>
            )) 
        }   

        <Button  onClick={addProperty} size="sm" outline className= "w-full mt-4 !py-2">   <PlusIcon className="size-6" /> Agregar {name}</Button>
        </div> }
    </div>
  )
}

export default Properties