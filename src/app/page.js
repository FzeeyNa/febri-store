import Link from 'next/link';
import Image from 'next/image';
import { getTopUpGames, getJokiServices, STORE_INFO } from '@/lib/products';
import { Zap, MessageCircle, ShieldCheck, Gamepad2, Trophy, ClipboardList, PenSquare, CreditCard, CheckCircle2, Clock, Send, UserCheck, ArrowRight } from 'lucide-react';
import PopularSection from '@/components/PopularSection';

export default function Home() {
  const topUpGames = getTopUpGames();
  const jokiServices = getJokiServices();

  return (
    <>
      {/* Hero */}
      <section className="hero">
        <div className="hero-content fade-in">
          <Image src="/logo.png" alt="Febristore" width={120} height={120} className="hero-logo" priority />
          <h1>Top Up Game<br /><span className="accent">Murah & Terpercaya</span></h1>
          <p>Isi diamond, UC, dan robux dengan harga terjangkau. Proses cepat, aman, dan terpercaya!</p>
          <div className="hero-badges">
            <span className="hero-badge"><Zap size={18} className="icon-lucide" /> Proses Cepat</span>
            <span className="hero-badge"><MessageCircle size={18} className="icon-lucide" /> Layanan Chat 24/7</span>
            <span className="hero-badge"><ShieldCheck size={18} className="icon-lucide" /> Pembayaran Aman</span>
          </div>
          <div className="hero-cta">
            <Link href="#games" className="btn btn-primary btn-lg"><Gamepad2 size={20} /> Top Up Sekarang</Link>
            <a href={STORE_INFO.whatsappLink} target="_blank" rel="noopener noreferrer" className="btn btn-secondary btn-lg"><MessageCircle size={20} /> Hubungi Kami</a>
          </div>
        </div>
      </section>

      {/* Popular Section (Oura Store Style) */}
      <PopularSection topUpGames={topUpGames} jokiServices={jokiServices} />

      {/* How it Works - Detailed */}
      <section className="section">
        <div className="container">
          <div className="section-title">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', marginBottom: '12px' }}>
              <ClipboardList size={32} color="var(--color-accent)" />
              <h2 style={{ marginBottom: 0 }}>Cara Order</h2>
            </div>
            <p>Mudah dan cepat, ikuti langkah berikut!</p>
          </div>
          
          <div className="how-to-steps">
            {[
              { 
                icon: <Gamepad2 size={36} strokeWidth={1.5} />, 
                step: '1',
                title: 'Pilih Game & Nominal', 
                desc: 'Pilih game yang ingin di top up (ML, PUBG, Free Fire, Roblox) lalu pilih jumlah diamond/UC/robux yang diinginkan.',
                detail: 'Pastikan kamu memilih nominal yang sesuai kebutuhan. Harga sudah tertera di setiap item.'
              },
              { 
                icon: <PenSquare size={36} strokeWidth={1.5} />, 
                step: '2',
                title: 'Isi Data Akun', 
                desc: 'Masukkan User ID, Server (untuk ML), nama kamu, dan nomor WhatsApp yang aktif.',
                detail: 'Pastikan User ID dan Server benar agar diamond masuk ke akun yang tepat. Cek di profil game kamu.'
              },
              { 
                icon: <CreditCard size={36} strokeWidth={1.5} />, 
                step: '3',
                title: 'Bayar & Konfirmasi', 
                desc: 'Pilih metode pembayaran (QRIS, Dana, GoPay, Bank Jago), lalu transfer dan konfirmasi via WhatsApp.',
                detail: 'Setelah transfer, klik "Konfirmasi via WhatsApp" untuk mengirim bukti pembayaran ke admin.'
              },
              { 
                icon: <Clock size={36} strokeWidth={1.5} />, 
                step: '4',
                title: 'Tunggu Proses Admin', 
                desc: 'Admin akan memproses order kamu dalam 1-15 menit setelah pembayaran dikonfirmasi.',
                detail: 'Proses pengisian manual oleh admin untuk menjamin keamanan. Admin akan menghubungi via WA jika sudah selesai.'
              },
              { 
                icon: <CheckCircle2 size={36} strokeWidth={1.5} />, 
                step: '5',
                title: 'Selesai!', 
                desc: 'Diamond/UC/Robux masuk ke akun kamu! Kamu akan mendapat notifikasi WhatsApp dari admin.',
                detail: 'Cek status order kapan saja di menu "Cek Order" atau "Riwayat Pembelian" jika sudah login.'
              },
            ].map((step, i) => (
              <div key={i} className="how-to-card fade-in">
                <div className="how-to-step-number">{step.step}</div>
                <div className="how-to-icon">{step.icon}</div>
                <h3>{step.title}</h3>
                <p className="how-to-desc">{step.desc}</p>
                <p className="how-to-detail">{step.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
