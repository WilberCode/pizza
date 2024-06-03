/* import PrimaryButton from "./PrimaryButton"
 */

const Product = () => {
  return (
    <article  className="bg-orange-100 hover:bg-white p-6 rounded-2xl shadow-md text-center " >
        <img  className="w-full max-w-[200px] mx-auto " src="/images/pizza.png" alt="" />
        <div  className="my-6" >
            <h3  className="text-2xl font-bold " >Pizza de pepperoni</h3>
            <p  className="mt-3" >Deléitese con nuestra deliciosa pizza, elaborada con los ingredientes más frescos y horneada a la perfección.</p>
        </div>
       {/*  <PrimaryButton  className="tracking-wide" > Agregar al Carrito S/12 </PrimaryButton> */}
    </article>
  )
}

export default Product
