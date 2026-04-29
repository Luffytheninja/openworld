'use client';
import { useState } from 'react';
import Link from 'next/link';
import styles from './Header.module.css';

export default function Header() {
  const [open, setOpen] = useState(false);

  const WA = 'https://wa.me/2347013927121?text=Hi%20OPN%20WRLD%2C%20I%27d%20like%20to%20preorder%20the%20001%20Tee.%0AColorway%3A%20%0ASize%3A%20%0AName%3A%20';

  return (
    <>
      <header className={styles.header}>
        <div className={styles.inner}>
          <Link href="/" className={styles.wordmark}>OPN WRLD</Link>
          <nav className={styles.nav} aria-label="Main navigation">
            <Link href="/#store" className={styles.link}>Store</Link>
            <Link href="/archive" className={styles.link}>Archive</Link>
            <Link href="/community" className={styles.link}>Community</Link>
          </nav>
          <a href={WA} target="_blank" rel="noopener noreferrer" className={styles.cta}>
            Secure Cargo
          </a>
          <button
            className={styles.menuBtn}
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen(!open)}
          >
            <span style={{ transform: open ? 'rotate(45deg) translateY(6px)' : undefined }} />
            <span style={{ opacity: open ? 0 : 1 }} />
            <span style={{ transform: open ? 'rotate(-45deg) translateY(-6px)' : undefined }} />
          </button>
        </div>
      </header>

      <nav className={`${styles.mobileNav} ${open ? styles.open : ''}`} aria-label="Mobile navigation">
        <Link href="/#store" className={styles.mobileLink} onClick={() => setOpen(false)}>Store</Link>
        <Link href="/archive" className={styles.mobileLink} onClick={() => setOpen(false)}>Archive</Link>
        <Link href="/community" className={styles.mobileLink} onClick={() => setOpen(false)}>Community</Link>
        <a href={WA} target="_blank" rel="noopener noreferrer" className={styles.mobileCta} onClick={() => setOpen(false)}>
          Secure Cargo
        </a>
      </nav>
    </>
  );
}
