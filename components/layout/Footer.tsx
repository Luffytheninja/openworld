'use client';
import Link from 'next/link';
import DitherFooter from '@/components/DitherFooter';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer id="contact" className={styles.footer}>
      <div className={styles.container}>
        {/* INTERACTIVE 1-BIT DITHER BANNER */}
        <div className={styles.ditherWrapper}>
          <DitherFooter
            src="/footer-dither.png"
            alt="Dithered illustration of people working in a studio"
            radius={58}
            fg={[255, 255, 255]}
            bg={[29, 29, 31]}
            className={styles.ditherCanvas}
          />
          
          {/* COMMUNITY CALLOUT OVERLAY */}
          <div className={styles.overlay}>
            <h3 className={styles.overlayTitle}>
              Wanna get more<br />updates?
            </h3>
            <a
              href="https://whatsapp.com/channel/0029VbC4xwK3rZZUI2Odc50b"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.joinButton}
            >
              Join Community
            </a>
          </div>
        </div>

        {/* FOOTER BOTTOM BAR */}
        <div className={styles.bottomBar}>
          <div className={styles.brandMeta}>
            <span className={styles.brandName}>opn wrld</span>
            <span className={styles.tagline}>Lagos, Nigeria — Est. 2026</span>
          </div>

          <div className={styles.links}>
            <a
              href="https://whatsapp.com/channel/0029VbC4xwK3rZZUI2Odc50b"
              target="_blank"
              rel="noopener noreferrer"
            >
              Community
            </a>
            <a
              href="https://www.instagram.com/rocketmancave_/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Instagram
            </a>
            <Link href="/terms">Terms</Link>
            <Link href="/privacy">Privacy</Link>
            <Link href="/archive">Archive</Link>
          </div>

          <div className={styles.copy}>
            <span>© 2026 OPN WRLD. All rights reserved.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
