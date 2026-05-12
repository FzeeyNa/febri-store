'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/components/AuthProvider';
import { supabase } from '@/lib/supabase';
import { STORE_INFO, formatPrice } from '@/lib/products';
import { Shield, Package, CheckCircle2, Clock, XCircle, MessageCircle, RefreshCw, Search, Filter, Send } from 'lucide-react';

export default function AdminPage() {
  const { user, profile, isAdmin, loading: authLoading } = useAuth();
  const router = useRouter();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [updatingId, setUpdatingId] = useState(null);

  useEffect(() => {
    if (!authLoading && (!user || !isAdmin)) {
      router.push('/login');
    }
  }, [user, isAdmin, authLoading, router]);

  useEffect(() => {
    if (isAdmin) fetchOrders();
  }, [isAdmin]);

  const fetchOrders = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching orders:', error);
    }
    setOrders(data || []);
    setLoading(false);
  };

  const updateStatus = async (orderId, newStatus, order) => {
    setUpdatingId(orderId);
    const { error } = await supabase
      .from('orders')
      .update({ status: newStatus })
      .eq('id', orderId);

    if (!error) {
      setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
    }
    setUpdatingId(null);
  };

  const sendWhatsApp = (order, type) => {
    let msg = '';
    if (type === 'done') {
      msg = `Halo ${order.customer_name || 'Kak'}! 👋\n\nOrder kamu sudah *SELESAI* ✅\n\n📋 Order ID: ${order.order_number}\n🆔 User ID: ${order.game_user_id}${order.game_server_id ? ` (${order.game_server_id})` : ''}\n💰 Total: ${formatPrice(order.price_paid)}\n\nDiamond/item sudah masuk ke akun kamu. Silakan dicek ya!\n\nTerima kasih sudah order di Febristore 🙏`;
    } else if (type === 'processing') {
      msg = `Halo ${order.customer_name || 'Kak'}! 👋\n\nPembayaran kamu sudah diterima! ✅\nOrder sedang *DIPROSES*.\n\n📋 Order ID: ${order.order_number}\n\nMohon ditunggu sebentar ya, admin sedang mengisi. Kami akan kabari lagi setelah selesai.\n\nTerima kasih! 🙏`;
    } else {
      msg = `Halo ${order.customer_name || 'Kak'}! 👋\n\nMaaf, order kamu *DIBATALKAN*.\n\n📋 Order ID: ${order.order_number}\n\nSilakan hubungi admin untuk info lebih lanjut.\n\nTerima kasih! 🙏`;
    }

    const phone = order.contact_wa?.replace(/^0/, '62').replace(/[^0-9]/g, '');
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  const completeAndNotify = async (order) => {
    await updateStatus(order.id, 'done', order);
    sendWhatsApp(order, 'done');
  };

  const filteredOrders = orders.filter(o => {
    const matchFilter = filter === 'all' || o.status === filter;
    const matchSearch = !search || 
      o.order_number?.toLowerCase().includes(search.toLowerCase()) ||
      o.customer_name?.toLowerCase().includes(search.toLowerCase()) ||
      o.contact_wa?.includes(search) ||
      o.game_user_id?.includes(search);
    return matchFilter && matchSearch;
  });

  const statusConfig = {
    pending: { label: 'Menunggu', icon: <Clock size={14} />, class: 'status-pending' },
    processing: { label: 'Diproses', icon: <RefreshCw size={14} />, class: 'status-processing' },
    done: { label: 'Selesai', icon: <CheckCircle2 size={14} />, class: 'status-completed' },
    cancelled: { label: 'Dibatalkan', icon: <XCircle size={14} />, class: 'status-cancelled' },
  };

  const counts = {
    all: orders.length,
    pending: orders.filter(o => o.status === 'pending').length,
    processing: orders.filter(o => o.status === 'processing').length,
    done: orders.filter(o => o.status === 'done').length,
    cancelled: orders.filter(o => o.status === 'cancelled').length,
  };

  if (authLoading || !isAdmin) {
    return (
      <div className="admin-page">
        <div className="container" style={{ textAlign: 'center', paddingTop: 100 }}>
          <p style={{ color: 'var(--color-text-secondary)' }}>Memuat...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-page">
      <div className="container">
        {/* Header */}
        <div className="admin-header fade-in">
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <Shield size={28} color="var(--color-accent)" />
            <div>
              <h1>Admin Panel</h1>
              <p>Kelola order masuk dari customer</p>
            </div>
          </div>
          <button className="btn btn-secondary" onClick={fetchOrders}>
            <RefreshCw size={16} /> Refresh
          </button>
        </div>

        {/* Stats */}
        <div className="admin-stats fade-in">
          {[
            { key: 'all', label: 'Semua', count: counts.all, color: 'var(--color-text)' },
            { key: 'pending', label: 'Menunggu', count: counts.pending, color: 'var(--color-warning)' },
            { key: 'processing', label: 'Diproses', count: counts.processing, color: 'var(--color-info)' },
            { key: 'done', label: 'Selesai', count: counts.done, color: 'var(--color-success)' },
          ].map(s => (
            <div
              key={s.key}
              className={`admin-stat-card ${filter === s.key ? 'active' : ''}`}
              onClick={() => setFilter(s.key)}
            >
              <span className="admin-stat-count" style={{ color: s.color }}>{s.count}</span>
              <span className="admin-stat-label">{s.label}</span>
            </div>
          ))}
        </div>

        {/* Search */}
        <div className="admin-search fade-in">
          <Search size={18} />
          <input
            type="text"
            placeholder="Cari order (ID, nama, WA, game ID)..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>

        {/* Orders List */}
        <div className="admin-orders">
          {loading ? (
            <div style={{ textAlign: 'center', padding: 40 }}>
              <p style={{ color: 'var(--color-text-secondary)' }}>Memuat data...</p>
            </div>
          ) : filteredOrders.length === 0 ? (
            <div style={{ textAlign: 'center', padding: 40 }}>
              <Package size={40} color="var(--color-text-muted)" style={{ marginBottom: 12 }} />
              <p style={{ color: 'var(--color-text-secondary)' }}>Tidak ada order ditemukan</p>
            </div>
          ) : (
            filteredOrders.map(order => (
              <div key={order.id} className="admin-order-card fade-in">
                <div className="admin-order-top">
                  <div className="admin-order-info">
                    <span className="admin-order-id">{order.order_number}</span>
                    <span className={`status-badge ${statusConfig[order.status]?.class}`}>
                      {statusConfig[order.status]?.icon} {statusConfig[order.status]?.label}
                    </span>
                  </div>
                  <span className="admin-order-date">
                    {new Date(order.created_at).toLocaleString('id-ID', { dateStyle: 'medium', timeStyle: 'short' })}
                  </span>
                </div>

                <div className="admin-order-details">
                  <div className="admin-order-row">
                    <span className="label">Customer</span>
                    <span>{order.customer_name || '-'}</span>
                  </div>
                  <div className="admin-order-row">
                    <span className="label">WhatsApp</span>
                    <span>{order.contact_wa || '-'}</span>
                  </div>
                  <div className="admin-order-row">
                    <span className="label">Game ID</span>
                    <span>{order.game_user_id}{order.game_server_id ? ` (${order.game_server_id})` : ''}</span>
                  </div>
                  <div className="admin-order-row">
                    <span className="label">Pembayaran</span>
                    <span>{order.payment_method || '-'}</span>
                  </div>
                  <div className="admin-order-row">
                    <span className="label">Total</span>
                    <span style={{ fontWeight: 700, color: 'var(--color-accent)' }}>{formatPrice(order.price_paid)}</span>
                  </div>
                </div>

                <div className="admin-order-actions">
                  {order.status === 'pending' && (
                    <>
                      <button
                        className="btn btn-sm"
                        style={{ background: 'rgba(59,130,246,0.15)', color: 'var(--color-info)' }}
                        onClick={() => { updateStatus(order.id, 'processing', order); sendWhatsApp(order, 'processing'); }}
                        disabled={updatingId === order.id}
                      >
                        <Clock size={14} /> Proses
                      </button>
                      <button
                        className="btn btn-sm"
                        style={{ background: 'rgba(239,68,68,0.15)', color: 'var(--color-error)' }}
                        onClick={() => { updateStatus(order.id, 'cancelled', order); sendWhatsApp(order, 'cancelled'); }}
                        disabled={updatingId === order.id}
                      >
                        <XCircle size={14} /> Batalkan
                      </button>
                    </>
                  )}
                  {order.status === 'processing' && (
                    <button
                      className="btn btn-sm btn-primary"
                      onClick={() => completeAndNotify(order)}
                      disabled={updatingId === order.id}
                    >
                      <CheckCircle2 size={14} /> Selesaikan & Kirim WA
                    </button>
                  )}
                  {order.status !== 'done' && order.status !== 'cancelled' && (
                    <button
                      className="btn btn-sm"
                      style={{ background: 'rgba(16,185,129,0.15)', color: 'var(--color-success)' }}
                      onClick={() => sendWhatsApp(order, order.status === 'processing' ? 'done' : 'processing')}
                    >
                      <MessageCircle size={14} /> Chat WA
                    </button>
                  )}
                  {(order.status === 'done' || order.status === 'cancelled') && (
                    <button
                      className="btn btn-sm btn-secondary"
                      onClick={() => sendWhatsApp(order, order.status)}
                    >
                      <MessageCircle size={14} /> Chat WA
                    </button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
