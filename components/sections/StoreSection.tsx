'use client';
import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import styles from './StoreSection.module.css';

const SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL'] as const;

const COLORWAYS = [
  { id: 'black', label: 'Black', swatch: '#0A0A0A', front: '/images/blbf.png', back: '/images/blbb.png' },
  { id: 'yellow', label: 'Yellow', swatch: '#F5C200', front: '/images/blyf.png', back: '/images/blyb.png' },
  { id: 'white', label: 'White', swatch: '#FFFFFF', front: '/images/blwf.png', back: '/images/blwb.png' },
] as const;

const SIZE_GUIDE = [
  { size: 'XS', chest: '86–91', length: '68', shoulder: '42' },
  { size: 'S',  chest: '91–96', length: '70', shoulder: '44' },
  { size: 'M',  chest: '96–101', length: '72', shoulder: '46' },
  { size: 'L',  chest: '101–106', length: '74', shoulder: '48' },
  { size: 'XL', chest: '106–111', length: '76', shoulder: '50' },
  { size: 'XXL',chest: '111–116', length: '78', shoulder: '52' },
];

export default function StoreSection() {
  const [colorway, setColorway] = useState<'black' | 'yellow'>('black');
  const [view, setView] = useState<'front' | 'back'>('front');
  const [size, setSize] = useState<string | null>(null);
  const [guideOpen, setGuideOpen] = useState(false);

  const current = COLORWAYS.find(c => c.id === colorway)!;
  const imgSrc = view === 'front' ? current.front : current.back;

  const waLink = `https://wa.me/2347013927121?text=${encodeURIComponent(
    `Hi OPN WRLD, I'd like to preorder the Blinding Lights 001 Tee.\nColorway: ${current.label}\nSize: ${size ?? '(not selected)'}\nName: `
  )}`;

  return (
    <>
      <section id="store" className={styles.store}>
        <div className={styles.container}>
          {/* SECTION HEADER */}
          <div className={styles.sectionHeader}>
            <p className={styles.sectionLabel}>Store / X01</p>
            <h2 className={styles.sectionTitle}>Blinding Lights</h2>
          </div>

          {/* PRODUCT GRID */}
          <div className={styles.product}>
            {/* IMAGE PANEL */}
            <div className={styles.imagePanel}>
              <div className={styles.mainImageWrap}>
                <Image
                  src={imgSrc}
                  alt={`OPN WRLD 001 Tee — ${current.label} ${view}`}
                  fill
                  sizes="(max-width: 900px) 100vw, 50vw"
                  className={styles.mainImage}
                  priority
                />
              </div>
              <div className={styles.thumbRow}>
                {COLORWAYS.map(c => (
                  ['front', 'back'] as const
                ).map(v => (
                  <button
                    key={`${c.id}-${v}`}
                    className={`${styles.thumb} ${colorway === c.id && view === v ? styles.active : ''}`}
                    onClick={() => { setColorway(c.id as 'black' | 'yellow'); setView(v); }}
                    aria-label={`${c.label} ${v}`}
                  >
                    <Image src={v === 'front' ? c.front : c.back} alt={`${c.label} ${v}`} fill className={styles.thumbImg} sizes="72px" />
                  </button>
                ))).flat()}
              </div>
            </div>

            {/* DETAIL PANEL */}
            <div className={styles.detailPanel}>
              <div className={styles.productMeta}>
                <span className={styles.code}>X01 / Apparel</span>
                <span className={styles.preorderBadge}>Cargo En Route</span>
              </div>

              <h2 className={styles.productName}>OPN WRLD<br />Blinding Lights Tee</h2>
              <p className={styles.productPrice}>₦30,000</p>

              {/* COLORWAY */}
              <div className={styles.selector}>
                <div className={styles.selectorLabel}>
                  <span>Colorway</span>
                  <span className={styles.selectorValue}>{current.label}</span>
                </div>
                <div className={styles.swatches}>
                  {COLORWAYS.map(c => (
                    <button
                      key={c.id}
                      className={`${styles.swatch} ${colorway === c.id ? styles.active : ''}`}
                      onClick={() => { setColorway(c.id as 'black' | 'yellow'); setView('front'); }}
                      aria-label={`Select ${c.label} colorway`}
                    >
                      <span className={styles.swatchDot} style={{ background: c.swatch, borderColor: c.id === 'yellow' ? '#E0E0E0' : 'transparent' }} />
                      <span className={styles.swatchName}>{c.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* SIZE */}
              <div className={styles.selector}>
                <div className={styles.selectorLabel}>
                  <span>Size</span>
                  <span className={styles.selectorValue}>{size ?? 'Select'}</span>
                </div>
                <div className={styles.sizes}>
                  {SIZES.map(s => (
                    <button
                      key={s}
                      className={`${styles.sizeBtn} ${size === s ? styles.active : ''}`}
                      onClick={() => setSize(s)}
                      aria-label={`Size ${s}`}
                      aria-pressed={size === s}
                    >
                      {s}
                    </button>
                  ))}
                </div>
                <button className={styles.sizeGuideLink} onClick={() => setGuideOpen(true)}>
                  Size Guide
                </button>
              </div>

              {/* CTA */}
              <div className={styles.ctaWrap}>
                <motion.a
                  href={`https://wa.me/2347013927121?text=${encodeURIComponent(
                    `Hi OPN WRLD, I'd like to preorder the Blinding Lights 001 Tee.\nColorway: ${colorway.toUpperCase()}\nSize: ${size ?? '(not selected)'}\nName: `
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.secureCargo}
                  aria-label="Secure Cargo via WhatsApp"
                  whileHover={{ rotateY: 360 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 10 }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  Secure Cargo
                </motion.a>
                <p className={styles.ctaNote}>Preorder via WhatsApp — Ships August 2026</p>
              </div>

              {/* DESCRIPTION */}
              <div className={styles.infoBlock}>
                <h4>About</h4>
                <p>Premium heavyweight cotton tee. First transmission from the frequency. Oversized fit with dropped shoulders and a screen-printed graphic. Built for those who move with intention.</p>
              </div>

              {/* FABRIC */}
              <div className={styles.infoBlock}>
                <h4>Fabric & Construction</h4>
                <ul className={styles.fabricList}>
                  <li>280gsm 100% ringspun cotton</li>
                  <li>Oversized fit, dropped shoulder</li>
                  <li>Pre-washed for minimal shrinkage</li>
                  <li>Screen-printed graphic, Lagos 2026</li>
                  <li>Ribbed crew neck</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SIZE GUIDE MODAL */}
      {guideOpen && (
        <div className={styles.guideOverlay} onClick={() => setGuideOpen(false)} role="dialog" aria-modal aria-label="Size guide">
          <div className={styles.guideModal} onClick={e => e.stopPropagation()}>
            <button className={styles.guideClose} onClick={() => setGuideOpen(false)}>Close ×</button>
            <p className={styles.guideTitle}>Size Guide — 001 Tee (cm)</p>
            <table className={styles.guideTable}>
              <thead>
                <tr>
                  <th>Size</th>
                  <th>Chest</th>
                  <th>Length</th>
                  <th>Shoulder</th>
                </tr>
              </thead>
              <tbody>
                {SIZE_GUIDE.map(row => (
                  <tr key={row.size}>
                    <td>{row.size}</td>
                    <td>{row.chest}</td>
                    <td>{row.length}</td>
                    <td>{row.shoulder}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
}
