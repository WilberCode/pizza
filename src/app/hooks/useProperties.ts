 
import { useState } from "react";
import { Property } from "../../../typings";

 
const useProperties = <T extends Property[]>(initialState: T ) => {
  const [properties, setProperties] = useState(initialState);
 
  const addProperty = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setProperties((prev) => {
      return [...prev, { name: '', price: '' }] as T;
    });
  };

  const handlePropertyChange = (i: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const newProps = [...properties];
    if (name === 'name') {
      newProps[i].name = value;
    } else {
      newProps[i].price = value;
    }
    setProperties(newProps as T); 
  };

  const removeProperty = (index: number) => {
    setProperties((prev) => [...prev].filter((_, i) => i !== index) as T);
  };

  return { addProperty, handlePropertyChange, removeProperty, properties, setProperties };
};

export default useProperties;