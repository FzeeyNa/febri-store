'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/components/AuthProvider';
import { supabase } from '@/lib/supabase';
import { formatPrice } from '@/lib/products';
import { History, Package, Clock, CheckCircle2, XCircle, RefreshCw, ShoppingBag, LogIn, Lock } from 'lucide-react';

export default function RiwayatPage() {
  const { user, profile, loading: authLoading } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) fetchOrders();
    else if (!authLoading) setLoading(false);
  }, [user, authLoading]);

  const fetchOrders = async () => {
    setLoading(true);
    // Try fetching by user_id first, fallback to contact_wa
    let { data, error } = await supabase
      .from('orders')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if ((!data || data.length === 0) && profile?.whatsapp) {
      // Fallback: find orders by WhatsApp number
      const res = await supabase
        .from('orders')
        .select('*')
        .eq('contact_wa', profile.whatsapp)
        .order('created_at', { ascending: false });
      if (res.data) data = res.data;
    }

    setOrders(data || []);
    setLoading(false);
  };

  const statusConfig = {
    pending: { label: 'Menunggu Pembayaran', icon: <Clock size={14} />, class: 'status-pending' },
    processing: { label: 'Sedang Diproses', icon: <RefreshCw size={14} />, class: 'status-processing' },
    done: { label: 'Selesai', icon: <CheckCircle2 size={14} />, class: 'status-completed' },
    cancelled: { label: 'Dibatalkan', icon: <XCircle size={14} />, class: 'status-cancelled' },
  };

  if (authLoading) {
    return (
      <div className="order-status-page">
        <div className="container" style={{ textAlign: 'center' }}>
          <p style={{ color: 'var(--color-text-secondary)' }}>Memuat...</p>
        </div>
      </div>
    );
  }

  // Not logged in - show login notice
  if (!user) {
    return (
      <div className="order-status-page">
        <div className="container">
          <div style={{ maxWidth: 500, margin: '0 auto' }}>
            <div className="order-status-card fade-in" style={{ textAlign: 'center', padding: 48 }}>
              <div style={{
                width: 80,
                height: 80,
                background: 'rgba(212,160,23,0.12)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 24px',
              }}>
                <Lock size={36} color="var(--color-accent)" />
              </div>
              <h2 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: 12 }}>Login Diperlukan</h2>
              <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.95rem', marginBottom: 8, lineHeight: 1.7 }}>
                Untuk melihat riwayat pembelian, kamu harus login terlebih dahulu.
              </p>
              <p style={{ color: 'var(--color-text-muted)', fontSize: '0.85rem', marginBottom: 32, lineHeight: 1.6 }}>
                Semua histori order akan tersimpan di akun kamu dan bisa dilihat kapan saja setelah login.
              </p>
              <Link href="/login" className="btn btn-primary btn-lg" style={{ justifyContent: 'center', width: '100%' }}>
                <LogIn size={18} /> Masuk ke Akun
              </Link>
              <div style={{ marginTop: 16 }}>
                <p style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)' }}>
                  Belum punya akun? <Link href="/register" style={{ color: 'var(--color-accent)', fontWeight: 600 }}>Daftar sekarang</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="order-status-page">
      <div className="container">
        <div style={{ maxWidth: 700, margin: '0 auto' }}>
          <div className="order-status-card fade-in" style={{ marginBottom: 24 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
              <History size={24} color="var(--color-accent)" />
              <h1 style={{ fontSize: '1.5rem', marginBottom: 0 }}>Riwayat Pembelian</h1>
            </div>
            <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem' }}>
              Semua riwayat order kamu di Febristore
            </p>
          </div>

          {loading ? (
            <div style={{ textAlign: 'center', padding: 40 }}>
              <p style={{ color: 'var(--color-text-secondary)' }}>Memuat riwayat...</p>
            </div>
          ) : orders.length === 0 ? (
            <div className="order-status-card fade-in" style={{ textAlign: 'center', padding: 40 }}>
              <ShoppingBag size={48} color="var(--color-text-muted)" style={{ marginBottom: 16 }} />
              <h3 style={{ marginBottom: 8 }}>Belum Ada Order</h3>
              <p style={{ color: 'var(--color-text-secondary)', marginBottom: 24, fontSize: '0.9rem' }}>
                Kamu belum pernah melakukan pembelian. Yuk top up sekarang!
              </p>
              <Link href="/#games" className="btn btn-primary">
                <Package size={16} /> Top Up Sekarang
              </Link>
            </div>
          ) : (
            orders.map(order => (
              <div key={order.id} className="order-status-card fade-in" style={{ marginBottom: 16 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16, flexWrap: 'wrap', gap: 8 }}>
                  <span style={{ fontWeight: 700, fontSize: '0.95rem' }}>{order.order_number}</span>
                  <span className={`status-badge ${statusConfig[order.status]?.class}`}>
                    {statusConfig[order.status]?.icon} {statusConfig[order.status]?.label}
                  </span>
                </div>
                <div className="order-summary-row">
                  <span className="label">Game ID</span>
                  <span>{order.game_user_id}{order.game_server_id ? ` (${order.game_server_id})` : ''}</span>
                </div>
                <div className="order-summary-row">
                  <span className="label">Pembayaran</span>
                  <span>{order.payment_method || '-'}</span>
                </div>
                <div className="order-summary-row">
                  <span className="label">Tanggal</span>
                  <span>{new Date(order.created_at).toLocaleString('id-ID', { dateStyle: 'medium', timeStyle: 'short' })}</span>
                </div>
                <div className="order-summary-total">
                  <span>Total</span>
                  <span className="price">{formatPrice(order.price_paid)}</span>
                </div>
                {order.admin_note && (
                  <div style={{ marginTop: 12, padding: 10, background: 'rgba(59,130,246,0.1)', borderRadius: 8, border: '1px solid rgba(59,130,246,0.2)' }}>
                    <p style={{ fontSize: '0.8rem', color: 'var(--color-info)' }}>Note: {order.admin_note}</p>
                  </div>
                )}
              </div>
            ))
          )}

          <div style={{ textAlign: 'center', marginTop: 20 }}>
            <Link href="/" className="btn btn-secondary btn-sm">Kembali ke Beranda</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
