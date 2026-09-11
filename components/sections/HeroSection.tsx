'use client';
import { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { trackEvent } from '@/lib/analytics';
import styles from './HeroSection.module.css';

export default function HeroSection() {
  useEffect(() => {
    trackEvent('page_view', { page: 'home' });
  }, []);

  return (
    <section className={styles.hero} aria-label="OPN WRLD Hero">
      {/* BACKGROUND IMAGE */}
      <div className={styles.imageWrap}>
        <Image
          src="/opn-wrld-hero-image.png"
          alt="OPN WRLD Lagos Streetwear — GBEWA Drop"
          fill
          priority
          sizes="100vw"
          className={styles.heroImage}
        />
        <div className={styles.overlay} />
      </div>

      {/* BOTTOM DISPLAY CONTENT */}
      <div className={styles.bottomBar}>
        <motion.div
          className={styles.gbewaWrap}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] as const }}
        >
          <h1 className={styles.gbewaText}>LTR</h1>
        </motion.div>

        <motion.div
          className={styles.exploreWrap}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4, ease: [0.22, 1, 0.36, 1] as const }}
        >
          <Link
            href="/shirts"
            className={styles.exploreBtn}
            aria-label="Explore collection drops"
          >
            Explore
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
