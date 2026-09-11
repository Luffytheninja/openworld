'use client';
import { useStore } from '@/lib/store-context';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './CheckoutModal.module.css';

export default function CheckoutModal() {
  const { checkoutOpen, setCheckoutOpen, cart, removeFromCart, totalAmount, clearCart } = useStore();

  if (!checkoutOpen) return null;

  const generateWhatsAppLink = () => {
    if (cart.length === 0) {
      return 'https://wa.me/2347013927121?text=Hi%20OPN%20WRLD%2C%20I%27d%20like%20to%20inquire%20about%20your%20current%20drop.';
    }
    const orderItems = cart
      .map((item) => `- ${item.product.name} (${item.colorway.toUpperCase()} / Size: ${item.size}) x${item.quantity} [₦${(item.product.priceNum * item.quantity).toLocaleString()}]`)
      .join('\n');

    const message = `Hi OPN WRLD, I'd like to preorder the following cargo:\n\n${orderItems}\n\nTotal: ₦${totalAmount.toLocaleString()}\nName: \nDelivery Address: `;

    return `https://wa.me/2347013927121?text=${encodeURIComponent(message)}`;
  };

  return (
    <AnimatePresence>
      <motion.div
        className={styles.overlay}
        onClick={() => setCheckoutOpen(false)}
        role="dialog"
        aria-modal
        aria-label="Checkout"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
      >
        <motion.div
          className={styles.drawer}
          onClick={(e) => e.stopPropagation()}
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] as const }}
        >
          <div className={styles.header}>
            <h3 className={styles.title}>Your Cargo ({cart.length})</h3>
            <button className={styles.closeBtn} onClick={() => setCheckoutOpen(false)} aria-label="Close drawer">
              ✕
            </button>
          </div>

          {cart.length === 0 ? (
            <div className={styles.empty}>
              <p className={styles.emptyTitle}>Your bag is empty</p>
              <p className={styles.emptySubtitle}>Explore the latest drops and secure your cargo.</p>
              <button className={styles.exploreBtn} onClick={() => setCheckoutOpen(false)}>
                Browse Drops
              </button>
            </div>
          ) : (
            <>
              <div className={styles.itemList}>
                {cart.map((item, idx) => (
                  <motion.div
                    key={`${item.product.id}-${item.colorway}-${item.size}-${idx}`}
                    className={styles.cartItem}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25, delay: idx * 0.05 }}
                  >
                    <div className={styles.itemImageWrap}>
                      <Image src={item.product.image} alt={item.product.name} fill className={styles.itemImage} sizes="64px" />
                    </div>
                    <div className={styles.itemDetails}>
                      <div className={styles.itemTop}>
                        <span className={styles.itemName}>{item.product.name}</span>
                        <button
                          className={styles.removeBtn}
                          onClick={() => removeFromCart(item.product.id, item.colorway, item.size)}
                          aria-label="Remove item"
                        >
                          ✕
                        </button>
                      </div>
                      <span className={styles.itemVariant}>
                        Color: {item.colorway} | Size: {item.size} | Qty: {item.quantity}
                      </span>
                      <span className={styles.itemPrice}>
                        ₦{(item.product.priceNum * item.quantity).toLocaleString()}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className={styles.footer}>
                <div className={styles.summaryRow}>
                  <span>Subtotal</span>
                  <span className={styles.totalPrice}>₦{totalAmount.toLocaleString()}</span>
                </div>
                <p className={styles.notice}>Free Lagos delivery on preorder drops. Dispatched August 2026.</p>

                <div className={styles.actions}>
                  <a
                    href={generateWhatsAppLink()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.checkoutBtn}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                    Preorder on WhatsApp
                  </a>
                  <button className={styles.clearBtn} onClick={clearCart}>
                    Clear Bag
                  </button>
                </div>
              </div>
            </>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
