'use client';
import { useState } from 'react';
import Link from 'next/link';
import { STORE_INFO, formatPrice } from '@/lib/products';
import { Search, Package, Clock, RefreshCw, CheckCircle2, XCircle, MessageCircle, ArrowLeft, Info, Loader2 } from 'lucide-react';

export default function CekOrderPage() {
  const [orderId, setOrderId] = useState('');
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    if (!orderId.trim()) {
      setError('Masukkan Order ID!');
      return;
    }
    setLoading(true);
    setError('');
    setOrder(null);

    try {
      const res = await fetch(`/api/orders?orderNumber=${encodeURIComponent(orderId.trim())}`);
      const data = await res.json();

      if (!res.ok || !data.order) {
        setError('Order tidak ditemukan. Pastikan Order ID benar.');
      } else {
        setOrder(data.order);
      }
    } catch (e) {
      setError('Gagal mengecek order. Coba lagi nanti.');
    }
    setLoading(false);
  };

  const statusLabels = {
    pending: { label: 'Menunggu Pembayaran', icon: <Clock size={14} />, className: 'status-pending' },
    processing: { label: 'Sedang Diproses', icon: <RefreshCw size={14} />, className: 'status-processing' },
    done: { label: 'Selesai', icon: <CheckCircle2 size={14} />, className: 'status-completed' },
    cancelled: { label: 'Dibatalkan', icon: <XCircle size={14} />, className: 'status-cancelled' },
  };

  return (
    <div className="order-status-page">
      <div className="container">
        <div className="order-status-card fade-in">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, marginBottom: 8 }}>
            <Package size={24} color="var(--color-accent)" />
            <h1 style={{ fontSize: '1.5rem', marginBottom: 0 }}>Cek Status Order</h1>
          </div>
          <p style={{ color: 'var(--color-text-secondary)', textAlign: 'center', marginBottom: 24, fontSize: '0.9rem' }}>
            Masukkan Order ID untuk mengecek status pesanan kamu
          </p>
          <div className="form-group" style={{ marginBottom: 16 }}>
            <label>Order ID</label>
            <input
              type="text"
              placeholder="Contoh: FS-20250509-1234"
              value={orderId}
              onChange={e => setOrderId(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSearch()}
            />
          </div>
          <button
            className="btn btn-primary"
            style={{ width: '100%', justifyContent: 'center', marginBottom: 16 }}
            onClick={handleSearch}
            disabled={loading}
          >
            {loading ? <><Loader2 size={16} className="spin" /> Mencari...</> : <><Search size={16} /> Cek Order</>}
          </button>

          {error && (
            <div style={{ padding: 16, background: 'rgba(239,68,68,0.1)', borderRadius: 12, border: '1px solid rgba(239,68,68,0.2)', textAlign: 'center', marginBottom: 16 }}>
              <p style={{ fontSize: '0.9rem', color: 'var(--color-error)' }}>{error}</p>
            </div>
          )}

          {order && (
            <div style={{ padding: 20, background: 'rgba(16,185,129,0.05)', borderRadius: 12, border: '1px solid rgba(16,185,129,0.2)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16, flexWrap: 'wrap', gap: 8 }}>
                <h3 style={{ fontSize: '1rem' }}>Detail Order</h3>
                <span className={`status-badge ${statusLabels[order.status]?.className || 'status-pending'}`}>
                  {statusLabels[order.status]?.icon} {statusLabels[order.status]?.label || order.status}
                </span>
              </div>
              <div className="order-summary-row"><span className="label">Order ID</span><span>{order.order_number}</span></div>
              <div className="order-summary-row"><span className="label">Customer</span><span>{order.customer_name || '-'}</span></div>
              <div className="order-summary-row"><span className="label">User ID</span><span>{order.game_user_id}{order.game_server_id ? ` (${order.game_server_id})` : ''}</span></div>
              <div className="order-summary-row"><span className="label">Pembayaran</span><span>{order.payment_method || '-'}</span></div>
              <div className="order-summary-total">
                <span>Total</span>
                <span className="price">{formatPrice(order.price_paid)}</span>
              </div>
              {order.admin_note && (
                <div style={{ marginTop: 16, padding: 12, background: 'rgba(59,130,246,0.1)', borderRadius: 8, border: '1px solid rgba(59,130,246,0.2)' }}>
                  <p style={{ fontSize: '0.8rem', color: 'var(--color-info)' }}><Info size={12} /> Note: {order.admin_note}</p>
                </div>
              )}
              <div style={{ marginTop: 16, textAlign: 'center' }}>
                <a
                  href={`${STORE_INFO.whatsappLink}?text=${encodeURIComponent(`Halo Febristore, saya mau tanya status order: ${order.order_number}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary btn-sm"
                >
                  <MessageCircle size={14} /> Tanya via WhatsApp
                </a>
              </div>
            </div>
          )}

          {!order && !error && (
            <div style={{ padding: 16, background: 'rgba(245,158,11,0.08)', borderRadius: 12, border: '1px solid rgba(245,158,11,0.2)', textAlign: 'center' }}>
              <p style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)' }}>
                <Info size={14} style={{ verticalAlign: 'middle', marginRight: 4 }} /> Atau tanya langsung via WhatsApp
              </p>
              <a
                href={`${STORE_INFO.whatsappLink}?text=${encodeURIComponent('Halo Febristore, saya mau cek status order saya')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary btn-sm"
                style={{ marginTop: 8 }}
              >
                <MessageCircle size={14} /> Hubungi WhatsApp
              </a>
            </div>
          )}

          <div style={{ textAlign: 'center', marginTop: 20 }}>
            <Link href="/" className="btn btn-secondary btn-sm"><ArrowLeft size={14} /> Kembali ke Beranda</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
