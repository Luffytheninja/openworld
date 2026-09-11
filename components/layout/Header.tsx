'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useStore } from '@/lib/store-context';
import styles from './Header.module.css';

const NAV_ITEMS = [
  { label: 'Shirts', href: '/shirts' },
  { label: 'Shorts', href: '/shorts' },
  { label: 'Trousers', href: '/trousers' },
  { label: 'Caps', href: '/caps' },
];

export default function Header() {
  const pathname = usePathname();
  const { totalCount } = useStore();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isHome = pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Transparent hero header only on homepage top
  const isLightMode = isHome && !isScrolled;

  return (
    <header
      className={`${styles.header} ${isLightMode ? styles.heroHeader : styles.solidHeader} ${
        isScrolled ? styles.scrolled : ''
      }`}
    >
      <div className={styles.container}>
        {/* LEFT: SEARCH PAGE LINK */}
        <div className={styles.left}>
          <Link
            href="/search"
            className={`${styles.searchBtn} ${pathname === '/search' ? styles.activeNav : ''}`}
            aria-label="Search collection"
          >
            Search
          </Link>
        </div>

        {/* CENTER: OPN WRLD LOGO + CATEGORY SUBNAV */}
        <div className={styles.center}>
          <Link href="/" className={styles.logo}>
            OPN WRLD
          </Link>
          <nav className={styles.nav} aria-label="Product categories">
            {NAV_ITEMS.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`${styles.navLink} ${isActive ? styles.active : ''}`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* RIGHT: CHECKOUT PAGE LINK */}
        <div className={styles.right}>
          <Link
            href="/checkout"
            className={`${styles.checkoutBtn} ${pathname === '/checkout' ? styles.activeNav : ''}`}
            aria-label="View cargo bag checkout"
          >
            Checkout
            {totalCount > 0 && <span className={styles.badge}>{totalCount}</span>}
          </Link>

          {/* MOBILE MENU TOGGLE */}
          <button
            className={styles.mobileMenuBtn}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
          >
            <span className={`${styles.menuBar} ${mobileMenuOpen ? styles.openTop : ''}`} />
            <span className={`${styles.menuBar} ${mobileMenuOpen ? styles.openMid : ''}`} />
            <span className={`${styles.menuBar} ${mobileMenuOpen ? styles.openBot : ''}`} />
          </button>
        </div>
      </div>

      {/* MOBILE EXPANDED NAV */}
      {mobileMenuOpen && (
        <div className={styles.mobileNav}>
          <div className={styles.mobileNavLinks}>
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={styles.mobileNavLink}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/search"
              className={styles.mobileNavLink}
              onClick={() => setMobileMenuOpen(false)}
            >
              Search
            </Link>
            <Link
              href="/checkout"
              className={styles.mobileNavLink}
              onClick={() => setMobileMenuOpen(false)}
            >
              Checkout ({totalCount})
            </Link>
            <Link
              href="/archive"
              className={styles.mobileNavLink}
              onClick={() => setMobileMenuOpen(false)}
            >
              Archive
            </Link>
            <Link
              href="/community"
              className={styles.mobileNavLink}
              onClick={() => setMobileMenuOpen(false)}
            >
              Community
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
