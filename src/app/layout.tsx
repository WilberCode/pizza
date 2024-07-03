import type { Metadata } from "next";
import { Inter, Open_Sans } from "next/font/google";
import "./globals.css";
import Footer from "./layouts/Footer";
import Header from "./layouts/Header";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Providers from "./Providers";
import { useSession } from "next-auth/react";
import Authenticated from "./layouts/LayoutAuthenticated";
import { getServerSession } from "next-auth";
import { authOptions } from "./lib/authOptions";

const inter = Inter({ 
  subsets: ["latin"],  
  display: 'swap',
  variable:'--font-inter'
});

const openSans = Open_Sans({ 
  subsets: ["latin"], 
  display: 'swap',
  variable:'--font-open-sans'
 });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  
  return (
    <html lang="es" className={`${openSans.variable}  ${inter.variable} `}>
      <body   className=" flex flex-col h-screen" >
        <Providers >   
          <Header />
          <ToastContainer />   
              {children} 
          <Footer/>
        </Providers>
        
      </body>
    </html>
  );
}
