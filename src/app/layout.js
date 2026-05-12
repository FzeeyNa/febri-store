import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { AuthProvider } from '@/components/AuthProvider';
import WelcomeModal from '@/components/WelcomeModal';
import ChatCSButton from '@/components/ChatCSButton';

export const metadata = {
  title: 'Febristore - Top Up Game Murah & Terpercaya',
  description: 'Febristore - Website top up game terpercaya. Mobile Legends, PUBG Mobile, Free Fire, Roblox & Jasa Joki. Proses cepat, harga murah, pembayaran aman!',
  icons: { icon: '/favicon.ico' },
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body>
        <AuthProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
          <WelcomeModal />
          <ChatCSButton />
        </AuthProvider>
      </body>
    </html>
  );
}
