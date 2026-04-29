import styles from './legal.module.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service — OPN WRLD',
  description: 'Preorder terms, shipping expectations, and legal agreement for OPN WRLD.',
};

export default function TermsPage() {
  return (
    <div className={styles.legalPage}>
      <div className={styles.container}>
        <h1 className={styles.title}>Terms of Service</h1>
        
        <div className={styles.content}>
          <section className={styles.section}>
            <h2>01. Preorder Nature</h2>
            <p>
              OPN WRLD operates on a preorder model. When you "Secure Cargo," you are placing an order for a product that is currently in production. 
              Estimated shipping dates are provided but not guaranteed.
            </p>
          </section>

          <section className={styles.section}>
            <h2>02. Payment & Security</h2>
            <p>
              Preorders are secured via WhatsApp communication. Payment details and confirmation are handled through secure channels. 
              All transactions are final once production has commenced.
            </p>
          </section>

          <section className={styles.section}>
            <h2>03. Shipping & Logistics</h2>
            <p>
              Cargo is shipped from Lagos, Nigeria. We offer global shipping. 
              Delivery times vary by location:
            </p>
            <ul>
              <li>Lagos: 2–4 business days post-launch.</li>
              <li>Rest of Nigeria: 5–7 business days post-launch.</li>
              <li>International: 10–21 business days post-launch.</li>
            </ul>
          </section>

          <section className={styles.section}>
            <h2>04. Returns & Exchanges</h2>
            <p>
              Due to the limited nature of our drops, all sales are final. 
              Exchanges for size may be possible only if stock is available and must be requested within 48 hours of receipt.
            </p>
          </section>
        </div>

        <p className={styles.lastUpdated}>Last Updated: April 2026</p>
      </div>
    </div>
  );
}
