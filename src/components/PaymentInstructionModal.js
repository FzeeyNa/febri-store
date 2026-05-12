'use client';
import { X, QrCode, Wallet, Building2, Copy, CheckCircle2, ArrowRight, MessageCircle, Info } from 'lucide-react';
import { useState } from 'react';
import { STORE_INFO, formatPrice } from '@/lib/products';

const PAYMENT_STEPS = {
  qris: [
    'Buka aplikasi e-wallet (Dana, GoPay, OVO, ShopeePay, dll)',
    'Pilih menu "Scan QR" atau "Bayar"',
    'Scan QR Code yang ditampilkan',
    'Masukkan jumlah yang harus dibayar',
    'Konfirmasi pembayaran',
    'Screenshot bukti pembayaran',
    'Klik "Konfirmasi via WhatsApp" untuk kirim bukti bayar',
  ],
  dana: [
    'Buka aplikasi Dana di HP kamu',
    'Pilih menu "Kirim" atau "Transfer"',
    'Masukkan nomor Dana: 085882862864',
    'Masukkan jumlah yang harus dibayar',
    'Periksa kembali detail transfer',
    'Konfirmasi pembayaran',
    'Screenshot bukti pembayaran',
    'Klik "Konfirmasi via WhatsApp" untuk kirim bukti bayar',
  ],
  gopay: [
    'Buka aplikasi Gojek atau GoPay di HP kamu',
    'Pilih menu "Bayar" atau "Transfer"',
    'Masukkan nomor GoPay: 085694852030',
    'Masukkan jumlah yang harus dibayar',
    'Periksa kembali detail transfer',
    'Konfirmasi pembayaran',
    'Screenshot bukti pembayaran',
    'Klik "Konfirmasi via WhatsApp" untuk kirim bukti bayar',
  ],
  'bank-jago': [
    'Buka aplikasi Bank Jago atau mobile banking',
    'Pilih menu "Transfer"',
    'Pilih tujuan transfer ke Bank Jago',
    'Masukkan nomor rekening: 109013093317',
    'Masukkan jumlah yang harus dibayar',
    'Periksa kembali detail transfer',
    'Konfirmasi pembayaran',
    'Screenshot bukti pembayaran',
    'Klik "Konfirmasi via WhatsApp" untuk kirim bukti bayar',
  ],
};

const PAYMENT_ICONS = {
  qris: <QrCode size={32} />,
  dana: <Wallet size={32} />,
  gopay: <Wallet size={32} />,
  'bank-jago': <Building2 size={32} />,
};

export default function PaymentInstructionModal({ payment, totalPrice, onClose, onConfirm }) {
  const [copied, setCopied] = useState(false);
  
  if (!payment) return null;

  const steps = PAYMENT_STEPS[payment.id] || [];

  const copyNumber = () => {
    if (payment.accountNumber) {
      navigator.clipboard.writeText(payment.accountNumber);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()} style={{ maxWidth: 520 }}>
        <button className="modal-close" onClick={onClose}><X size={20} /></button>
        
        <div className="modal-header-icon" style={{ background: 'rgba(212,160,23,0.15)' }}>
          {PAYMENT_ICONS[payment.id]}
        </div>

        <h2 className="modal-title">Cara Bayar via {payment.name}</h2>
        <p className="modal-subtitle">Ikuti langkah-langkah berikut untuk melakukan pembayaran</p>

        {/* Account Number */}
        {payment.accountNumber && (
          <div className="payment-instruction-number">
            <div>
              <span className="payment-instruction-label">Nomor {payment.name}</span>
              <span className="payment-instruction-value">{payment.accountNumber}</span>
            </div>
            <button className="payment-copy-btn" onClick={copyNumber}>
              {copied ? <><CheckCircle2 size={14} /> Tersalin</> : <><Copy size={14} /> Salin</>}
            </button>
          </div>
        )}

        {/* QRIS Image */}
        {payment.id === 'qris' && (
          <div style={{ margin: '16px auto', textAlign: 'center', padding: 16, background: '#fff', borderRadius: 12, maxWidth: 280 }}>
            <img src="/qris.jpg" alt="QRIS Febristore" style={{ width: '100%', borderRadius: 8 }} />
          </div>
        )}

        {/* Total */}
        {totalPrice && (
          <div className="payment-instruction-total">
            <span>Total Pembayaran</span>
            <span className="price">{formatPrice(totalPrice)}</span>
          </div>
        )}

        {/* Steps */}
        <div className="payment-instruction-steps">
          {steps.map((step, i) => (
            <div key={i} className="payment-instruction-step">
              <div className="payment-step-number">{i + 1}</div>
              <p>{step}</p>
            </div>
          ))}
        </div>

        {/* Info */}
        <div className="payment-instruction-info">
          <Info size={14} />
          <p>Setelah transfer, admin akan memproses order kamu dalam 1-15 menit. Kamu akan dihubungi via WhatsApp.</p>
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', gap: 12, marginTop: 20 }}>
          <button className="btn btn-primary" onClick={onConfirm} style={{ flex: 1, justifyContent: 'center' }}>
            <CheckCircle2 size={16} /> Saya Sudah Bayar
          </button>
          <button className="btn btn-secondary" onClick={onClose} style={{ justifyContent: 'center' }}>
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
}
