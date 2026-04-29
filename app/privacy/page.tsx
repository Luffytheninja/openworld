import styles from '../terms/legal.module.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy — OPN WRLD',
  description: 'Data usage and privacy protection at OPN WRLD. NDPR baseline compliant.',
};

export default function PrivacyPage() {
  return (
    <div className={styles.legalPage}>
      <div className={styles.container}>
        <h1 className={styles.title}>Privacy Policy</h1>
        
        <div className={styles.content}>
          <section className={styles.section}>
            <h2>01. Data Collection</h2>
            <p>
              We collect minimal data required to fulfill your preorder: Name, Shipping Address, and Contact Information (WhatsApp/Email). 
              This data is collected via our direct communication channels.
            </p>
          </section>

          <section className={styles.section}>
            <h2>02. Usage</h2>
            <p>
              Your data is used exclusively for order fulfillment and "Frequency" updates (if joined). 
              We do not sell or share your data with third-party marketers.
            </p>
          </section>

          <section className={styles.section}>
            <h2>03. NDPR Compliance</h2>
            <p>
              Our data practices are designed to align with the Nigeria Data Protection Regulation (NDPR). 
              You have the right to request access to or deletion of your personal data at any time.
            </p>
          </section>

          <section className={styles.section}>
            <h2>04. Security</h2>
            <p>
              We implement high-grade security measures to protect your information during the preorder process. 
              Communication via WhatsApp is end-to-end encrypted.
            </p>
          </section>
        </div>

        <p className={styles.lastUpdated}>Last Updated: April 2026</p>
      </div>
    </div>
  );
}
