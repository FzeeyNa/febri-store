'use client';
import { useState, useMemo } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { getGameBySlug, formatPrice, PAYMENT_METHODS, STORE_INFO, generateOrderId } from '@/lib/products';
import { useAuth } from '@/components/AuthProvider';
import DisclaimerModal from '@/components/DisclaimerModal';
import PaymentInstructionModal from '@/components/PaymentInstructionModal';
import { Zap, MessageCircle, ShieldCheck, Gamepad2, CreditCard, QrCode, Wallet, Building2, CheckCircle2, Loader2, ArrowLeft, PartyPopper, Home, Info } from 'lucide-react';

const PAYMENT_ICONS = {
  qris: <QrCode size={28} />,
  dana: <Wallet size={28} />,
  gopay: <Wallet size={28} />,
  'bank-jago': <Building2 size={28} />,
};

export default function TopUpPage() {
  const params = useParams();
  const router = useRouter();
  const game = getGameBySlug(params.slug);
  const { user } = useAuth();

  const [userId, setUserId] = useState('');
  const [serverId, setServerId] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [customerName, setCustomerName] = useState('');
  const [customerWa, setCustomerWa] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  if (!game) {
    return (
      <div className="topup-page">
        <div className="container" style={{ textAlign: 'center', paddingTop: 60 }}>
          <h1>Game tidak ditemukan</h1>
          <p style={{ color: 'var(--color-text-secondary)', marginTop: 12 }}>Silakan kembali ke halaman utama.</p>
          <Link href="/" className="btn btn-primary" style={{ marginTop: 24 }}><ArrowLeft size={16} /> Kembali ke Beranda</Link>
        </div>
      </div>
    );
  }

  const categories = useMemo(() => {
    const cats = {};
    game.items.forEach(item => {
      if (!cats[item.category]) cats[item.category] = [];
      cats[item.category].push(item);
    });
    return cats;
  }, [game]);

  const getGameImage = (slug) => {
    const map = { 'mobile-legends': '/mlbb.jpeg', 'pubg-mobile': '/pubg.png', 'free-fire': '/freefire.jpeg', 'roblox': '/roblox.jpeg' };
    return map[slug] || '/logo.png';
  };

  const handlePaymentSelect = (pmId) => {
    setSelectedPayment(pmId);
    // Show modal with instructions
    setShowPaymentModal(true);
  };

  const handleSubmit = async () => {
    if (!userId || !selectedItem || !selectedPayment || !customerName || !customerWa) {
      alert('Mohon lengkapi semua data!');
      return;
    }
    if (game.requireServer && !serverId) {
      alert('Mohon masukkan Server ID!');
      return;
    }

    setIsSubmitting(true);
    const orderId = generateOrderId();
    const item = game.items.find(i => i.id === selectedItem);
    const payment = PAYMENT_METHODS.find(p => p.id === selectedPayment);

    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          orderNumber: orderId,
          productItemId: item.id,
          gameUserId: userId,
          gameServerId: serverId || null,
          contactWa: customerWa,
          pricePaid: item.price,
          customerName,
          paymentMethod: payment.name,
          userId: user?.id || null,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        console.error('Order save error:', data.error);
      }
    } catch (e) {
      console.log('Order save skipped:', e);
    }

    const msg = `*ORDER MASUK - FEBRISTORE*\n\nOrder ID: ${orderId}\nGame: ${game.name}\nItem: ${item.name}\nHarga: ${formatPrice(item.price)}\n\nCustomer: ${customerName}\nWhatsApp: ${customerWa}\nUser ID: ${userId}${game.requireServer ? `\nServer: ${serverId}` : ''}\n\nPembayaran: ${payment.name}${payment.accountNumber ? ` (${payment.accountNumber})` : ''}\n\nStatus: Menunggu Pembayaran`;

    setOrderSuccess({ orderId, item, payment, msg });
    setIsSubmitting(false);
  };

  if (orderSuccess) {
    const waLink = `${STORE_INFO.whatsappLink}?text=${encodeURIComponent(orderSuccess.msg)}`;
    return (
      <div className="success-page">
        <div className="container">
          <div className="success-icon">
            <PartyPopper size={56} color="var(--color-accent)" />
          </div>
          <h1 style={{ marginBottom: 8 }}>Order Berhasil Dibuat!</h1>
          <p style={{ color: 'var(--color-text-secondary)', marginBottom: 32 }}>Silakan transfer dan konfirmasi via WhatsApp</p>
          <div className="success-card">
            <h3 style={{ marginBottom: 16, color: 'var(--color-accent)' }}>Detail Order</h3>
            <div className="order-summary-row"><span className="label">Order ID</span><span>{orderSuccess.orderId}</span></div>
            <div className="order-summary-row"><span className="label">Game</span><span>{game.name}</span></div>
            <div className="order-summary-row"><span className="label">Item</span><span>{orderSuccess.item.name}</span></div>
            <div className="order-summary-row"><span className="label">User ID</span><span>{userId}{game.requireServer ? ` (${serverId})` : ''}</span></div>
            <div className="order-summary-row"><span className="label">Pembayaran</span><span>{orderSuccess.payment.name}</span></div>
            {orderSuccess.payment.accountNumber && (
              <div className="order-summary-row"><span className="label">No. Rekening</span><span style={{ fontWeight: 700 }}>{orderSuccess.payment.accountNumber}</span></div>
            )}
            <div className="order-summary-total">
              <span>Total</span>
              <span className="price">{formatPrice(orderSuccess.item.price)}</span>
            </div>
            <div style={{ marginTop: 24, display: 'flex', gap: 12, flexDirection: 'column' }}>
              <a href={waLink} target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ justifyContent: 'center' }}>
                <MessageCircle size={18} /> Konfirmasi via WhatsApp
              </a>
              <Link href="/cek-order" className="btn btn-secondary" style={{ justifyContent: 'center' }}>
                <CheckCircle2 size={18} /> Cek Status Order
              </Link>
              <Link href="/" className="btn btn-secondary" style={{ justifyContent: 'center' }}>
                <Home size={18} /> Kembali ke Beranda
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const selectedItemData = selectedItem ? game.items.find(i => i.id === selectedItem) : null;
  const selectedPaymentData = selectedPayment ? PAYMENT_METHODS.find(p => p.id === selectedPayment) : null;

  return (
    <div className="topup-page">
      <div className="container">
        <DisclaimerModal gameSlug={params.slug} />

        {/* Payment Instruction Modal */}
        {showPaymentModal && selectedPaymentData && (
          <PaymentInstructionModal
            payment={selectedPaymentData}
            totalPrice={selectedItemData?.price}
            onClose={() => setShowPaymentModal(false)}
            onConfirm={() => setShowPaymentModal(false)}
          />
        )}

        {/* Header */}
        <div className="topup-header fade-in">
          <div style={{ width: 100, height: 100, position: 'relative', borderRadius: 12, overflow: 'hidden', border: '2px solid rgba(212,160,23,0.3)', flexShrink: 0 }}>
            <Image src={getGameImage(game.slug)} alt={game.name} fill style={{ objectFit: 'cover' }} />
          </div>
          <div className="topup-header-info">
            <h1>{game.name}</h1>
            <p className="publisher">{game.publisher}</p>
            <div className="topup-header-badges">
              <span><Zap size={14} /> Proses Cepat</span>
              <span><MessageCircle size={14} /> Layanan Chat 24/7</span>
              <span><ShieldCheck size={14} /> Pembayaran Aman</span>
            </div>
          </div>
        </div>

        {/* Step 1: Account Data */}
        <div className="topup-step fade-in">
          <div className="topup-step-header">
            <div className="topup-step-number">1</div>
            <h3>Masukkan Data Akun</h3>
          </div>
          <div className="topup-step-body">
            <div className="form-row">
              <div className="form-group">
                <label>ID Game</label>
                <input type="text" placeholder="Masukkan ID" value={userId} onChange={e => setUserId(e.target.value)} />
              </div>
              {game.requireServer && (
                <div className="form-group">
                  <label>Server</label>
                  <input type="text" placeholder="Masukkan Server" value={serverId} onChange={e => setServerId(e.target.value)} />
                </div>
              )}
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Nama Kamu</label>
                <input type="text" placeholder="Masukkan nama" value={customerName} onChange={e => setCustomerName(e.target.value)} />
              </div>
              <div className="form-group">
                <label>No. WhatsApp</label>
                <input type="text" placeholder="08xxxxxxxxxx" value={customerWa} onChange={e => setCustomerWa(e.target.value)} />
              </div>
            </div>
          </div>
        </div>

        {/* Step 2: Choose Item */}
        <div className="topup-step fade-in">
          <div className="topup-step-header">
            <div className="topup-step-number">2</div>
            <h3>Pilih Nominal</h3>
          </div>
          <div className="topup-step-body">
            {Object.entries(categories).map(([catName, items]) => (
              <div className="items-category" key={catName}>
                <h4>{catName}</h4>
                <div className="items-grid">
                  {items.map(item => (
                    <div key={item.id} className={`item-card${selectedItem === item.id ? ' selected' : ''}`} onClick={() => setSelectedItem(item.id)}>
                      <div className="item-name">{item.name}</div>
                      <div className="item-price">{formatPrice(item.price)}</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Step 3: Payment Method */}
        <div className="topup-step fade-in">
          <div className="topup-step-header">
            <div className="topup-step-number">3</div>
            <h3>Pilih Metode Pembayaran</h3>
          </div>
          <div className="topup-step-body">
            <div className="payment-info-hint">
              <Info size={14} />
              <span>Klik metode pembayaran untuk melihat cara bayar</span>
            </div>
            <div className="payment-grid">
              {PAYMENT_METHODS.map(pm => (
                <div key={pm.id} className={`payment-card${selectedPayment === pm.id ? ' selected' : ''}`} onClick={() => handlePaymentSelect(pm.id)}>
                  <div className="payment-icon">{PAYMENT_ICONS[pm.id]}</div>
                  <div className="payment-name">{pm.name}</div>
                  {pm.accountNumber && <div className="payment-number">{pm.accountNumber}</div>}
                </div>
              ))}
            </div>
            {selectedPayment === 'qris' && (
              <div style={{ marginTop: 20, textAlign: 'center', padding: 20, background: '#fff', borderRadius: 12, maxWidth: 320, margin: '20px auto 0' }}>
                <img src="/qris.jpg" alt="QRIS Febristore" style={{ width: '100%', borderRadius: 8 }} />
                <p style={{ color: '#333', fontSize: '0.85rem', marginTop: 8, fontWeight: 600 }}>Scan QR untuk bayar</p>
              </div>
            )}
          </div>
        </div>

        {/* Order Summary */}
        {selectedItem && selectedPayment && (
          <div className="order-summary fade-in">
            <h3>Ringkasan Order</h3>
            <div className="order-summary-row">
              <span className="label">Game</span>
              <span>{game.name}</span>
            </div>
            <div className="order-summary-row">
              <span className="label">Item</span>
              <span>{game.items.find(i => i.id === selectedItem)?.name}</span>
            </div>
            <div className="order-summary-row">
              <span className="label">User ID</span>
              <span>{userId || '-'}{game.requireServer ? ` (${serverId || '-'})` : ''}</span>
            </div>
            <div className="order-summary-row">
              <span className="label">Pembayaran</span>
              <span>{PAYMENT_METHODS.find(p => p.id === selectedPayment)?.name}</span>
            </div>
            <div className="order-summary-total">
              <span>Total Pembayaran</span>
              <span className="price">{formatPrice(game.items.find(i => i.id === selectedItem)?.price || 0)}</span>
            </div>
            <button className="btn btn-primary btn-lg" style={{ width: '100%', justifyContent: 'center', marginTop: 20 }} onClick={handleSubmit} disabled={isSubmitting}>
              {isSubmitting ? <><Loader2 size={18} className="spin" /> Memproses...</> : <><CreditCard size={18} /> Buat Order Sekarang</>}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
