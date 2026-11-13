import { useEffect, useRef, useState, type ReactElement } from 'react';

function prefersReducedMotion(): boolean {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

const FIELD_SIZE = 192;
const LINK_DISTANCE = 54;

function Particles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = FIELD_SIZE * dpr;
    canvas.height = FIELD_SIZE * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const points = Array.from({ length: 28 }, () => ({
      x: Math.random() * FIELD_SIZE,
      y: Math.random() * FIELD_SIZE,
      vx: (Math.random() - 0.5) * 0.32,
      vy: (Math.random() - 0.5) * 0.32,
      r: 1 + Math.random() * 1.8,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, FIELD_SIZE, FIELD_SIZE);
      for (let i = 0; i < points.length; i += 1) {
        for (let j = i + 1; j < points.length; j += 1) {
          const distance = Math.hypot(points[i].x - points[j].x, points[i].y - points[j].y);
          if (distance < LINK_DISTANCE) {
            ctx.strokeStyle = `rgba(36, 62, 80, ${0.42 * (1 - distance / LINK_DISTANCE)})`;
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(points[i].x, points[i].y);
            ctx.lineTo(points[j].x, points[j].y);
            ctx.stroke();
          }
        }
      }
      for (const point of points) {
        ctx.fillStyle = point.r > 2 ? '#243E50' : '#507289';
        ctx.beginPath();
        ctx.arc(point.x, point.y, point.r, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    if (prefersReducedMotion()) {
      draw();
      return;
    }

    let frame = 0;
    const loop = () => {
      for (const point of points) {
        point.x += point.vx;
        point.y += point.vy;
        if (point.x < 0 || point.x > FIELD_SIZE) point.vx *= -1;
        if (point.y < 0 || point.y > FIELD_SIZE) point.vy *= -1;
      }
      draw();
      frame = window.requestAnimationFrame(loop);
    };
    frame = window.requestAnimationFrame(loop);
    return () => window.cancelAnimationFrame(frame);
  }, []);

  return (
    <div className="sa-box sa-particles">
      <canvas ref={canvasRef} />
    </div>
  );
}

function LiquidMorph() {
  return (
    <div className="sa-box">
      <svg viewBox="0 0 200 200" className="sa-liquid">
        <defs>
          <filter id="sa-goo" filterUnits="userSpaceOnUse" x="0" y="0" width="200" height="200">
            <feGaussianBlur in="SourceGraphic" stdDeviation="9" />
            <feColorMatrix mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 24 -11" />
          </filter>
          <linearGradient id="sa-liquid-fill" gradientUnits="userSpaceOnUse" x1="30" y1="30" x2="170" y2="170">
            <stop offset="0" stopColor="#7FA3BA" />
            <stop offset="1" stopColor="#243E50" />
          </linearGradient>
        </defs>
        <g filter="url(#sa-goo)" fill="url(#sa-liquid-fill)">
          <circle className="sa-liquid-core" cx="100" cy="100" r="40" />
          <circle className="sa-liquid-a" cx="100" cy="100" r="20" />
          <circle className="sa-liquid-b" cx="100" cy="100" r="19" />
          <circle className="sa-liquid-c" cx="100" cy="100" r="16" />
          <circle className="sa-liquid-d" cx="100" cy="100" r="14" />
        </g>
      </svg>
    </div>
  );
}

function Holographic() {
  return (
    <div className="sa-box sa-holo">
      <div className="sa-holo-card">
        <div className="sa-holo-foil" />
        <div className="sa-holo-grain" />
        <div className="sa-holo-sheen" />
        <span className="sa-holo-chip" />
        <span className="sa-holo-line sa-holo-line--long" />
        <span className="sa-holo-line sa-holo-line--short" />
        <span className="sa-holo-mark">EC</span>
      </div>
    </div>
  );
}

function NeonGlow() {
  return (
    <div className="sa-box">
      <div className="sa-neon">
        <svg viewBox="0 0 176 176">
          <rect className="sa-neon-frame" x="16" y="16" width="144" height="144" rx="18" />
          <text className="sa-neon-tube" x="88" y="116" textAnchor="middle">
            EC
          </text>
          <path className="sa-neon-frame" d="M56 136 H120" />
        </svg>
      </div>
    </div>
  );
}

const MERIDIANS = [0, 30, 60, 90, 120, 150];
const GLOBE_DIAMETER = 150;
const PARALLELS = [
  { offset: 0, diameter: GLOBE_DIAMETER },
  { offset: 44, diameter: 121 },
  { offset: -44, diameter: 121 },
];

function Wireframe3D() {
  return (
    <div className="sa-box sa-wire">
      <div className="sa-wire-globe">
        <span className="sa-wire-axis" />
        {MERIDIANS.map((angle) => (
          <span
            key={angle}
            className="sa-wire-ring"
            style={{ width: GLOBE_DIAMETER, height: GLOBE_DIAMETER, transform: `translate(-50%, -50%) rotateY(${angle}deg)` }}
          />
        ))}
        {PARALLELS.map(({ offset, diameter }) => (
          <span
            key={offset}
            className={`sa-wire-ring ${offset === 0 ? 'sa-wire-ring--equator' : ''}`}
            style={{
              width: diameter,
              height: diameter,
              transform: `translate(-50%, -50%) rotateX(90deg) translateZ(${offset}px)`,
            }}
          />
        ))}
      </div>
    </div>
  );
}

function Glassmorphism() {
  return (
    <div className="sa-box sa-glass">
      <span className="sa-glass-orb sa-glass-orb--cool" />
      <span className="sa-glass-orb sa-glass-orb--warm" />
      <div className="sa-glass-panel">
        <span className="sa-glass-avatar" />
        <span className="sa-glass-line sa-glass-line--long" />
        <span className="sa-glass-line sa-glass-line--short" />
        <span className="sa-glass-pill" />
      </div>
    </div>
  );
}

const KINETIC_LOOP = 'Design · Motion · Type · ';

function KineticType() {
  return (
    <div className="sa-box sa-kinetic">
      <div className="sa-kinetic-row sa-kinetic-row--outline">
        <span>{KINETIC_LOOP.repeat(2)}</span>
        <span>{KINETIC_LOOP.repeat(2)}</span>
      </div>
      <div className="sa-kinetic-word">
        {['M', 'O', 'V', 'E'].map((letter, index) => (
          <span key={letter} style={{ animationDelay: `${index * 0.14}s` }}>
            {letter}
          </span>
        ))}
      </div>
      <div className="sa-kinetic-row sa-kinetic-row--solid">
        <span>{KINETIC_LOOP.repeat(2)}</span>
        <span>{KINETIC_LOOP.repeat(2)}</span>
      </div>
    </div>
  );
}

function isoBox(cx: number, cy: number, w: number, h: number, t: number) {
  return {
    top: `${cx},${cy - h} ${cx + w},${cy} ${cx},${cy + h} ${cx - w},${cy}`,
    left: `${cx - w},${cy} ${cx},${cy + h} ${cx},${cy + h + t} ${cx - w},${cy + t}`,
    right: `${cx + w},${cy} ${cx},${cy + h} ${cx},${cy + h + t} ${cx + w},${cy + t}`,
  };
}

function IsoBox({ cx, cy, w, h, t, top, left, right }: { cx: number; cy: number; w: number; h: number; t: number; top: string; left: string; right: string }) {
  const faces = isoBox(cx, cy, w, h, t);
  return (
    <>
      <polygon points={faces.left} fill={left} />
      <polygon points={faces.right} fill={right} />
      <polygon points={faces.top} fill={top} stroke="rgba(36,62,80,0.35)" strokeWidth="0.75" />
    </>
  );
}

function Isometric() {
  return (
    <div className="sa-box">
      <svg viewBox="0 0 200 200" className="sa-iso">
        <ellipse className="sa-iso-shadow" cx="100" cy="184" rx="70" ry="12" />
        <g className="sa-iso-guides">
          <path d="M22 136 V72 M178 136 V72 M100 175 V122" />
        </g>
        <g className="sa-iso-bottom">
          <IsoBox cx={100} cy={136} w={78} h={39} t={11} top="#C8CED5" left="#507289" right="#2F4A5E" />
        </g>
        <g>
          <IsoBox cx={100} cy={104} w={78} h={39} t={11} top="#E3EAF0" left="#507289" right="#2F4A5E" />
          <polygon points="100,87 134,104 100,121 66,104" fill="#507289" opacity="0.28" />
        </g>
        <g className="sa-iso-top">
          <IsoBox cx={100} cy={72} w={78} h={39} t={11} top="#F7FAFD" left="#507289" right="#2F4A5E" />
          <g className="sa-iso-cube">
            <IsoBox cx={100} cy={52} w={20} h={10} t={20} top="#E8907F" left="#B94A44" right="#9C3934" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Clay3D() {
  return (
    <div className="sa-box sa-clay">
      <span className="sa-clay-ground sa-clay-ground--cube" />
      <span className="sa-clay-ground sa-clay-ground--ball" />
      <span className="sa-clay-ring" />
      <span className="sa-clay-cube" />
      <span className="sa-clay-ball" />
    </div>
  );
}

const ASCII_RAMP = ' .:-=+*#%@';
const ASCII_COLS = 28;
const ASCII_ROWS = 10;

function buildAsciiFrame(time: number): string {
  const rows: string[] = [];
  for (let y = 0; y < ASCII_ROWS; y += 1) {
    let row = '';
    for (let x = 0; x < ASCII_COLS; x += 1) {
      const value = Math.sin(x * 0.32 + time) + Math.sin(y * 0.6 - time * 0.8) + Math.sin((x + y) * 0.22 + time * 0.6);
      const index = Math.min(ASCII_RAMP.length - 1, Math.floor(((value + 3) / 6) * ASCII_RAMP.length));
      row += ASCII_RAMP[index];
    }
    rows.push(row);
  }
  return rows.join('\n');
}

function AsciiArt() {
  const [frame, setFrame] = useState(() => buildAsciiFrame(0));

  useEffect(() => {
    if (prefersReducedMotion()) return;
    let time = 0;
    const timer = window.setInterval(() => {
      time += 0.2;
      setFrame(buildAsciiFrame(time));
    }, 90);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <div className="sa-box">
      <div className="sa-term">
        <div className="sa-term-bar">
          <span />
          <span />
          <span />
        </div>
        <pre>{frame}</pre>
        <div className="sa-term-prompt">
          $ ethos render --ascii
          <span className="sa-term-cursor" />
        </div>
      </div>
    </div>
  );
}

const ANIMATIONS: Record<string, () => ReactElement> = {
  particles: Particles,
  'liquid-morph': LiquidMorph,
  holographic: Holographic,
  'neon-glow': NeonGlow,
  'wireframe-3d': Wireframe3D,
  glassmorphism: Glassmorphism,
  'kinetic-type': KineticType,
  isometric: Isometric,
  'clay-3d': Clay3D,
  'ascii-art': AsciiArt,
};

export function SkillAnimation({ slot }: { slot: string }) {
  const Animation = ANIMATIONS[slot];
  return Animation ? <Animation /> : null;
}
