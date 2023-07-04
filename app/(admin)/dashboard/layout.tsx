import "@/styles/global.css";

import SideBar from "@/components/navbar/SideBar";

export const metadata = {
  title: "Next.js 13 + PlanetScale + NextAuth + Tailwind CSS",
  description: "A user admin dashboard configured with Next.js, PlanetScale, NextAuth, Tailwind CSS, TypeScript, ESLint, and Prettier.",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="container flex gap-6">
      <aside>
        <SideBar />
      </aside>
      <main className="flex w-full flex-1 flex-col pl-4 pr-6">{children}</main>
    </div>
  );
}
