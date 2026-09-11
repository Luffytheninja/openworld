'use client';
import { motion } from 'framer-motion';
import styles from './not-found.module.css';

export default function NotFound() {
  return (
    <div className={styles.page}>
      {/* BOTTOM ROW: ERROR 404 left, Explore right */}
      <div className={styles.bottomRow}>
        <motion.h1
          className={styles.errorText}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as const }}
        >
          ERROR 404
        </motion.h1>
        <motion.a
          href="/shirts"
          className={styles.exploreLink}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2, ease: [0.22, 1, 0.36, 1] as const }}
        >
          Explore
        </motion.a>
      </div>
    </div>
  );
}
