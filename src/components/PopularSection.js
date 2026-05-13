'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Gamepad2, Trophy, Zap, MessageCircle, Star } from 'lucide-react';
import { STORE_INFO } from '@/lib/products';

export default function PopularSection({ topUpGames, jokiServices }) {
  const [activeTab, setActiveTab] = useState('all');

  return (
    <section className="section" id="popular">
      <div className="container">
        <div className="section-title">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', marginBottom: '12px' }}>
            <Star size={32} color="var(--color-accent)" />
            <h2 style={{ marginBottom: 0 }}>Populer</h2>
          </div>
          <p>Layanan terlaris kami, mulai dari top up hingga jasa joki</p>
        </div>

        <div className="category-tabs-wrapper">
          <button 
            className={`tab-btn ${activeTab === 'all' ? 'active' : ''}`}
            onClick={() => setActiveTab('all')}
          >
            Semua
          </button>
          <button 
            className={`tab-btn ${activeTab === 'topup' ? 'active' : ''}`}
            onClick={() => setActiveTab('topup')}
          >
            Top Up Game
          </button>
          <button 
            className={`tab-btn ${activeTab === 'joki' ? 'active' : ''}`}
            onClick={() => setActiveTab('joki')}
          >
            Jasa Joki
          </button>
        </div>

        <div className="popular-grid">
          {(activeTab === 'all' || activeTab === 'topup') && topUpGames.map((game) => (
            <Link href={`/topup/${game.slug}`} key={`topup-${game.id}`}>
              <div className="horizontal-card fade-in">
                <div className="hc-img-wrapper">
                  <Image 
                    src={
                      game.slug === 'mobile-legends' ? '/mlbb.jpeg' : 
                      game.slug === 'pubg-mobile' ? '/pubg.png' : 
                      game.slug === 'free-fire' ? '/freefire.jpeg' : 
                      '/roblox.jpeg'
                    }
                    alt={game.name}
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                </div>
                <div className="hc-content">
                  <div className="hc-title">{game.name}</div>
                  <div className="hc-subtitle">{game.publisher}</div>
                  <div style={{ marginTop: '8px', display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--color-accent)', fontSize: '0.75rem', fontWeight: '600' }}>
                    <Zap size={12} /> Top Up
                  </div>
                </div>
              </div>
            </Link>
          ))}

          {(activeTab === 'all' || activeTab === 'joki') && jokiServices.map((service) => (
            <a href={`${STORE_INFO.whatsappLink}?text=Halo%20Febristore,%20saya%20mau%20order%20${encodeURIComponent(service.name)}`} target="_blank" rel="noopener noreferrer" key={`joki-${service.id}`}>
              <div className="horizontal-card fade-in">
                <div className="hc-img-wrapper">
                  <Image 
                    src={
                      service.slug === 'joki-eceran' ? '/joki_eceran.png' : 
                      service.slug === 'joki-gendong' ? '/joki_gendong.png' : 
                      '/joki_paketan.png'
                    }
                    alt={service.name}
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                </div>
                <div className="hc-content">
                  <div className="hc-title">{service.name}</div>
                  <div className="hc-subtitle">{service.publisher}</div>
                  <div style={{ marginTop: '8px', display: 'flex', alignItems: 'center', gap: '4px', color: '#10b981', fontSize: '0.75rem', fontWeight: '600' }}>
                    <Trophy size={12} /> Joki
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
