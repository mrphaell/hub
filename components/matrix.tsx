"use client";

import { useEffect, useRef } from "react";

export default function Matrix() {
  const timeout = 30;
  const canvas = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!canvas.current) return;
    const context = canvas.current.getContext("2d");
    if (!context) return;

    const width = window.innerWidth;
    const height = window.innerHeight;
    canvas.current.width = width;
    canvas.current.height = height;

    context.fillStyle = "#000";
    context.fillRect(0, 0, width, height);

    // calculate how many 'lines' to show and animate
    const columns = Math.floor(width / 20) + 1;
    const yPositions: number[] = Array.from<number>({ length: columns }).fill(
      0
    );

    context.fillStyle = "#000";
    context.fillRect(0, 0, width, height);

    const matrixEffect = () => {
      context.fillStyle = "rgba(0, 0, 0, 0.15)";
      context.fillRect(0, 0, width, height);

      context.fillStyle = "#0f0";
      context.font = "9pt monospace";

      yPositions.forEach((y, index) => {
        const chars =
          "アァカサタナハマヤャラワ0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        const text = chars[Math.floor(Math.random() * chars.length)];
        const x = index * 20;
        context.fillText(text, x, y);

        if (y > 100 + Math.random() * 10000) {
          yPositions[index] = 0;
        } else {
          yPositions[index] = y + 20;
        }
      });
    };

    const interval = setInterval(matrixEffect, timeout);
    return () => {
      clearInterval(interval);
    };
  }, [canvas, timeout]);
  return (
    <div className="fixed inset-0 -z-10 pointer-events-none">
      <canvas ref={canvas} className="block" />
    </div>
  );
}
