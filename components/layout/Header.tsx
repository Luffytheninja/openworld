'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
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

  // Close mobile menu when pathname changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

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

        {/* RIGHT: CHECKOUT PAGE LINK & BURGER MENU */}
        <div className={styles.right}>
          <Link
            href="/checkout"
            className={`${styles.checkoutBtn} ${pathname === '/checkout' ? styles.activeNav : ''}`}
            aria-label="View cargo bag checkout"
          >
            Checkout
            {totalCount > 0 && <span className={styles.badge}>{totalCount}</span>}
          </Link>

          {/* MOBILE MENU TOGGLE (BURGER) */}
          <button
            className={styles.mobileMenuBtn}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileMenuOpen}
          >
            <span className={`${styles.menuBar} ${mobileMenuOpen ? styles.openTop : ''}`} />
            <span className={`${styles.menuBar} ${mobileMenuOpen ? styles.openMid : ''}`} />
            <span className={`${styles.menuBar} ${mobileMenuOpen ? styles.openBot : ''}`} />
          </button>
        </div>
      </div>

      {/* MOBILE EXPANDED NAV (BURGER MENU) */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className={styles.mobileNav}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
          >
            <div className={styles.mobileNavLinks}>
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`${styles.mobileNavLink} ${pathname === item.href ? styles.activeMobileLink : ''}`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href="/search"
                className={`${styles.mobileNavLink} ${pathname === '/search' ? styles.activeMobileLink : ''}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Search
              </Link>
              <Link
                href="/checkout"
                className={`${styles.mobileNavLink} ${styles.mobileCheckoutLink} ${
                  pathname === '/checkout' ? styles.activeMobileLink : ''
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                <span>Checkout</span>
                {totalCount > 0 && <span className={styles.mobileBadge}>{totalCount}</span>}
              </Link>
              <Link
                href="/archive"
                className={`${styles.mobileNavLink} ${pathname === '/archive' ? styles.activeMobileLink : ''}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Archive
              </Link>
              <Link
                href="/community"
                className={`${styles.mobileNavLink} ${pathname === '/community' ? styles.activeMobileLink : ''}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Community
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
