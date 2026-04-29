import Link from 'next/link';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer id="contact" className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.top}>
          <div>
            <p className={styles.wordmark}>OPN WRLD</p>
            <p className={styles.tagline}>Lagos, Nigeria — Est. 2026</p>
          </div>
          <div className={styles.group}>
            <h4>Connect</h4>
            <a href="https://whatsapp.com/channel/0029VbC4xwK3rZZUI2Odc50b" target="_blank" rel="noopener noreferrer">Community</a>
            <a href="https://www.instagram.com/rocketmancave_/" target="_blank" rel="noopener noreferrer">Instagram</a>
          </div>
          <div className={styles.group}>
            <h4>Info</h4>
            <Link href="/terms">Terms</Link>
            <Link href="/privacy">Privacy</Link>
            <Link href="/community">Community</Link>
          </div>
        </div>
        <div className={styles.bottom}>
          <span className={styles.copy}>© 2026 OPN WRLD — All rights reserved</span>
          <span className={styles.location}>Lagos, Nigeria</span>
        </div>
      </div>
    </footer>
  );
}
