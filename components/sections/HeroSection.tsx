'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './HeroSection.module.css';

const CAROUSEL_IMAGES = [
  { id: 'hbl1', src: '/images/hbl1.png', label: 'Blinding Lights — Black' },
  { id: 'hbl2', src: '/images/hbl2.png', label: 'Blinding Lights — Yellow' },
];

export default function HeroSection() {
  const [index, setIndex] = useState(0);

  // Auto-advance slideshow every 4 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % CAROUSEL_IMAGES.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const current = CAROUSEL_IMAGES[index];

  return (
    <section className={styles.hero} aria-label="Hero">
      {/* FULLSCREEN SLIDESHOW */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current.id}
          className={styles.slide}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Image
            src={current.src}
            alt={current.label}
            fill
            sizes="100vw"
            className={styles.slideImage}
            priority
          />
          {/* Dark overlay */}
          <div className={styles.overlay} />
        </motion.div>
      </AnimatePresence>

      {/* TEXT OVERLAY */}
      <div className={styles.textOverlay}>
        <motion.div
          key={current.id + '-text'}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className={styles.badge}>Preorder Open</div>
          <p className={styles.eyebrow}>OPN WRLD 2026 — Blinding Lights</p>
          <h1 className={styles.headline}>
            Blinding<br /><em>Lights</em>
          </h1>
          <span className={styles.colorInfo}>001 Tee — 280gsm cotton</span>
          <p className={styles.colorLabel}>{current.label}</p>
        </motion.div>
      </div>

      {/* DOTS */}
      <div className={styles.carouselDots}>
        {CAROUSEL_IMAGES.map((_, i) => (
          <button
            key={i}
            className={`${styles.dot} ${i === index ? styles.active : ''}`}
            onClick={() => setIndex(i)}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
