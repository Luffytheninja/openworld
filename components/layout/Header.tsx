'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useStore } from '@/lib/store-context';
import styles from './Header.module.css';

export default function Header() {
  const pathname = usePathname();
  const { totalCount, setCheckoutOpen } = useStore();

  const handleCheckoutClick = (e: React.MouseEvent) => {
    // If not on checkout page and cart has items, we can open the modal or let link navigate
    if (pathname !== '/checkout' && totalCount > 0) {
      e.preventDefault();
      setCheckoutOpen(true);
    }
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        {/* LEFT: BRAND LOGO (SPECIAL ELITE) */}
        <Link href="/" className={styles.logoLink} aria-label="OPN WRLD Home">
          <span className={styles.logo}>
            <span>opn</span>
            <span>wrld</span>
          </span>
        </Link>

        {/* RIGHT: ARCHIVE & CHECKOUT */}
        <nav className={styles.navRight} aria-label="Main Navigation">
          <Link
            href="/archive"
            className={`${styles.navLink} ${pathname === '/archive' ? styles.active : ''}`}
          >
            Archive
          </Link>
          <Link
            href="/checkout"
            onClick={handleCheckoutClick}
            className={`${styles.navLink} ${styles.checkoutLink} ${
              pathname === '/checkout' ? styles.active : ''
            }`}
          >
            Checkout
            {totalCount > 0 && <span className={styles.badge}>{totalCount}</span>}
          </Link>
        </nav>
      </div>
    </header>
  );
}
