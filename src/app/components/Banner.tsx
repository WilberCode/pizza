import Image from "next/image"
import Button from "./Button"
 
import { ArrowRightCircleIcon } from '@heroicons/react/24/outline' 

const Banner = () => {
  return (
    <section>
        <div className="container">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center  ">
                <div>
                    <h1 className="text-5xl" >Todo es perfecto <br /> con una <span className="text-orange-600" >Pizza</span> </h1>
                    <p  className="mt-8" >La pizza es la pieza que falta para completar cada día, una alegría de vida sencilla pero deliciosa.</p>
                    <div  className=" inline-flex gap-4 mt-10 " >
              
                        <Button className="uppercase !rounded-full !font-bold " >PEDIR AHORA<ArrowRightCircleIcon  className="ml-1 w-6" ></ArrowRightCircleIcon> </Button>
                        <Button  className="bg-white !text-black border-2 !rounded-full !border-black   focus:!bg-white hover:!bg-black focus:!text-black active:!outline-black focus:outline-black hover:!text-white " >Leer más <ArrowRightCircleIcon  className="ml-1 w-6 " ></ArrowRightCircleIcon> </Button>
                    </div>
                </div>
                <div>  
                      <Image src={'/images/pizza.png'} alt={'Pizza'}   layout="fill" objectFit="cover" className=" !relative animate-[spin_50s_linear_infinite] hover:animate-pulse  " /> 
              
                </div>
            </div>
        </div>
    </section>
  )
}

export default Banner
