'use client';
import Image from 'next/image';
import { useStore } from '@/lib/store-context';
import { PRODUCTS, Product } from '@/lib/products';
import styles from './NewHomeSection.module.css';

export default function NewHomeSection() {
  const { setSelectedProduct } = useStore();

  // Find products matching the reference: White, Black, Yellow
  const whiteShirt = PRODUCTS.find((p) => p.id === 'blinding-lights-white') || PRODUCTS[2] || PRODUCTS[0];
  const blackShirt = PRODUCTS.find((p) => p.id === 'blinding-lights-black') || PRODUCTS[0];
  const yellowShirt = PRODUCTS.find((p) => p.id === 'blinding-lights-yellow') || PRODUCTS[1];

  const featuredShirts = [
    { product: whiteShirt, image: '/images/blwf.png', alt: 'Blinding Lights — White' },
    { product: blackShirt, image: '/images/blbf.png', alt: 'Blinding Lights — Black' },
    { product: yellowShirt, image: '/images/blyf.png', alt: 'Blinding Lights — Yellow' },
  ];

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
  };

  return (
    <div className={styles.pageWrap}>
      <div className={styles.container}>
        {/* ─── SECTION 1: AVAILABLE NOW ─── */}
        <section className={styles.availableSection} aria-label="Available Now">
          <h1 className={styles.headlineAvailable}>
            <span>Available</span>
            <span>Now</span>
          </h1>

          {/* 3 SHIRTS ROW */}
          <div className={styles.productsGrid}>
            {featuredShirts.map((item, idx) => (
              <div
                key={item.product?.id || idx}
                className={styles.productCard}
                onClick={() => item.product && handleProductClick(item.product)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && item.product && handleProductClick(item.product)}
                aria-label={`View ${item.alt}`}
              >
                <div className={styles.imageContainer}>
                  <Image
                    src={item.image}
                    alt={item.alt}
                    width={340}
                    height={340}
                    priority
                    className={styles.productImg}
                  />
                </div>
                <div className={styles.priceRow}>
                  <span className={styles.priceText}>{item.product?.price || '₦30,000'}</span>
                </div>
              </div>
            ))}
          </div>

          {/* DROP DETAILS */}
          <div className={styles.dropDetails}>
            <h2 className={styles.dropTitle}>Blinding Lights</h2>
            <div className={styles.dropDescription}>
              <p className={styles.detailsLabel}>Details of the drop</p>
              <p className={styles.detailsBody}>
                consectetur. Est nisi sed molestie libero ultrices viverra amet urna ultrices. Donec tempus pharetra pellentesque eget elit sed potenti.
              </p>
            </div>
          </div>

          {/* HORIZONTAL DIVIDER RULE */}
          <hr className={styles.divider} />
        </section>

        {/* ─── SECTION 2: PSST! / PUMP / COMING SOON ─── */}
        <section className={styles.teaserSection} aria-label="Coming Soon Teaser">
          <h2 className={styles.headlinePsst}>Psst!</h2>

          {/* HERO BANNER CARD */}
          <div className={styles.bannerCard}>
            <Image
              src="/images/pump-live-the-cover.png"
              alt="Pump — Live The Cover teaser"
              width={1100}
              height={607}
              priority
              className={styles.bannerImg}
            />
          </div>

          {/* COMING SOON HEADLINE */}
          <h2 className={styles.headlineComingSoon}>Coming Soon</h2>
        </section>
      </div>
    </div>
  );
}
