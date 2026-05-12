'use client';
import { useState, useEffect } from 'react';
import { X, AlertTriangle, Clock, UserCheck, ShieldCheck } from 'lucide-react';

export default function DisclaimerModal({ gameSlug }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const dismissed = localStorage.getItem(`febristore_disclaimer_${gameSlug}`);
    if (!dismissed) {
      setShow(true);
    }
  }, [gameSlug]);

  const handleClose = () => {
    setShow(false);
  };

  const handleDontShow = () => {
    localStorage.setItem(`febristore_disclaimer_${gameSlug}`, 'true');
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={handleClose}><X size={20} /></button>
        
        <div className="modal-header-icon" style={{ background: 'rgba(245,158,11,0.15)' }}>
          <AlertTriangle size={32} color="var(--color-warning)" />
        </div>

        <h2 className="modal-title">PENGINGAT!</h2>

        <div className="modal-body">
          <div className="disclaimer-item">
            <Clock size={18} className="disclaimer-icon" />
            <p>Proses top up <strong>cepat</strong> namun <strong>tidak instan otomatis</strong> karena pengisian dilakukan <strong>manual oleh admin</strong>.</p>
          </div>

          <div className="disclaimer-item">
            <UserCheck size={18} className="disclaimer-icon" />
            <p>Setelah melakukan pembayaran, <strong>konfirmasi via WhatsApp</strong> agar admin segera memproses order kamu.</p>
          </div>

          <div className="disclaimer-item">
            <ShieldCheck size={18} className="disclaimer-icon" />
            <p>Estimasi pengisian <strong>1-15 menit</strong> setelah pembayaran dikonfirmasi. Admin akan menghubungi kamu via WhatsApp setelah selesai.</p>
          </div>

          <div style={{ marginTop: 16, padding: '12px 16px', background: 'rgba(59,130,246,0.1)', borderRadius: 'var(--radius-sm)', border: '1px solid rgba(59,130,246,0.2)' }}>
            <p style={{ fontSize: '0.85rem', color: 'var(--color-info)', lineHeight: 1.6 }}>
              Aman! Pilihan list diamondnya sudah ada, <strong>AMAN LANGSUNG GAS ORDER</strong>. Pelayanan No 1 Pokoknya!
            </p>
          </div>
        </div>

        <div className="modal-actions">
          <button className="btn btn-primary" onClick={handleClose} style={{ width: '100%', justifyContent: 'center' }}>
            Saya Mengerti, Lanjutkan
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
