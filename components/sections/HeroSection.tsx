'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import styles from './HeroSection.module.css';

const CAROUSEL_IMAGES = [
  { id: 'black', src: '/images/blbf.png', label: 'Blinding Lights — Black' },
  { id: 'yellow', src: '/images/blyf.png', label: 'Blinding Lights — Yellow' },
];

export default function HeroSection() {
  const [index, setIndex] = useState(0);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { stiffness: 60, damping: 25 };
  const rotateX = useSpring(mouseY, springConfig);
  const rotateY = useSpring(mouseX, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 40;
      const y = (e.clientY / window.innerHeight - 0.5) * -40;
      mouseX.set(x);
      mouseY.set(y);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  const current = CAROUSEL_IMAGES[index];

  const nextImage = () => setIndex((prev) => (prev + 1) % CAROUSEL_IMAGES.length);


  return (
    <section className={styles.hero} aria-label="Hero">
      <div className={styles.inner}>
        {/* TEXT SIDE */}
        <div className={styles.textSide}>
          <div className={styles.badge}>Preorder Open</div>
          <p className={styles.eyebrow}>OPN WRLD 2026 — Blinding Lights</p>
          <h1 className={styles.headline}>
            Blinding<br /><em>Lights</em>
          </h1>
          <span className={styles.colorInfo}>001 Tee — 280gsm cotton</span>
          <div className={styles.actions}>
            <button onClick={nextImage} className={styles.secondaryLink}>Next Colorway</button>
          </div>
        </div>

        {/* 3D IMAGE TRACKING SIDE */}
        <div className={styles.imageSide}>
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              className={styles.perspectiveWrap}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ 
                opacity: 1, 
                scale: 1
              }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ 
                opacity: { duration: 0.4 },
                scale: { duration: 0.4 }
              }}
              style={{ 
                transformStyle: 'preserve-3d',
                rotateX,
                rotateY
              }}
            >
              <div className={styles.imageContainer}>
                <Image
                  src={current.src}
                  alt={current.label}
                  fill
                  sizes="(max-width: 900px) 100vw, 50vw"
                  className={styles.productImage}
                  priority
                />
                <div className={styles.floatingLabel} style={{ transform: 'translateZ(40px)' }}>
                  {current.label}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
          
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
        </div>
      </div>
    </section>
  );
}
