'use client';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { STORE_INFO } from '@/lib/products';
import { useAuth } from '@/components/AuthProvider';
import { Menu, X, LogIn, LogOut, Shield, History, User, MessageCircle, Search, Package } from 'lucide-react';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { user, profile, isAdmin, signOut } = useAuth();

  const handleLogout = () => {
    signOut();
    setOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <Link href="/" className="navbar-logo">
          <Image src="/logo.png" alt="Febristore" width={40} height={40} />
          <span>FEBRISTORE</span>
        </Link>

        <button className="mobile-menu-btn" onClick={() => setOpen(!open)} aria-label="Menu">
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>

        <ul className={`navbar-links${open ? ' open' : ''}`}>
          <li><Link href="/" onClick={() => setOpen(false)}>Beranda</Link></li>
          {/* <li><Link href="/#games" onClick={() => setOpen(false)}>Top Up</Link></li>
          <li><Link href="/#joki" onClick={() => setOpen(false)}>Joki</Link></li> */}
          <li><Link href="/cek-order" onClick={() => setOpen(false)}><Search size={14} /> Cek Order</Link></li>
          
          {/* Riwayat - selalu tampil, tapi beri notif login jika belum login */}
          <li><Link href="/riwayat" onClick={() => setOpen(false)}><History size={14} /> Riwayat</Link></li>

          {user ? (
            <>
              {isAdmin && (
                <li><Link href="/admin" onClick={() => setOpen(false)} className="navbar-admin"><Shield size={14} /> Admin</Link></li>
              )}
              <li>
                <button onClick={handleLogout} className="navbar-logout">
                  <LogOut size={14} /> Keluar
                </button>
              </li>
            </>
          ) : (
            <li>
              <Link href="/login" onClick={() => setOpen(false)} className="navbar-login">
                <LogIn size={14} /> Masuk
              </Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}
