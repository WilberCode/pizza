import type { Metadata } from "next";
import { Inter, Open_Sans } from "next/font/google";
import "./globals.css";
import Footer from "./layouts/Footer";
import Header from "./layouts/Header";

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${openSans.variable}  ${inter.variable} `}>
      <body  >
        <Header />
          {children}
        <Footer/>
        
      </body>
    </html>
  );
}
