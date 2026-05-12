import Link from 'next/link';
import { STORE_INFO } from '@/lib/products';
import { MessageCircle, Music, Package, Camera } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <h3>FEBRISTORE</h3>
            <p>Top up game terpercaya dengan harga terjangkau. Proses cepat, aman, dan terpercaya. Melayani Mobile Legends, PUBG Mobile, Free Fire, Roblox & Jasa Joki.</p>
          </div>
          <div>
            <h4>Layanan</h4>
            <ul className="footer-links">
              <li><Link href="/topup/mobile-legends">Mobile Legends</Link></li>
              <li><Link href="/topup/pubg-mobile">PUBG Mobile</Link></li>
              <li><Link href="/topup/free-fire">Free Fire</Link></li>
              <li><Link href="/topup/roblox">Roblox</Link></li>
            </ul>
          </div>
          <div>
            <h4>Kontak</h4>
            <ul className="footer-links">
              <li><a href={STORE_INFO.whatsappLink} target="_blank" rel="noopener noreferrer"><MessageCircle size={14} style={{ verticalAlign: 'middle', marginRight: 4 }} />WhatsApp</a></li>
              <li><a href={`https://tiktok.com/${STORE_INFO.tiktok}`} target="_blank" rel="noopener noreferrer"><Music size={14} style={{ verticalAlign: 'middle', marginRight: 4 }} />TikTok</a></li>
              <li>
                <span className="footer-coming-soon-link">
                  <Camera size={14} style={{ verticalAlign: 'middle', marginRight: 4 }} />
                  Instagram
                  <span className="coming-soon-tag">Coming Soon</span>
                </span>
              </li>
              <li><Link href="/cek-order"><Package size={14} style={{ verticalAlign: 'middle', marginRight: 4 }} />Cek Order</Link></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Febristore. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
