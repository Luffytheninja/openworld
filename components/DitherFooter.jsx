'use client';
import { useEffect, useRef } from 'react';

/* Animated, interactive 1-bit dither image.
   - Intro: image dithers in left to right (ordered/Bayer reveal)
   - Idle: faint pixel shimmer + a light glint that sweeps across every 10s
   - Pointer: an inverted, rippling lens follows the cursor/finger
   - Click/tap: a dithered shockwave ring
   Options: fg, bg ([r,g,b]), radius (px in image space) */
function initDitherFooter(canvas, src, opts) {
  if (!canvas) return () => {};
  const o = Object.assign({ fg: [255, 255, 255], bg: [29, 29, 31], radius: 58 }, opts);
  const ctx = canvas.getContext('2d');
  if (!ctx) return () => {};
  const reduce = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let raf = 0, stop = false, visible = true;
  const cleanups = [];
  const img = new Image();

  img.onload = () => {
    if (stop) return;
    const W = img.naturalWidth, H = img.naturalHeight;
    canvas.width = W; canvas.height = H;

    // 1. read the source into a 1-bit mask
    const off = document.createElement('canvas');
    off.width = W; off.height = H;
    const octx = off.getContext('2d');
    if (!octx) return;
    octx.drawImage(img, 0, 0);
    const d = octx.getImageData(0, 0, W, H).data;
    const S = new Uint8Array(W * H);
    for (let i = 0; i < W * H; i++) S[i] = d[i * 4] > 127 ? 1 : 0;

    // 2. 8x8 Bayer matrix (0..1) for dithered transitions
    const bayer = new Float32Array(64);
    for (let y = 0; y < 8; y++) for (let x = 0; x < 8; x++) {
      let v = 0;
      for (let i = 2; i >= 0; i--) {
        const xb = (x >> i) & 1, yb = (y >> i) & 1;
        v = (v << 2) | ((xb ^ yb) << 1) | yb;
      }
      bayer[y * 8 + x] = v / 64;
    }
    const hash = (x, y, s) => {
      let h = Math.imul(x, 374761393) + Math.imul(y, 668265263) + Math.imul(s, 1274126177);
      h = Math.imul(h ^ (h >>> 13), 1274126177);
      return ((h ^ (h >>> 16)) >>> 0) / 4294967296;
    };

    const pack = (c) => (255 << 24) | (c[2] << 16) | (c[1] << 8) | c[0];
    const FG = pack(o.fg), BG = pack(o.bg);
    const frameData = ctx.createImageData(W, H);
    const px = new Uint32Array(frameData.data.buffer);

    // 3. pointer state (image-space coordinates)
    let tx = 0, ty = 0, cx = 0, cy = 0, target = 0, s = 0;
    const waves = [];
    const toImg = (e) => {
      const r = canvas.getBoundingClientRect();
      return [((e.clientX - r.left) / r.width) * W, ((e.clientY - r.top) / r.height) * H];
    };
    const on = (type, fn) => { canvas.addEventListener(type, fn); cleanups.push(() => canvas.removeEventListener(type, fn)); };
    on('pointermove', (e) => {
      [tx, ty] = toImg(e);
      if (target === 0) { cx = tx; cy = ty; }
      target = 1;
    });
    on('pointerleave', () => { target = 0; });
    on('pointerdown', (e) => {
      [tx, ty] = toImg(e); cx = tx; cy = ty; target = 1;
      waves.push({ x: tx, y: ty, t0: performance.now() / 1000 });
      if (waves.length > 4) waves.shift();
    });
    on('pointerup', (e) => { if (e.pointerType !== 'mouse') target = 0; });

    let io;
    if (typeof IntersectionObserver !== 'undefined') {
      io = new IntersectionObserver(([en]) => { visible = en ? en.isIntersecting : true; });
      io.observe(canvas);
      cleanups.push(() => io.disconnect());
    }

    const T0 = performance.now() / 1000;
    const R = o.radius, R2 = R * R;

    const frame = () => {
      if (stop) return;
      if (!reduce) raf = requestAnimationFrame(frame);
      if (!visible && !reduce) return;
      const now = performance.now() / 1000, t = reduce ? 99 : now - T0;
      cx += (tx - cx) * 0.25; cy += (ty - cy) * 0.25;
      s += (target - s) * 0.12;
      const reveal = Math.min(1, t / 2.2);
      const step = (t * 9) | 0;
      const phase = (t % 10) / 4;
      const gx = phase < 1 ? (phase * 1.3 - 0.15) * W : -9999;
      const active = !reduce && s > 0.01;
      while (waves.length && now - waves[0].t0 > 1.5) waves.shift();

      for (let y = 0; y < H; y++) {
        for (let x = 0; x < W; x++) {
          const i = y * W + x;
          const bm = bayer[(y & 7) * 8 + (x & 7)];
          if (reveal < 1 && (x / W) * 0.55 + bm * 0.45 > reveal) { px[i] = BG; continue; }

          let sx = x, sy = y, inv = 0;
          if (active) {
            const dx = x - cx, dy = y - cy, d2 = dx * dx + dy * dy;
            if (d2 < R2) {
              const dist = Math.sqrt(d2), f = (1 - dist / R) * s, ph = dist * 0.3 - t * 7;
              sx = Math.min(W - 1, Math.max(0, x + Math.round(Math.sin(ph) * f * 5)));
              sy = Math.min(H - 1, Math.max(0, y + Math.round(Math.cos(ph) * f * 3)));
              if (bm < f * 1.25 - 0.15) inv = 1;
            }
          }
          let v = S[sy * W + sx];
          const h = hash(x, y, step);
          if (!reduce) {
            if (gx > -9000) { const g = Math.abs(x - gx); if (g < 16 && h < 0.22 * (1 - g / 16)) v = 1; }
            if (h < 0.003) v ^= 1;
          }
          if (inv) v ^= 1;
          for (let k = 0; k < waves.length; k++) {
            const age = now - waves[k].t0, wx = x - waves[k].x, wy = y - waves[k].y;
            const fade = 1 - age / 1.5;
            if (Math.abs(Math.sqrt(wx * wx + wy * wy) - age * 320) < 5 && bm < fade * 1.1) v ^= 1;
          }
          px[i] = v ? FG : BG;
        }
      }
      ctx.putImageData(frameData, 0, 0);
    };
    frame();
  };
  img.src = src;

  return () => { stop = true; cancelAnimationFrame(raf); cleanups.forEach((fn) => fn()); };
}

// Put the image in /public/footer-dither.png, then drop <DitherFooter /> in your footer.
export default function DitherFooter({ src = '/footer-dither.png', alt = 'Dithered illustration of people working in a studio', style, ...opts }) {
  const ref = useRef(null);
  useEffect(() => initDitherFooter(ref.current, src, opts), [src]);
  return (
    <canvas
      ref={ref}
      width={934}
      height={312}
      role="img"
      aria-label={alt}
      style={{ display: 'block', width: '100%', height: 'auto', imageRendering: 'pixelated', touchAction: 'pan-y', cursor: 'crosshair', ...style }}
    />
  );
}
