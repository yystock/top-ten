import "../globals.css";

import ToasterProvider from "@/app/providers/ToasterProvider";
import SideBar from "../components/SideBar";

export const metadata = {
  title: "Next.js 13 + PlanetScale + NextAuth + Tailwind CSS",
  description: "A user admin dashboard configured with Next.js, PlanetScale, NextAuth, Tailwind CSS, TypeScript, ESLint, and Prettier.",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-screen bg-gray-50">
      <body className="h-screen flex">
        
          <SideBar />
       
        <ToasterProvider />
        {children}
      </body>
    </html>
  );
}
