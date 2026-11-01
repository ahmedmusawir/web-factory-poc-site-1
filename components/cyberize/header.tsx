'use client';
import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { content } from '@/content/cyberize';
import { Artwork } from './artwork';

const services = [
  ['SEO', '/seo-services/'], ['PPC', '/ppc/'], ['Web Design', '/website-design/'],
  ['Web Development', '/web-development/'], ['Website Support', '/website-support/'],
] as const;
export function Header() {
  const [mobile, setMobile] = useState(false);
  const [open, setOpen] = useState(false);
  const header = useRef<HTMLElement>(null);
  const mobileButton = useRef<HTMLButtonElement>(null);
  const serviceButton = useRef<HTMLButtonElement>(null);
  const pathname = usePathname().replace(/\/$/, '') || '/';
  const active = (route: string) => pathname === (route.replace(/\/$/, '') || '/') ? 'page' as const : undefined;
  useEffect(() => {
    const close = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      if (open) { setOpen(false); serviceButton.current?.focus(); event.preventDefault(); }
      else if (mobile) { setMobile(false); mobileButton.current?.focus(); event.preventDefault(); }
    };
    const outside = (event: PointerEvent) => {
      if (!header.current?.contains(event.target as Node)) { setOpen(false); setMobile(false); }
    };
    const media = window.matchMedia('(max-width: 900px)');
    const reset = () => { setOpen(false); setMobile(false); };
    document.addEventListener('keydown', close); document.addEventListener('pointerdown', outside); media.addEventListener('change', reset);
    return () => { document.removeEventListener('keydown', close); document.removeEventListener('pointerdown', outside); media.removeEventListener('change', reset); };
  }, [open, mobile]);
  const reset = () => { setOpen(false); setMobile(false); };
  return <header className="site-header" id="top" ref={header}><div className="wrap header-row">
    <Link className="brand" href="/" aria-label="Cyberize Group home"><Artwork src="/cyberize/assets/logo.png" width="260" height="84" alt="Cyberize Group" /></Link>
    <button ref={mobileButton} className="mobile-toggle" aria-controls="primary" aria-expanded={mobile} onClick={() => { setMobile(!mobile); setOpen(false); }}>{content('shared','header.button_text_1')} <span aria-hidden="true">{content('shared','header.span_text_1')}</span></button>
    <nav id="primary" className={`primary${mobile ? ' is-open' : ''}`} aria-label="Primary">
      <Link href="/" aria-current={active('/')} onClick={reset}>Home</Link>
      <div className="service-menu"><button ref={serviceButton} className="services-toggle" aria-expanded={open} aria-controls="service-links" onClick={() => setOpen(!open)}>Services <span aria-hidden="true">⌄</span></button>
        <div id="service-links" className="service-links" hidden={!open}>{services.map(([label, href]) => <a key={href} href={href} aria-current={active(href)} onClick={reset}>{label}</a>)}</div>
      </div>
      <a href="/contact/" aria-current={active('/contact/')} onClick={reset}>Contact</a>
    </nav><a className="button compact header-cta" href="/contact/">Let&apos;s talk <span aria-hidden="true">↗</span></a>
  </div></header>;
}
