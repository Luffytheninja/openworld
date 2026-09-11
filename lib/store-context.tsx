'use client';
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Product, PRODUCTS } from './products';

export interface CartItem {
  product: Product;
  colorway: string;
  size: string;
  quantity: number;
}

interface StoreContextType {
  searchOpen: boolean;
  setSearchOpen: (open: boolean) => void;
  checkoutOpen: boolean;
  setCheckoutOpen: (open: boolean) => void;
  selectedProduct: Product | null;
  setSelectedProduct: (product: Product | null) => void;
  cart: CartItem[];
  addToCart: (product: Product, colorway: string, size: string) => void;
  removeFromCart: (productId: string, colorway: string, size: string) => void;
  clearCart: () => void;
  totalAmount: number;
  totalCount: number;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [searchOpen, setSearchOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (product: Product, colorway: string, size: string) => {
    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.product.id === product.id && item.colorway === colorway && item.size === size
      );
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += 1;
        return updated;
      }
      return [...prev, { product, colorway, size, quantity: 1 }];
    });
    setCheckoutOpen(true);
  };

  const removeFromCart = (productId: string, colorway: string, size: string) => {
    setCart((prev) =>
      prev.filter(
        (item) => !(item.product.id === productId && item.colorway === colorway && item.size === size)
      )
    );
  };

  const clearCart = () => setCart([]);

  const totalAmount = cart.reduce((sum, item) => sum + item.product.priceNum * item.quantity, 0);
  const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <StoreContext.Provider
      value={{
        searchOpen,
        setSearchOpen,
        checkoutOpen,
        setCheckoutOpen,
        selectedProduct,
        setSelectedProduct,
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        totalAmount,
        totalCount,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
}
