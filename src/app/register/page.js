'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/components/AuthProvider';
import { UserPlus, Mail, Lock, User, Phone, Eye, EyeOff } from 'lucide-react';

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const { signUp } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password || !fullName || !whatsapp) {
      setError('Mohon isi semua field!');
      return;
    }
    if (password.length < 6) {
      setError('Password minimal 6 karakter!');
      return;
    }
    setLoading(true);
    setError('');
    try {
      await signUp(email, password, fullName, whatsapp);
      setSuccess(true);
    } catch (err) {
      if (err.message.includes('already registered')) {
        setError('Email sudah terdaftar! Silakan masuk.');
      } else {
        setError(err.message);
      }
    }
    setLoading(false);
  };

  if (success) {
    return (
      <div className="auth-page">
        <div className="container">
          <div className="auth-card fade-in" style={{ textAlign: 'center' }}>
            <div className="auth-icon" style={{ background: 'rgba(16,185,129,0.15)' }}>
              <UserPlus size={32} color="var(--color-success)" />
            </div>
            <h1 style={{ marginTop: 16 }}>Pendaftaran Berhasil!</h1>
            <p style={{ color: 'var(--color-text-secondary)', marginTop: 8, marginBottom: 24 }}>
              Silakan cek email kamu untuk verifikasi akun, lalu masuk.
            </p>
            <Link href="/login" className="btn btn-primary" style={{ justifyContent: 'center' }}>
              Masuk ke Akun
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-page">
      <div className="container">
        <div className="auth-card fade-in">
          <div className="auth-header">
            <div className="auth-icon">
              <UserPlus size={32} color="var(--color-accent)" />
            </div>
            <h1>Buat Akun Baru</h1>
            <p>Daftar untuk menikmati fitur riwayat pembelian & tracking order</p>
          </div>

          <form onSubmit={handleSubmit}>
            {error && (
              <div className="auth-error">
                <p>{error}</p>
              </div>
            )}

            <div className="form-group">
              <label><User size={14} /> Nama Lengkap</label>
              <input
                type="text"
                placeholder="Masukkan nama lengkap"
                value={fullName}
                onChange={e => setFullName(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label><Mail size={14} /> Email</label>
              <input
                type="email"
                placeholder="nama@email.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                autoComplete="email"
              />
            </div>

            <div className="form-group">
              <label><Phone size={14} /> No. WhatsApp</label>
              <input
                type="text"
                placeholder="08xxxxxxxxxx"
                value={whatsapp}
                onChange={e => setWhatsapp(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label><Lock size={14} /> Password</label>
              <div style={{ position: 'relative' }}>
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Minimal 6 karakter"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: 'var(--color-text-muted)', cursor: 'pointer' }}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-primary btn-lg"
              style={{ width: '100%', justifyContent: 'center', marginTop: 8 }}
              disabled={loading}
            >
              {loading ? 'Memproses...' : 'Daftar Sekarang'}
            </button>
          </form>

          <div className="auth-footer">
            <p>Sudah punya akun? <Link href="/login">Masuk disini</Link></p>
          </div>
        </div>
      </div>
    </div>
  );
}
