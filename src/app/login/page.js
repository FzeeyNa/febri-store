'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/components/AuthProvider';
import { LogIn, Mail, Lock, Eye, EyeOff } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signIn } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Mohon isi semua field!');
      return;
    }
    setLoading(true);
    setError('');
    try {
      await signIn(email, password);
      router.push('/');
    } catch (err) {
      console.error("Sign in error:", err);
      setError(err.message === 'Invalid login credentials' ? 'Email atau password salah!' : err.message);
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="container">
        <div className="auth-card fade-in">
          <div className="auth-header">
            <div className="auth-icon">
              <LogIn size={32} color="var(--color-accent)" />
            </div>
            <h1>Masuk ke Akun</h1>
            <p>Masuk untuk melihat riwayat pembelian & status order</p>
          </div>

          <form onSubmit={handleSubmit}>
            {error && (
              <div className="auth-error">
                <p>{error}</p>
              </div>
            )}

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
              <label><Lock size={14} /> Password</label>
              <div style={{ position: 'relative' }}>
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Masukkan password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  autoComplete="current-password"
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
              {loading ? 'Memproses...' : 'Masuk'}
            </button>
          </form>

          <div className="auth-footer">
            <p>Belum punya akun? <Link href="/register">Daftar sekarang</Link></p>
          </div>
        </div>
      </div>
    </div>
  );
}
