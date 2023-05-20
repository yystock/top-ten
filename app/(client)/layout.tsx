import './globals.css'
import Nav from "../components/navbar/Nav"
import { Nunito } from 'next/font/google'
import ClientOnly from '../components/ClientOnly';
import ToasterProvider from '../providers/ToasterProvider';
import LoginModal from '@/app/components/modals/LoginModal';
import RegisterModal from '@/app/components/modals/RegisterModal';
import { ThemeProvider } from '../providers/ThemeProvider';


export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

const font = Nunito({ 
  subsets: ['latin'], 
});
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {


  return (
    <html lang="en">
      <body
        className={`
        min-h-screen scroll-smooth
      bg-white text-slate-900
        antialiased 
      dark:bg-slate-900 dark:text-slate-100 ${font.className}`}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <ClientOnly>
            <ToasterProvider />
            <LoginModal />
            <RegisterModal />
            {/* @ts-expect-error Server Component */}
            <Nav />
          </ClientOnly>
          <div className="pb-20 pt-28">{children}</div>
        </ThemeProvider>
      </body>
    </html>
  );
}