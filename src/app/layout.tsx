import { Playfair_Display, Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/organisms/Header';
import { Providers } from '@/store/provider';
import { Toaster } from 'react-hot-toast';

const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair' });
const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body className="bg-brand-50 text-gray-900 font-sans antialiased min-h-screen">
        <Providers>
          <Header />
          {children}
          
          <Toaster 
            position="bottom-right" 
            toastOptions={{
              duration: 3000,
              style: {
                background: '#800020', 
                color: '#ffffff',
                borderRadius: '16px',
                padding: '16px 24px',
                fontSize: '14px',
                fontWeight: '900',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                boxShadow: '0 10px 25px -5px rgba(128, 0, 32, 0.3)',
              },
              success: {
                iconTheme: {
                  primary: '#ffffff',
                  secondary: '#800020',
                },
              },
            }} 
          />
        </Providers>
      </body>
    </html>
  );
}