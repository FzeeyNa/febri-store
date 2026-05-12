'use client';
import { useState, useEffect } from 'react';
import { STORE_INFO } from '@/lib/products';
import { X, MessageCircle, Send } from 'lucide-react';

export default function WelcomeModal() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const dismissed = localStorage.getItem('febristore_welcome_dismissed');
    if (!dismissed) {
      const timer = setTimeout(() => setShow(true), 800);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setShow(false);
  };

  const handleDontShow = () => {
    localStorage.setItem('febristore_welcome_dismissed', 'true');
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={handleClose}><X size={20} /></button>
        
        <div className="modal-header-icon">
          <MessageCircle size={32} color="var(--color-accent)" />
        </div>
        
        <h2 className="modal-title">Selamat Datang di Febristore!</h2>
        <p className="modal-subtitle">Top Up Game Murah & Terpercaya</p>

        <div className="modal-body">
          <p style={{ marginBottom: 16, lineHeight: 1.7 }}>
            Hai! Terima kasih sudah mengunjungi <strong>Febristore</strong>. Untuk info promo, update harga, 
            atau bantuan, silakan hubungi admin kami langsung via WhatsApp.
          </p>

          <div className="modal-contact-card">
            <div className="modal-contact-item">
              <MessageCircle size={18} />
              <div>
                <span className="modal-contact-label">WhatsApp Admin</span>
                <span className="modal-contact-value">{STORE_INFO.whatsapp}</span>
              </div>
            </div>
            <div className="modal-contact-item">
              <Send size={18} />
              <div>
                <span className="modal-contact-label">TikTok</span>
                <span className="modal-contact-value">{STORE_INFO.tiktok}</span>
              </div>
            </div>
          </div>

          <p style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', marginTop: 16 }}>
            Follow kami untuk info promo, berita, dan update terbaru!
          </p>
        </div>

        <div className="modal-actions">
          <a
            href={`${STORE_INFO.whatsappLink}?text=${encodeURIComponent('Halo Febristore! Saya mau tanya-tanya tentang layanan top up.')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
            style={{ justifyContent: 'center', flex: 1 }}
          >
            <MessageCircle size={18} /> Chat Admin
          </a>
          <button className="btn btn-secondary" onClick={handleClose} style={{ flex: 1, justifyContent: 'center' }}>
            Nanti Saja
          </button>
        </div>

        <label className="modal-checkbox" onClick={handleDontShow}>
          <input type="checkbox" />
          <span>Jangan tampilkan lagi</span>
        </label>
      </div>
    </div>
  );
}
