import type { Metadata } from 'next';
import styles from './archive.module.css';

export const metadata: Metadata = {
  title: 'Archive — OPN WRLD',
  description: 'The OPN WRLD archive begins after the first drop.',
};

export default function ArchivePage() {
  return (
    <div className={`page-top-pad ${styles.page}`}>
      <div className={styles.inner}>
        <p className={styles.label}>Archive / 001</p>
        <h1 className={styles.heading}>The archive begins<br />after the first drop.</h1>
        <p className={styles.sub}>Check back after August 2026.</p>
        <a href="/#store" className={styles.cta}>View Current Drop →</a>
      </div>
    </div>
  );
}
