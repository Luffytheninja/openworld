'use client';
import { useState, useEffect } from 'react';
import { useStore } from '@/lib/store-context';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './ProductDetailModal.module.css';

export default function ProductDetailModal() {
  const { selectedProduct, setSelectedProduct, addToCart } = useStore();
  const [selectedColor, setSelectedColor] = useState('black');
  const [view, setView] = useState<'front' | 'back'>('front');
  const [selectedSize, setSelectedSize] = useState<string>('L');

  useEffect(() => {
    if (selectedProduct) {
      setSelectedColor(selectedProduct.colorways[0]?.id || 'black');
      setSelectedSize(selectedProduct.sizes[2] || selectedProduct.sizes[0] || 'M');
      setView('front');
    }
  }, [selectedProduct]);

  if (!selectedProduct) return null;

  const isComingSoon = selectedProduct.status === 'coming_soon';
  const currentColorway =
    selectedProduct.colorways.find((c) => c.id === selectedColor) || selectedProduct.colorways[0];
  const activeImage =
    view === 'front' ? currentColorway?.front || selectedProduct.image : currentColorway?.back || selectedProduct.backImage || selectedProduct.image;

  const handleWhatsAppPreorder = () => {
    if (isComingSoon) {
      const message = `Hi OPN WRLD, I'm interested in the upcoming ${selectedProduct.name} (Drop 002). Please notify me when it drops!`;
      window.open(`https://wa.me/2347013927121?text=${encodeURIComponent(message)}`, '_blank');
      return;
    }
    const message = `Hi OPN WRLD, I'd like to preorder the ${selectedProduct.name}.\nColorway: ${currentColorway?.label.toUpperCase()}\nSize: ${selectedSize}\nPrice: ${selectedProduct.price}\nName: `;
    window.open(`https://wa.me/2347013927121?text=${encodeURIComponent(message)}`, '_blank');
  };

  const handleAddToCart = () => {
    if (isComingSoon) return;
    addToCart(selectedProduct, currentColorway?.label || 'Black', selectedSize);
    setSelectedProduct(null);
  };

  return (
    <AnimatePresence>
      <motion.div
        className={styles.overlay}
        onClick={() => setSelectedProduct(null)}
        role="dialog"
        aria-modal
        aria-label="Product Details"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
      >
        <motion.div
          className={styles.modal}
          onClick={(e) => e.stopPropagation()}
          initial={{ opacity: 0, scale: 0.96, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 16 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] as const }}
        >
          <button className={styles.closeBtn} onClick={() => setSelectedProduct(null)} aria-label="Close product view">
            ✕
          </button>

          <div className={styles.grid}>
            {/* IMAGE SIDE */}
            <div className={styles.imageColumn}>
              <div className={styles.mainImageWrap}>
                <Image
                  src={activeImage}
                  alt={`${selectedProduct.name} - ${currentColorway?.label || ''}`}
                  fill
                  className={styles.mainImage}
                  priority
                />
              </div>
              {currentColorway?.back && (
                <div className={styles.viewToggle}>
                  <button
                    className={`${styles.toggleBtn} ${view === 'front' ? styles.activeToggle : ''}`}
                    onClick={() => setView('front')}
                  >
                    Front
                  </button>
                  <button
                    className={`${styles.toggleBtn} ${view === 'back' ? styles.activeToggle : ''}`}
                    onClick={() => setView('back')}
                  >
                    Back
                  </button>
                </div>
              )}
            </div>

            {/* DETAILS SIDE */}
            <div className={styles.detailsColumn}>
              <div className={styles.categoryBadge}>
                {isComingSoon ? 'DROP 002 / COMING SOON' : `${selectedProduct.category.toUpperCase()} / PREORDER`}
              </div>
              <h2 className={styles.title}>{selectedProduct.name}</h2>
              <p className={styles.price}>{selectedProduct.price}</p>
              <p className={styles.tagline}>{selectedProduct.tagline || 'Heavyweight 280gsm Streetwear'}</p>

              {/* COLORWAYS */}
              {selectedProduct.colorways.length > 0 && (
                <div className={styles.section}>
                  <label className={styles.sectionLabel}>Colorway: <span>{currentColorway?.label}</span></label>
                  <div className={styles.swatchList}>
                    {selectedProduct.colorways.map((c) => (
                      <button
                        key={c.id}
                        className={`${styles.swatchBtn} ${selectedColor === c.id ? styles.selectedSwatch : ''}`}
                        onClick={() => {
                          setSelectedColor(c.id);
                          setView('front');
                        }}
                      >
                        <span className={styles.swatchDot} style={{ background: c.hex }} />
                        <span className={styles.swatchText}>{c.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* SIZES */}
              <div className={styles.section}>
                <label className={styles.sectionLabel}>Size: <span>{selectedSize}</span></label>
                <div className={styles.sizeList}>
                  {selectedProduct.sizes.map((s) => (
                    <button
                      key={s}
                      className={`${styles.sizeBtn} ${selectedSize === s ? styles.selectedSize : ''}`}
                      onClick={() => setSelectedSize(s)}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <p className={styles.description}>{selectedProduct.description}</p>

              <div className={styles.actions}>
                <button className={styles.primaryBtn} onClick={handleWhatsAppPreorder}>
                  {isComingSoon ? 'Notify Me When Available' : 'Secure Preorder via WhatsApp'}
                </button>
                {!isComingSoon && (
                  <button className={styles.secondaryBtn} onClick={handleAddToCart}>
                    Add to Cargo Bag
                  </button>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
