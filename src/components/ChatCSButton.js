'use client';
import { useState, useRef, useEffect } from 'react';
import { STORE_INFO } from '@/lib/products';
import { MessageCircle, X, Camera, Video, Phone, Send } from 'lucide-react';

const CS_LINKS = [
  {
    label: 'Chat Whatsapp',
    href: `${STORE_INFO.whatsappLink}?text=${encodeURIComponent('Halo Febristore!')}`,
    icon: <MessageCircle size={16} />,
  },
  {
    label: 'Chat Instagram',
    href: '#',
    icon: <Camera size={16} />,
    comingSoon: true,
  },
  {
    label: 'CS WA JOKI (08.00 - 16.00 WIB)',
    href: `${STORE_INFO.whatsappLink}?text=${encodeURIComponent('Halo, saya mau order joki')}`,
    icon: <Phone size={16} />,
  },
  {
    label: 'CS WA JOKI (16.00 - 23.59 WIB)',
    href: `${STORE_INFO.whatsappLink}?text=${encodeURIComponent('Halo, saya mau order joki (malam)')}`,
    icon: <Phone size={16} />,
  },
  {
    label: 'CS WA JOKI (00.00 - 08.00 WIB)',
    href: `${STORE_INFO.whatsappLink}?text=${encodeURIComponent('Halo, saya mau order joki (dini hari)')}`,
    icon: <Phone size={16} />,
  },
  {
    label: 'Youtube Febristore',
    href: '#',
    icon: <Video size={16} />,
    comingSoon: true,
  },
  {
    label: 'Channel Whatsapp',
    href: '#',
    icon: <Send size={16} />,
    comingSoon: true,
  },
  {
    label: 'Channel Instagram',
    href: '#',
    icon: <Camera size={16} />,
    comingSoon: true,
  },
];

export default function ChatCSButton() {
  const [open, setOpen] = useState(false);
  const panelRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (panelRef.current && !panelRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [open]);

  return (
    <div className="chat-cs-wrapper" ref={panelRef}>
      {/* Popup Panel */}
      {open && (
        <div className="chat-cs-panel">
          <div className="chat-cs-header">
            <span>Chat CS</span>
            <button className="chat-cs-close" onClick={() => setOpen(false)}>
              <X size={16} />
            </button>
          </div>
          <div className="chat-cs-list">
            {CS_LINKS.map((item, i) => (
              <a
                key={i}
                href={item.comingSoon ? undefined : item.href}
                target={item.comingSoon ? undefined : '_blank'}
                rel="noopener noreferrer"
                className={`chat-cs-item${item.comingSoon ? ' coming-soon' : ''}`}
                onClick={item.comingSoon ? (e) => e.preventDefault() : undefined}
              >
                {item.icon}
                <span>{item.label}</span>
                {item.comingSoon && <span className="cs-coming-soon-badge">Coming Soon</span>}
              </a>
            ))}
          </div>
        </div>
      )}

      {/* Floating Button */}
      <button className="chat-cs-fab" onClick={() => setOpen(!open)}>
        {open ? <X size={22} /> : <MessageCircle size={22} />}
        <span>CHAT CS</span>
      </button>
    </div>
  );
}
