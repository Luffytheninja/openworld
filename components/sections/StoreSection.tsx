'use client';
import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useStore } from '@/lib/store-context';
import { PRODUCTS, Product } from '@/lib/products';
import styles from './StoreSection.module.css';

interface StoreSectionProps {
  initialCategory?: 'shirts' | 'shorts' | 'trousers' | 'caps';
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

export default function StoreSection({ initialCategory = 'shirts' }: StoreSectionProps) {
  const [activeCategory] = useState<'shirts' | 'shorts' | 'trousers' | 'caps'>(initialCategory);
  const { setSelectedProduct } = useStore();

  const filteredProducts = PRODUCTS.filter((p) => p.category === activeCategory);

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
  };

  return (
    <section id="store-section" className={styles.section} aria-label="OPN WRLD Store">
      <div className={styles.container}>
        {/* PRODUCT GRID - 4 COLUMN ROW */}
        <motion.div
          className={styles.grid}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
        >
          {filteredProducts.map((product) => {
            const isComingSoon = product.status === 'coming_soon';

            return (
              <motion.div
                key={product.id}
                variants={cardVariants}
                whileHover={!isComingSoon ? { y: -6, transition: { duration: 0.25, ease: 'easeOut' } } : undefined}
                className={`${styles.card} ${isComingSoon ? styles.comingSoonCard : ''}`}
                onClick={() => handleProductClick(product)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && handleProductClick(product)}
              >
                <div className={styles.imageContainer}>
                  {isComingSoon && <span className={styles.badge}>Drop 002</span>}
                  <div className={styles.blackCard}>
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className={styles.productImage}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    />
                  </div>
                  <div className={styles.hoverOverlay}>
                    <span>{isComingSoon ? 'Coming Soon' : 'Quick View'}</span>
                  </div>
                </div>

                <div className={styles.info}>
                  <h3 className={styles.productTitle}>{product.name}</h3>
                  <p className={styles.productPrice}>{product.price}</p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* BOTTOM BRANDING ROW */}
        <motion.div
          className={styles.bottomRow}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] as const }}
        >
          <div className={styles.gbewaContainer}>
            <span className={styles.gbewaText}>LTR</span>
          </div>

          <div className={styles.exploreContainer}>
            <a
              href="https://wa.me/2347013927121?text=Hi%20OPN%20WRLD%2C%20I%27d%20like%20to%20order."
              target="_blank"
              rel="noopener noreferrer"
              className={styles.exploreLink}
            >
              Explore
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
