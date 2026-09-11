'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { PRODUCTS, Product } from '@/lib/products';
import { useStore } from '@/lib/store-context';
import { trackEvent } from '@/lib/analytics';
import styles from './search.module.css';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const { setSelectedProduct } = useStore();

  useEffect(() => {
    trackEvent('page_view', { page: 'search' });
  }, []);

  const handleQueryChange = (val: string) => {
    setQuery(val);
    if (val.trim().length > 1) {
      trackEvent('search_performed', { query: val.trim() });
    }
  };

  const filteredProducts = query.trim()
    ? PRODUCTS.filter(
        (p) =>
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.category.toLowerCase().includes(query.toLowerCase()) ||
          p.description.toLowerCase().includes(query.toLowerCase()) ||
          p.tagline?.toLowerCase().includes(query.toLowerCase())
      )
    : PRODUCTS;

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        {/* TOP SEARCH BAR */}
        <motion.div
          className={styles.searchHeader}
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] as const }}
        >
          <div className={styles.inputWrapper}>
            <svg
              className={styles.searchIcon}
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              type="text"
              className={styles.input}
              placeholder="Search drops, heavyweight tees, frequency..."
              value={query}
              onChange={(e) => handleQueryChange(e.target.value)}
              autoFocus
            />
            {query && (
              <button
                className={styles.clearBtn}
                onClick={() => setQuery('')}
                aria-label="Clear search"
              >
                ✕
              </button>
            )}
          </div>

          <div className={styles.metaRow}>
            <span className={styles.resultsCount}>
              {query.trim()
                ? `${filteredProducts.length} drop${filteredProducts.length === 1 ? '' : 's'} matching "${query}"`
                : `All Current Drops (${PRODUCTS.length})`}
            </span>
          </div>
        </motion.div>

        {/* RESULTS GRID */}
        {filteredProducts.length === 0 ? (
          <motion.div
            className={styles.emptyState}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <p className={styles.emptyTitle}>No cargo found matching &quot;{query}&quot;</p>
            <p className={styles.emptySubtitle}>Try searching for &quot;Black&quot;, &quot;Yellow&quot;, &quot;White&quot;, or &quot;Blinding Lights&quot;.</p>
            <button className={styles.resetBtn} onClick={() => setQuery('')}>
              View All Drops
            </button>
          </motion.div>
        ) : (
          <motion.div
            className={styles.grid}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            key={query}
          >
            {filteredProducts.map((product) => (
              <motion.div
                key={product.id}
                variants={itemVariants}
                whileHover={{ y: -5, transition: { duration: 0.25, ease: 'easeOut' } }}
                className={styles.card}
                onClick={() => {
                  trackEvent('product_view', { productId: product.id, name: product.name });
                  setSelectedProduct(product);
                }}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && setSelectedProduct(product)}
              >
                <div className={styles.imageContainer}>
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
                    <span>Quick View</span>
                  </div>
                </div>

                <div className={styles.info}>
                  <h3 className={styles.productTitle}>{product.name}</h3>
                  <p className={styles.productPrice}>{product.price}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}
