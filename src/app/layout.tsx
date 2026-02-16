import { Playfair_Display, Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/organisms/Header';
import { Providers } from '@/store/provider';
import { Toaster } from 'react-hot-toast';
import { ClerkProvider } from '@clerk/nextjs'

const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair' });
const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="en" className={`${playfair.variable} ${inter.variable}`} suppressHydrationWarning>
        <body className="bg-brand-50 text-gray-900 font-sans antialiased min-h-screen">
          <Providers>
            <div className="relative flex flex-col min-h-screen">
              <Header />
              <main className="flex-grow">
                {children}
              </main>
            </div>
            
            <Toaster 
              position="bottom-right" 
              toastOptions={{
                duration: 3000,
                className: 'font-sans', 
                style: {
                  background: '#800020', 
                  color: '#ffffff',
                  borderRadius: '16px',
                  padding: '16px 24px',
                  fontSize: '12px', 
                  fontWeight: '800',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                },
              }} 
            />
          </Providers>
        </body>
      </html>
    </ClerkProvider>
  );
}