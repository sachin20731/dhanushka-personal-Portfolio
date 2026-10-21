"use client";

import { useEffect, useRef, useState } from "react";

/* ------------------------------------------------------------------
   Approach radar scope
   A canvas "PPI" display: a rotating sweep lights up aircraft targets,
   which then fade like phosphor until the next pass. Each target has a
   history trail, a 1-minute predictor line and an ATC data tag.
   All traffic is simulated.
------------------------------------------------------------------- */

type Aircraft = {
  callsign: string;
  x: number; // scope units: centre = 0, edge = 1, y grows downward
  y: number;
  hdg: number; // degrees, 0 = north, clockwise
  spd: number; // scope units per second
  fl: number; // flight level (hundreds of feet)
  kts: number;
  vs: -1 | 0 | 1; // descending / level / climbing
  kind: "transit" | "arrival" | "own";
  trail: { x: number; y: number }[];
  sinceSweep: number; // 0..1 share of a rotation since the sweep passed
};

const SWEEP_SECONDS = 4.5;
const RUNWAY_HDG = 40; // runway 04/22
const CALLSIGNS = ["ALK227", "UAE652", "QTR654", "SIA468", "IGO1033", "ALK302", "THY714", "AIC273", "FDB569", "MAS179"];

const COLORS = {
  ring: "rgba(164,155,234,0.16)",
  tick: "rgba(164,155,234,0.35)",
  sweep: [164, 155, 234] as const,
  target: [233, 231, 240] as const,
  own: [52, 211, 153] as const,
  label: "rgba(233,231,240,0.9)",
  sub: "rgba(155,151,170,0.95)",
};

const rad = (deg: number) => (deg * Math.PI) / 180;
const rand = (a: number, b: number) => a + Math.random() * (b - a);
const pick = <T,>(arr: readonly T[]) => arr[Math.floor(Math.random() * arr.length)];
const rgba = (c: readonly number[], a: number) => `rgba(${c[0]},${c[1]},${c[2]},${a})`;

function spawnTransit(used: Set<string>, outer = false): Aircraft {
  const edge = rand(0, Math.PI * 2);
  const x = Math.cos(edge) * 1.05;
  const y = Math.sin(edge) * 1.05;
  // Aim at a point near the centre, or (outer) at a point on the outer rings
  // so the track stays clear of whatever sits in the middle of the scope.
  const aim = edge + (Math.random() < 0.5 ? -1 : 1) * rad(rand(55, 95));
  const aimR = rand(0.7, 0.85);
  const tx = outer ? Math.cos(aim) * aimR : rand(-0.5, 0.5);
  const ty = outer ? Math.sin(aim) * aimR : rand(-0.5, 0.5);
  const hdg = (Math.atan2(tx - x, -(ty - y)) * 180) / Math.PI;
  let callsign = pick(CALLSIGNS);
  for (let i = 0; i < 10 && used.has(callsign); i++) callsign = pick(CALLSIGNS);
  return {
    callsign,
    x,
    y,
    hdg,
    spd: rand(0.022, 0.034),
    fl: Math.round(rand(18, 39)) * 10,
    kts: Math.round(rand(38, 49)) * 10,
    vs: 0,
    kind: "transit",
    trail: [],
    sinceSweep: 1,
  };
}

function spawnArrival(dist = 0.98): Aircraft {
  // On final for runway 04: coming in from the south-west, heading 040.
  const from = rad(RUNWAY_HDG + 180);
  return {
    callsign: pick(["ALK226", "ALK504", "UAE654", "QTR668"]),
    x: Math.sin(from) * dist,
    y: -Math.cos(from) * dist,
    hdg: RUNWAY_HDG,
    spd: 0.026,
    fl: Math.round(dist * 80),
    kts: Math.round(140 + dist * 110),
    vs: -1,
    kind: "arrival",
    trail: [],
    sinceSweep: 1,
  };
}

function spawnOwn(): Aircraft {
  return {
    callsign: "DHN001",
    x: 0,
    y: 0,
    hdg: RUNWAY_HDG,
    spd: 0.03,
    fl: 0,
    kts: 160,
    vs: 1,
    kind: "own",
    trail: [],
    sinceSweep: 0,
  };
}

function advance(a: Aircraft, dt: number) {
  a.x += Math.sin(rad(a.hdg)) * a.spd * dt;
  a.y += -Math.cos(rad(a.hdg)) * a.spd * dt;
  const d = Math.hypot(a.x, a.y);
  if (a.kind === "arrival") {
    a.fl = Math.max(0, Math.round(d * 80));
    a.kts = Math.round(140 + d * 110);
  }
  if (a.kind === "own") {
    a.fl = Math.min(150, Math.round(d * 160));
    a.kts = Math.round(160 + d * 140);
    if (d > 0.35 && a.hdg < 75) a.hdg += dt * 4; // gentle turn out after departure
  }
}

type AtcRadarProps = {
  className?: string;
  /** Transparent scope face, for use behind other content. */
  background?: boolean;
};

export default function AtcRadar({ className = "", background = false }: AtcRadarProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const trafficRef = useRef<Aircraft[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mono =
      getComputedStyle(document.documentElement).getPropertyValue("--font-geist-mono").trim() || "ui-monospace";
    const font = (px: number, weight = 500) => `${weight} ${px}px ${mono}, ui-monospace, SFMono-Regular, monospace`;

    // Initial traffic, pre-advanced so the scope starts busy
    const used = new Set<string>();
    const traffic: Aircraft[] = [];
    const transitCount = background ? 6 : 4;
    for (let i = 0; i < transitCount; i++) {
      const a = spawnTransit(used, background);
      used.add(a.callsign);
      advance(a, rand(10, 45));
      traffic.push(a);
    }
    traffic.push(spawnArrival(0.6));
    const own = spawnOwn();
    advance(own, 6);
    traffic.push(own);
    trafficRef.current = traffic;

    let size = 0;
    let dpr = 1;
    let sweep = rad(-90); // start pointing north
    let last = performance.now();
    let raf = 0;
    let visible = true;
    let arrivalTimer = 0;
    let ownTimer = 0;

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      size = canvas.clientWidth;
      canvas.width = Math.round(size * dpr);
      canvas.height = Math.round(size * dpr);
      draw();
    };

    const step = (dt: number) => {
      const prevSweep = sweep;
      sweep = (sweep + (dt / SWEEP_SECONDS) * Math.PI * 2) % (Math.PI * 2);

      const list = trafficRef.current;
      for (const a of list) {
        advance(a, dt);
        // Has the sweep just passed this target? Then record a history dot.
        const ang = Math.atan2(a.y, a.x);
        const since = (((sweep - ang) % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2);
        const before = (((prevSweep - ang) % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2);
        if (since < before) {
          a.trail.unshift({ x: a.x, y: a.y });
          if (a.trail.length > 6) a.trail.pop();
        }
        a.sinceSweep = since / (Math.PI * 2);
      }

      // Retire aircraft that left the scope or landed; keep traffic flowing
      const kept = list.filter((a) => {
        const d = Math.hypot(a.x, a.y);
        if (a.kind === "arrival") {
          // Distance travelled past the runway threshold along the runway heading
          const along = a.x * Math.sin(rad(RUNWAY_HDG)) - a.y * Math.cos(rad(RUNWAY_HDG));
          return d > 0.03 && along < 0.02;
        }
        return d < 1.12;
      });
      const transits = kept.filter((a) => a.kind === "transit");
      const usedNow = new Set(kept.map((a) => a.callsign));
      while (transits.length < transitCount) {
        const a = spawnTransit(usedNow, background);
        usedNow.add(a.callsign);
        transits.push(a);
        kept.push(a);
      }
      if (!kept.some((a) => a.kind === "arrival")) {
        arrivalTimer += dt;
        if (arrivalTimer > 6) {
          kept.push(spawnArrival());
          arrivalTimer = 0;
        }
      }
      // DHN001 departs runway 04 again a little after leaving the scope
      if (!kept.some((a) => a.kind === "own")) {
        ownTimer += dt;
        if (ownTimer > 8) {
          kept.push(spawnOwn());
          ownTimer = 0;
        }
      }
      trafficRef.current = kept;
    };

    const draw = () => {
      if (!size) return;
      const c = size / 2;
      const R = c - 6;
      const toPx = (u: number) => u * R;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, size, size);

      // Scope face
      if (!background) {
        const face = ctx.createRadialGradient(c, c, 0, c, c, R);
        face.addColorStop(0, "#1a1822");
        face.addColorStop(1, "#0d0c11");
        ctx.beginPath();
        ctx.arc(c, c, R, 0, Math.PI * 2);
        ctx.fillStyle = face;
        ctx.fill();
      }

      ctx.save();
      ctx.beginPath();
      ctx.arc(c, c, R, 0, Math.PI * 2);
      ctx.clip();

      // Range rings + labels (5 NM spacing on a 20 NM scope)
      ctx.lineWidth = 1;
      for (let k = 1; k <= 4; k++) {
        ctx.beginPath();
        ctx.arc(c, c, (R * k) / 4, 0, Math.PI * 2);
        ctx.strokeStyle = COLORS.ring;
        ctx.setLineDash(k === 4 ? [] : [2, 4]);
        ctx.stroke();
      }
      ctx.setLineDash([]);
      ctx.font = font(9);
      ctx.fillStyle = "rgba(164,155,234,0.45)";
      for (let k = 1; k <= 3; k++) {
        const r = (R * k) / 4;
        ctx.fillText(`${k * 5}`, c + r * Math.cos(rad(-62)) + 3, c + r * Math.sin(rad(-62)));
      }

      // Crosshair
      ctx.strokeStyle = "rgba(164,155,234,0.08)";
      ctx.beginPath();
      ctx.moveTo(c - R, c);
      ctx.lineTo(c + R, c);
      ctx.moveTo(c, c - R);
      ctx.lineTo(c, c + R);
      ctx.stroke();

      // Compass ticks
      for (let d = 0; d < 360; d += 5) {
        const len = d % 30 === 0 ? 9 : d % 10 === 0 ? 5 : 2.5;
        const a = rad(d - 90);
        ctx.beginPath();
        ctx.moveTo(c + Math.cos(a) * R, c + Math.sin(a) * R);
        ctx.lineTo(c + Math.cos(a) * (R - len), c + Math.sin(a) * (R - len));
        ctx.strokeStyle = COLORS.tick;
        ctx.stroke();
      }
      ctx.font = font(10, 600);
      ctx.fillStyle = "rgba(164,155,234,0.6)";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ["N", "E", "S", "W"].forEach((t, i) => {
        const a = rad(i * 90 - 90);
        ctx.fillText(t, c + Math.cos(a) * (R - 18), c + Math.sin(a) * (R - 18));
      });

      // Extended runway centreline + runway 04/22
      const rh = rad(RUNWAY_HDG);
      ctx.setLineDash([3, 5]);
      ctx.strokeStyle = "rgba(233,231,240,0.16)";
      ctx.beginPath();
      ctx.moveTo(c, c);
      ctx.lineTo(c - Math.sin(rh) * R * 0.75, c + Math.cos(rh) * R * 0.75);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.save();
      ctx.translate(c, c);
      ctx.rotate(rh);
      ctx.fillStyle = "rgba(233,231,240,0.75)";
      ctx.fillRect(-1.5, -R * 0.05, 3, R * 0.1);
      ctx.restore();

      // Sweep with phosphor trail
      const trail = rad(80);
      const conic = (ctx as CanvasRenderingContext2D & {
        createConicGradient?: (a: number, x: number, y: number) => CanvasGradient;
      }).createConicGradient;
      if (conic) {
        const g = conic.call(ctx, sweep - trail, c, c);
        const span = trail / (Math.PI * 2);
        for (let i = 0; i <= 10; i++) {
          const f = i / 10;
          g.addColorStop(f * span, rgba(COLORS.sweep, 0.22 * f * f));
        }
        g.addColorStop(Math.min(span + 0.0005, 1), rgba(COLORS.sweep, 0));
        g.addColorStop(1, rgba(COLORS.sweep, 0));
        ctx.beginPath();
        ctx.arc(c, c, R, 0, Math.PI * 2);
        ctx.fillStyle = g;
        ctx.fill();
      } else {
        const slices = 48;
        for (let i = 0; i < slices; i++) {
          const a0 = sweep - (trail * (i + 1)) / slices;
          const a1 = sweep - (trail * i) / slices;
          ctx.beginPath();
          ctx.moveTo(c, c);
          ctx.arc(c, c, R, a0, a1 + 0.004);
          ctx.closePath();
          ctx.fillStyle = rgba(COLORS.sweep, 0.2 * Math.pow(1 - i / slices, 2));
          ctx.fill();
        }
      }
      const lead = ctx.createLinearGradient(c, c, c + Math.cos(sweep) * R, c + Math.sin(sweep) * R);
      lead.addColorStop(0, rgba(COLORS.sweep, 0.1));
      lead.addColorStop(1, rgba(COLORS.sweep, 0.9));
      ctx.strokeStyle = lead;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(c, c);
      ctx.lineTo(c + Math.cos(sweep) * R, c + Math.sin(sweep) * R);
      ctx.stroke();
      ctx.lineWidth = 1;

      // Aircraft
      for (const a of trafficRef.current) {
        const col = a.kind === "own" ? COLORS.own : COLORS.target;
        const glow = Math.max(0.35, 1 - a.sinceSweep * 0.9);
        const px = c + toPx(a.x);
        const py = c + toPx(a.y);

        // history dots
        a.trail.forEach((p, i) => {
          ctx.beginPath();
          ctx.arc(c + toPx(p.x), c + toPx(p.y), 1.3, 0, Math.PI * 2);
          ctx.fillStyle = rgba(col, 0.45 * (1 - i / 6));
          ctx.fill();
        });

        // 1-minute predictor line
        const pl = 0.1; // predictor length in scope units
        ctx.beginPath();
        ctx.moveTo(px, py);
        ctx.lineTo(px + Math.sin(rad(a.hdg)) * toPx(pl), py - Math.cos(rad(a.hdg)) * toPx(pl));
        ctx.strokeStyle = rgba(col, 0.45 * glow + 0.1);
        ctx.stroke();

        // target
        ctx.shadowColor = rgba(col, 0.9);
        ctx.shadowBlur = 10 * glow;
        ctx.fillStyle = rgba(col, glow);
        ctx.fillRect(px - 2.5, py - 2.5, 5, 5);
        ctx.shadowBlur = 0;

        // data tag
        // Panel scope: keep tags inside near the right edge.
        // Background scope: put tags on the outer side, away from the centre.
        const flip = background ? a.x < 0 : a.x > 0.45;
        const tx = flip ? px - 12 - 62 : px + 12;
        const ty = py - 14;
        ctx.beginPath();
        ctx.moveTo(px + 3, py - 3);
        ctx.lineTo(flip ? px - 12 : tx - 2, ty + 3);
        ctx.strokeStyle = rgba(col, 0.35);
        ctx.stroke();
        ctx.textAlign = "left";
        ctx.textBaseline = "alphabetic";
        ctx.font = font(10, 600);
        ctx.fillStyle = a.kind === "own" ? rgba(COLORS.own, 0.95) : COLORS.label;
        ctx.fillText(a.callsign, tx, ty);
        ctx.font = font(9);
        ctx.fillStyle = a.kind === "own" ? rgba(COLORS.own, 0.75) : COLORS.sub;
        const arrow = a.vs > 0 ? "↑" : a.vs < 0 ? "↓" : " ";
        const second = `${String(a.fl).padStart(3, "0")}${arrow} ${a.kts}`;
        ctx.fillText(second, tx, ty + 11);
      }

      ctx.restore();

      // Bezel
      ctx.beginPath();
      ctx.arc(c, c, R, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(164,155,234,0.35)";
      ctx.lineWidth = 1;
      ctx.stroke();
    };

    const loop = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      step(dt);
      draw();
      raf = requestAnimationFrame(loop);
    };

    const start = () => {
      if (reduced || raf) return;
      last = performance.now();
      raf = requestAnimationFrame(loop);
    };
    const stop = () => {
      cancelAnimationFrame(raf);
      raf = 0;
    };

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();

    // Only animate while the scope is on screen
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) start();
      else stop();
    });
    io.observe(canvas);

    if (reduced) draw();

    return () => {
      stop();
      ro.disconnect();
      io.disconnect();
    };
  }, [background]);

  return (
    <canvas
      ref={canvasRef}
      role="img"
      aria-label="Animated air traffic control radar showing simulated aircraft around runway 04/22"
      className={`block aspect-square ${className}`}
    />
  );
}

/** Live UTC ("Zulu") time, as shown on ATC displays. */
export function ZuluClock({ className = "" }: { className?: string }) {
  const [clock, setClock] = useState("");

  useEffect(() => {
    const tick = () => {
      const d = new Date();
      const p = (n: number) => String(n).padStart(2, "0");
      setClock(`${p(d.getUTCHours())}:${p(d.getUTCMinutes())}:${p(d.getUTCSeconds())}Z`);
    };
    const first = setTimeout(tick, 0);
    const id = setInterval(tick, 1000);
    return () => {
      clearTimeout(first);
      clearInterval(id);
    };
  }, []);

  return <span className={`tabular-nums ${className}`}>{clock}</span>;
}
