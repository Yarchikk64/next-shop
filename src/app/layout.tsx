import StoreProvider from '@/store/StoreProvider';
import './globals.css';
import Header from '@/components/organisms/Header';
import { Toaster } from 'react-hot-toast';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <StoreProvider>
          <Toaster position='bottom-right' />
          <Header />
          {children}
        </StoreProvider>
      </body>
    </html>
  );
}