 
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"; 
import { storage } from "../../../firebase";
export async function uploadImage(file:any) {
  // Obtener la extensión del archivo
  const fileExtension = file.name.split('.').pop();
  
  // Crear un nombre de archivo único basado en la fecha y hora actual
  const fileName = `${Date.now()}.${fileExtension}`;
  
  // Crear la referencia al archivo en Firebase Storage
  const storageRef = ref(storage, `images/${fileName}`);
  
  try {
    const snapshot = await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(snapshot.ref);
    return downloadURL;
  } catch (error) {
    console.error("Error al subir la imagen:", error);
    throw error;
  }
}