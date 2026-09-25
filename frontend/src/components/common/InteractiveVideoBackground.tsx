"use client";

import React, { useEffect, useRef } from "react";

/**
 * InteractiveVideoBackground
 * Ultra-clean institutional algorithmic network & market liquidity mesh.
 * Replaces noisy candlesticks/text with an elegant, ambient coordinate grid,
 * interactive cursor gravity field, and subtle harmonic trend vectors.
 */
export function InteractiveVideoBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef({ x: 0.5, y: 0.5, rawX: -1000, rawY: -1000, isHovering: false });
  const animIdRef = useRef<number | null>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = {
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
        rawX: e.clientX,
        rawY: e.clientY,
        isHovering: true,
      };
    };

    const handleMouseLeave = () => {
      mouseRef.current.isHovering = false;
      mouseRef.current.rawX = -1000;
      mouseRef.current.rawY = -1000;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    // Grid nodes that respond to cursor gravity
    interface GridNode {
      originX: number;
      originY: number;
      x: number;
      y: number;
      vx: number;
      vy: number;
    }

    const gap = 64;
    const nodes: GridNode[] = [];
    const createNodes = () => {
      nodes.length = 0;
      for (let x = 0; x <= width + gap; x += gap) {
        for (let y = 0; y <= height + gap; y += gap) {
          nodes.push({
            originX: x,
            originY: y,
            x,
            y,
            vx: 0,
            vy: 0,
          });
        }
      }
    };
    createNodes();

    let time = 0;

    const render = () => {
      time += 0.008;
      ctx.clearRect(0, 0, width, height);

      const mouse = mouseRef.current;

      // 1. Subtle, ultra-clean harmonic trend ribbons
      const ribbonCount = 3;
      for (let r = 0; r < ribbonCount; r++) {
        ctx.beginPath();
        const baseElevation = height * (0.35 + r * 0.15);
        ctx.strokeStyle = r === 0 
          ? "rgba(16, 185, 129, 0.08)" // subtle emerald trend
          : r === 1
          ? "rgba(24, 24, 27, 0.04)"   // graphite neutral
          : "rgba(220, 38, 38, 0.06)";  // subtle red resistance

        ctx.lineWidth = 1;
        const step = 20;

        for (let px = 0; px <= width + step; px += step) {
          const nx = px / width;
          const wave1 = Math.sin(nx * 4 + time * 1.5 + r * 1.2) * 20;
          const wave2 = Math.cos(nx * 8 - time * 0.8) * 10;

          // Mouse proximity curve deflection
          const distToCursor = Math.hypot(px - mouse.rawX, baseElevation - mouse.rawY);
          const cursorDeflection = mouse.isHovering && distToCursor < 250 
            ? (1 - distToCursor / 250) * 35 
            : 0;

          const py = baseElevation + wave1 + wave2 - cursorDeflection;

          if (px === 0) {
            ctx.moveTo(px, py);
          } else {
            ctx.lineTo(px, py);
          }
        }
        ctx.stroke();
      }

      // 2. Minimalist geometric coordinate points with cursor spring physics
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];

        // Distance to cursor
        const dx = mouse.rawX - node.x;
        const dy = mouse.rawY - node.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        // Repel from mouse slightly
        if (mouse.isHovering && dist < 160) {
          const force = (1 - dist / 160) * 12;
          const angle = Math.atan2(dy, dx);
          node.vx -= Math.cos(angle) * force * 0.2;
          node.vy -= Math.sin(angle) * force * 0.2;
        }

        // Spring back to origin
        const springDx = node.originX - node.x;
        const springDy = node.originY - node.y;
        node.vx += springDx * 0.08;
        node.vy += springDy * 0.08;

        // Friction damping
        node.vx *= 0.85;
        node.vy *= 0.85;

        node.x += node.vx;
        node.y += node.vy;

        // Draw micro crosshairs on grid nodes
        const isNearCursor = mouse.isHovering && dist < 180;
        const nodeAlpha = isNearCursor ? 0.25 : 0.05;

        ctx.fillStyle = `rgba(24, 24, 27, ${nodeAlpha})`;
        ctx.fillRect(node.x - 1, node.y - 1, 2, 2);

        // Subtle connecting constellation lines between displaced nodes
        if (isNearCursor && i % 4 === 0) {
          ctx.strokeStyle = `rgba(24, 24, 27, ${(1 - dist / 180) * 0.08})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(node.x, node.y);
          ctx.lineTo(mouse.rawX, mouse.rawY);
          ctx.stroke();
        }
      }

      animIdRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      if (animIdRef.current) {
        cancelAnimationFrame(animIdRef.current);
      }
    };
  }, []);

  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      aria-hidden="true"
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 h-full w-full"
      />
    </div>
  );
}
