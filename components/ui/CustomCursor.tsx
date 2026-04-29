'use client';
import { useEffect, useRef } from 'react';
import styles from './CustomCursor.module.css';

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let tx = 0, ty = 0; // target x, y
    let rx = 0, ry = 0; // current ring position
    let frameId: number;

    const move = (e: MouseEvent) => {
      const { clientX: x, clientY: y } = e;
      tx = x;
      ty = y;
      
      if (dotRef.current) {
        dotRef.current.style.left = `${x}px`;
        dotRef.current.style.top = `${y}px`;
      }
    };

    const raf = () => {
      rx += (tx - rx) * 0.14;
      ry += (ty - ry) * 0.14;
      
      if (ringRef.current) {
        ringRef.current.style.left = `${rx}px`;
        ringRef.current.style.top = `${ry}px`;
      }
      frameId = requestAnimationFrame(raf);
    };

    window.addEventListener('mousemove', move);
    frameId = requestAnimationFrame(raf);
    return () => {
      window.removeEventListener('mousemove', move);
      cancelAnimationFrame(frameId);
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className={styles.cursor} aria-hidden="true" />
      <div ref={ringRef} className={styles.ring} aria-hidden="true" />
    </>
  );
}
