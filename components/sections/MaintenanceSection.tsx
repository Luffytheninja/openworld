'use client';
import { useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { trackEvent } from '@/lib/analytics';
import styles from './MaintenanceSection.module.css';

export default function MaintenanceSection() {
  useEffect(() => {
    trackEvent('page_view', { page: 'maintenance' });
  }, []);

  return (
    <section className={styles.maintenance} aria-label="OPN WRLD Maintenance - Coming Soon">
      {/* DESKTOP BACKGROUND IMAGE */}
      <div className={styles.desktopImageWrap}>
        <Image
          src="/images/down-for-maintenance-desktop-warm.png"
          alt="OPN WRLD Down for Maintenance"
          fill
          priority
          sizes="(min-width: 769px) 100vw, 1px"
          className={styles.heroImage}
        />
      </div>

      {/* MOBILE BACKGROUND IMAGE */}
      <div className={styles.mobileImageWrap}>
        <Image
          src="/images/down-for-maintenance-mobile-warm.png"
          alt="OPN WRLD Down for Maintenance"
          fill
          priority
          sizes="(max-width: 768px) 100vw, 1px"
          className={styles.heroImage}
        />
      </div>

      {/* SUBTLE VIGNETTE / ATMOSPHERIC OVERLAY */}
      <div className={styles.overlay} />

      {/* DISPLAY CONTENT */}
      <div className={styles.contentWrap}>
        <motion.div
          className={styles.textWrap}
          initial={{ opacity: 0, y: 30, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        >
          <h1 className={styles.comingSoonText}>
            <span className={styles.line}>COMING</span>
            <span className={styles.line}>SOON!</span>
          </h1>
        </motion.div>
      </div>
    </section>
  );
}
