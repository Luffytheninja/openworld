'use client';
import { useState, useEffect, useRef } from 'react';
import { useStore } from '@/lib/store-context';
import { PRODUCTS, Product } from '@/lib/products';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './SearchModal.module.css';

export default function SearchModal() {
  const { searchOpen, setSearchOpen, setSelectedProduct } = useStore();
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (searchOpen) {
      setTimeout(() => inputRef.current?.focus(), 80);
    } else {
      setQuery('');
    }
  }, [searchOpen]);

  if (!searchOpen) return null;

  const results = query.trim()
    ? PRODUCTS.filter(
        (p) =>
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.category.toLowerCase().includes(query.toLowerCase()) ||
          p.description.toLowerCase().includes(query.toLowerCase())
      )
    : PRODUCTS.slice(0, 4);

  const handleSelect = (product: Product) => {
    setSelectedProduct(product);
    setSearchOpen(false);
  };

  return (
    <AnimatePresence>
      <motion.div
        className={styles.overlay}
        onClick={() => setSearchOpen(false)}
        role="dialog"
        aria-modal
        aria-label="Search"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        <motion.div
          className={styles.modal}
          onClick={(e) => e.stopPropagation()}
          initial={{ opacity: 0, y: -20, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.98 }}
          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] as const }}
        >
          <div className={styles.header}>
            <input
              ref={inputRef}
              type="text"
              className={styles.input}
              placeholder="Search cargo, shirts, caps..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button className={styles.closeBtn} onClick={() => setSearchOpen(false)} aria-label="Close search">
              ✕
            </button>
          </div>

          <div className={styles.resultsHeader}>
            <span>{query.trim() ? `Results (${results.length})` : 'Popular Items'}</span>
          </div>

          <div className={styles.resultsList}>
            {results.length === 0 ? (
              <p className={styles.empty}>No drops found matching &quot;{query}&quot;</p>
            ) : (
              results.map((product) => (
                <div
                  key={product.id}
                  className={styles.resultItem}
                  onClick={() => handleSelect(product)}
                >
                  <div className={styles.itemImageWrap}>
                    <Image src={product.image} alt={product.name} fill className={styles.itemImage} sizes="50px" />
                  </div>
                  <div className={styles.itemInfo}>
                    <span className={styles.itemName}>{product.name}</span>
                    <span className={styles.itemCategory}>{product.category.toUpperCase()}</span>
                  </div>
                  <span className={styles.itemPrice}>{product.price}</span>
                </div>
              ))
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
