import Image from "next/image";
import Banner from "./components/Banner";
import Product from "./components/Product";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <Banner/>
        <section  className="pb-20" >
            <div className="container">
                <div  className="text-center py-5" >
                    <h4  className="text-xl" >Mira nuestro </h4>
                    <h2 className="text-5xl text-orange-600 font-italic " >Menú </h2>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-8">
                    {[1,1,1,1,1,1,1,1].map((i, j) => <Product key={j} />) }
                </div>
            </div>
        </section>
    </main>
  );
}
