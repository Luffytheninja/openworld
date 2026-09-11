export interface Product {
  id: string;
  name: string;
  price: string;
  priceNum: number;
  category: 'shirts' | 'shorts' | 'trousers' | 'caps';
  image: string;
  backImage?: string;
  description: string;
  tagline?: string;
  colorways: { id: string; label: string; hex: string; front: string; back: string }[];
  sizes: string[];
  status: 'available' | 'preorder' | 'coming_soon';
}

export const PRODUCTS: Product[] = [
  {
    id: 'blinding-lights-black',
    name: 'Blinding Lights — Black',
    price: 'N30,000',
    priceNum: 30000,
    category: 'shirts',
    image: '/images/blbf.png',
    backImage: '/images/blbb.png',
    description: '280gsm heavyweight ringspun cotton tee with signature Lagos streetwear cut. Custom dropped shoulder profile, ribbed crew neck, pre-washed for zero shrinkage.',
    tagline: 'Drop 001 — Blinding Lights (Black)',
    colorways: [
      { id: 'black', label: 'Black', hex: '#0A0A0A', front: '/images/blbf.png', back: '/images/blbb.png' },
      { id: 'yellow', label: 'Yellow', hex: '#F5C200', front: '/images/blyf.png', back: '/images/blyb.png' },
      { id: 'white', label: 'White', hex: '#FFFFFF', front: '/images/blwf.png', back: '/images/blwb.png' },
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    status: 'preorder',
  },
  {
    id: 'blinding-lights-yellow',
    name: 'Blinding Lights — Yellow',
    price: 'N30,000',
    priceNum: 30000,
    category: 'shirts',
    image: '/images/blyf.png',
    backImage: '/images/blyb.png',
    description: '280gsm heavyweight ringspun cotton tee in electric yellow with signature Lagos streetwear cut and high-density frequency print.',
    tagline: 'Drop 001 — Blinding Lights (Yellow)',
    colorways: [
      { id: 'yellow', label: 'Yellow', hex: '#F5C200', front: '/images/blyf.png', back: '/images/blyb.png' },
      { id: 'black', label: 'Black', hex: '#0A0A0A', front: '/images/blbf.png', back: '/images/blbb.png' },
      { id: 'white', label: 'White', hex: '#FFFFFF', front: '/images/blwf.png', back: '/images/blwb.png' },
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    status: 'preorder',
  },
  {
    id: 'blinding-lights-white',
    name: 'Blinding Lights — White',
    price: 'N30,000',
    priceNum: 30000,
    category: 'shirts',
    image: '/images/blwf.png',
    backImage: '/images/blwb.png',
    description: '280gsm heavyweight ringspun cotton tee in raw optic white. Reinforced twin-needle stitching and signature streetwear silhouette.',
    tagline: 'Drop 001 — Blinding Lights (White)',
    colorways: [
      { id: 'white', label: 'White', hex: '#FFFFFF', front: '/images/blwf.png', back: '/images/blwb.png' },
      { id: 'black', label: 'Black', hex: '#0A0A0A', front: '/images/blbf.png', back: '/images/blbb.png' },
      { id: 'yellow', label: 'Yellow', hex: '#F5C200', front: '/images/blyf.png', back: '/images/blyb.png' },
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    status: 'preorder',
  },
];

export const CATEGORIES = [
  { id: 'shirts', label: 'Shirts', href: '/shirts' },
  { id: 'shorts', label: 'Shorts', href: '/shorts' },
  { id: 'trousers', label: 'Trousers', href: '/trousers' },
  { id: 'caps', label: 'Caps', href: '/caps' },
] as const;
