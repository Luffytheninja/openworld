import type { Metadata } from 'next';
import styles from './community.module.css';

export const metadata: Metadata = {
  title: 'Community — OPN WRLD',
  description: 'Join the OPN WRLD frequency. WhatsApp community and Instagram.',
};

export default function CommunityPage() {
  const WA_CHANNEL = 'https://whatsapp.com/channel/0029VbC4xwK3rZZUI2Odc50b';
  const INSTAGRAM = 'https://instagram.com/opnwrld';

  return (
    <div className={`page-top-pad ${styles.page}`}>
      <div className={styles.container}>
        {/* HEADER */}
        <header className={styles.header}>
          <p className={styles.eyebrow}>OPN WRLD / Community</p>
          <h1 className={styles.title}>Join the Frequency</h1>
          <p className={styles.sub}>Members get priority access to drop keys and preorder windows. Connect on WhatsApp or follow on Instagram.</p>
        </header>

        {/* LINKS */}
        <div className={styles.linksGrid}>
          <a href={WA_CHANNEL} target="_blank" rel="noopener noreferrer" className={styles.linkCard} id="whatsapp-community-link">
            <span className={styles.linkPlatform}>WhatsApp</span>
            <span className={styles.linkLabel}>Primary Node</span>
            <p className={styles.linkDesc}>Official OPN WRLD WhatsApp community. Preorder alerts, drop schedules, exclusive access.</p>
            <span className={styles.linkArrow}>Join →</span>
          </a>
          <a href={INSTAGRAM} target="_blank" rel="noopener noreferrer" className={styles.linkCard} id="instagram-community-link">
            <span className={styles.linkPlatform}>Instagram</span>
            <span className={styles.linkLabel}>Visual Archive</span>
            <p className={styles.linkDesc}>Campaign imagery, lookbooks, and behind-the-scenes from the frequency.</p>
            <span className={styles.linkArrow}>Follow →</span>
          </a>
        </div>

        {/* PREORDER CTA */}
        <div className={styles.preorderBlock}>
          <p className={styles.preorderLabel}>Ready to order?</p>
          <h2 className={styles.preorderHeading}>Secure your 001 Tee</h2>
          <a
            href={`https://wa.me/2347013927121?text=${encodeURIComponent('Hi OPN WRLD, I\'d like to preorder the 001 Tee.\nColorway: \nSize: \nName: ')}`}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.preorderBtn}
          >
            Secure Cargo
          </a>
        </div>

        <p className={styles.note}>Access is conditional. Stay calibrated.</p>
      </div>
    </div>
  );
}
