import { useEffect, useState, useRef } from "react";

interface CinemaAudienceProps {
  isReacting: boolean;
}

const speechBubbles = [
  "Emeka did THAT! 💅",
  "She's gorgeous! ✨",
  "The braids though! 😍",
  "Stunning work! 🔥",
  "Look at her glow! ✨",
  "Absolutely beautiful!",
  "Emeka never misses! 💫",
  "Goals fr! 🙌",
];

// 6 women with distinct silhouette hairstyles (viewed from behind)
const women = [
  { id: 1, name: "highBun", seatX: 70 },
  { id: 2, name: "longStraight", seatX: 180 },
  { id: 3, name: "braids", seatX: 290 },
  { id: 4, name: "shortBob", seatX: 400 },
  { id: 5, name: "headwrap", seatX: 510 },
  { id: 6, name: "volumeCurls", seatX: 620 },
];

const CinemaAudience = ({ isReacting }: CinemaAudienceProps) => {
  const [frame, setFrame] = useState(0);
  const [popcornHolder, setPopcornHolder] = useState(2);
  const [activeSpeakers, setActiveSpeakers] = useState<number[]>([]);
  const [speechTexts, setSpeechTexts] = useState<string[]>([]);
  const prevReacting = useRef(false);

  useEffect(() => {
    if (isReacting && !prevReacting.current) {
      // New reaction triggered — cycle through frames
      let f = 1;
      setFrame(1);

      // Pick 2 random speakers
      const s1 = Math.floor(Math.random() * 6);
      let s2 = (s1 + 2 + Math.floor(Math.random() * 3)) % 6;
      setActiveSpeakers([s1, s2]);
      setSpeechTexts([
        speechBubbles[Math.floor(Math.random() * speechBubbles.length)],
        speechBubbles[Math.floor(Math.random() * speechBubbles.length)],
      ]);

      const interval = setInterval(() => {
        f++;
        setFrame(f);
        if (f === 3) {
          setPopcornHolder((prev) => (prev + 1) % 6);
        }
        if (f >= 6) {
          clearInterval(interval);
          setFrame(0);
          setActiveSpeakers([]);
        }
      }, 150);

      prevReacting.current = true;
      return () => clearInterval(interval);
    }
    if (!isReacting) {
      prevReacting.current = false;
    }
  }, [isReacting]);

  // Per-character pose based on current frame
  const getPose = (index: number) => {
    const baseY = 0;
    const baseTilt = [2, -1, 3, -2, 1, -3][index];

    if (frame === 0) return { tilt: baseTilt, shiftY: baseY, lean: 0 };

    // Frame-specific reactions
    const poses: Record<number, { tilt: number; shiftY: number; lean: number }> = {
      1: { tilt: baseTilt, shiftY: 0, lean: 0 },
      2: { tilt: baseTilt + (index % 2 === 0 ? 4 : -4), shiftY: -1, lean: index === popcornHolder ? 3 : 0 },
      3: { tilt: baseTilt + (index % 3 === 0 ? 6 : -3), shiftY: -2, lean: index % 2 === 0 ? 2 : -2 },
      4: { tilt: baseTilt + (activeSpeakers.includes(index) ? 8 : 2), shiftY: activeSpeakers.includes(index) ? -3 : 0, lean: index % 2 === 0 ? 4 : -1 },
      5: { tilt: baseTilt + (index === 0 ? -5 : index === 3 ? 5 : 3), shiftY: index === 1 ? -4 : -1, lean: 0 },
      6: { tilt: baseTilt, shiftY: 0, lean: 0 },
    };
    return poses[frame] || poses[1];
  };

  const renderHairSilhouette = (type: string, cx: number, headY: number) => {
    const dark = "hsl(var(--espresso))";
    switch (type) {
      case "highBun":
        return (
          <g>
            <ellipse cx={cx} cy={headY - 2} rx={14} ry={15} fill={dark} />
            <circle cx={cx} cy={headY - 20} r={9} fill={dark} />
          </g>
        );
      case "longStraight":
        return (
          <g>
            <ellipse cx={cx} cy={headY - 2} rx={14} ry={15} fill={dark} />
            <rect x={cx - 14} y={headY + 5} width={28} height={35} rx={4} fill={dark} />
          </g>
        );
      case "braids":
        return (
          <g>
            <ellipse cx={cx} cy={headY - 2} rx={14} ry={15} fill={dark} />
            {[-8, -3, 2, 7].map((offset, i) => (
              <path
                key={i}
                d={`M${cx + offset},${headY + 10} Q${cx + offset + (i % 2 ? 4 : -4)},${headY + 28} ${cx + offset},${headY + 42}`}
                stroke={dark}
                strokeWidth={4}
                fill="none"
                strokeLinecap="round"
              />
            ))}
          </g>
        );
      case "shortBob":
        return (
          <g>
            <ellipse cx={cx} cy={headY - 1} rx={16} ry={16} fill={dark} />
            <rect x={cx - 16} y={headY + 2} width={32} height={12} rx={6} fill={dark} />
          </g>
        );
      case "headwrap":
        return (
          <g>
            <ellipse cx={cx} cy={headY - 4} rx={16} ry={18} fill={dark} />
            {/* Wrap ridge detail */}
            <ellipse cx={cx} cy={headY - 12} rx={14} ry={6} fill="none" stroke="hsl(250 40% 25%)" strokeWidth={1.5} opacity={0.4} />
            <ellipse cx={cx} cy={headY - 6} rx={15} ry={5} fill="none" stroke="hsl(250 40% 25%)" strokeWidth={1} opacity={0.3} />
          </g>
        );
      case "volumeCurls":
        return (
          <g>
            <ellipse cx={cx} cy={headY - 2} rx={18} ry={19} fill={dark} />
            {[...Array(10)].map((_, i) => {
              const angle = (i / 10) * Math.PI * 2;
              const r = 16 + Math.sin(i * 2) * 2;
              const x = cx + Math.cos(angle) * r;
              const y = headY - 2 + Math.sin(angle) * (r + 1);
              return <circle key={i} cx={x} cy={y} r={4} fill={dark} />;
            })}
          </g>
        );
      default:
        return <ellipse cx={cx} cy={headY} rx={14} ry={15} fill={dark} />;
    }
  };

  const renderPopcorn = (x: number, y: number) => (
    <g>
      <path
        d={`M${x - 7},${y} L${x - 9},${y + 16} L${x + 9},${y + 16} L${x + 7},${y} Z`}
        fill="hsl(0 70% 45%)"
      />
      {/* Stripes */}
      <line x1={x - 3} y1={y + 1} x2={x - 4} y2={y + 15} stroke="hsl(45 90% 85%)" strokeWidth={1.5} />
      <line x1={x + 3} y1={y + 1} x2={x + 4} y2={y + 15} stroke="hsl(45 90% 85%)" strokeWidth={1.5} />
      {/* Popcorn kernels */}
      {[[-5, -3], [0, -5], [5, -3], [-2, -7], [3, -6]].map(([ox, oy], i) => (
        <circle key={i} cx={x + ox} cy={y + oy} r={3} fill="hsl(45 80% 80%)" />
      ))}
    </g>
  );

  return (
    <div className="relative w-full flex justify-center">
      <svg
        viewBox="0 0 700 165"
        className="w-full max-w-4xl h-auto select-none"
        style={{ filter: "drop-shadow(0 4px 12px rgba(0,0,0,0.3))" }}
      >
        <defs>
          {/* Rim light gradient for screen glow */}
          <radialGradient id="screenGlow" cx="50%" cy="0%" r="80%">
            <stop offset="0%" stopColor="hsl(250 60% 70%)" stopOpacity="0.15" />
            <stop offset="60%" stopColor="hsl(230 50% 50%)" stopOpacity="0.05" />
            <stop offset="100%" stopColor="transparent" stopOpacity="0" />
          </radialGradient>
          {/* Rim light for silhouette edges */}
          <linearGradient id="rimLight" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="hsl(250 50% 75%)" stopOpacity="0.5" />
            <stop offset="100%" stopColor="hsl(270 40% 60%)" stopOpacity="0.1" />
          </linearGradient>
        </defs>

        {/* Ambient screen glow on audience */}
        <rect x="0" y="0" width="700" height="165" fill="url(#screenGlow)" />

        {/* Cinema seat row — curved arrangement */}
        {women.map((w, i) => {
          const cx = w.seatX;
          const seatY = 100;
          return (
            <g key={`seat-${i}`}>
              {/* Seat back */}
              <rect
                x={cx - 32}
                y={seatY}
                width={64}
                height={55}
                rx={8}
                fill="hsl(0 50% 22%)"
                opacity={0.6}
              />
              {/* Seat cushion top edge */}
              <rect
                x={cx - 30}
                y={seatY + 2}
                width={60}
                height={8}
                rx={4}
                fill="hsl(0 45% 26%)"
                opacity={0.5}
              />
              {/* Armrests */}
              <rect x={cx - 34} y={seatY + 8} width={5} height={40} rx={2} fill="hsl(30 15% 18%)" opacity={0.5} />
              <rect x={cx + 29} y={seatY + 8} width={5} height={40} rx={2} fill="hsl(30 15% 18%)" opacity={0.5} />
              {/* Cup holder detail */}
              {i % 2 === 1 && (
                <circle cx={cx + 32} cy={seatY + 30} r={4} fill="hsl(30 10% 15%)" opacity={0.4} />
              )}
            </g>
          );
        })}

        {/* Women silhouettes — viewed from behind */}
        {women.map((w, i) => {
          const cx = w.seatX;
          const headY = 48;
          const pose = getPose(i);
          const hasPopcorn = popcornHolder === i;
          const isSpeaking = activeSpeakers.includes(i);

          return (
            <g key={w.id}>
              {/* Body group with animated pose */}
              <g
                style={{
                  transform: `translateY(${pose.shiftY}px)`,
                  transition: "transform 0.25s ease-out",
                }}
              >
                {/* Shoulders & upper body silhouette */}
                <path
                  d={`M${cx - 20},${headY + 25} Q${cx},${headY + 18} ${cx + 20},${headY + 25} L${cx + 24},${headY + 70} L${cx - 24},${headY + 70} Z`}
                  fill="hsl(var(--espresso))"
                />

                {/* Rim light on shoulders */}
                <path
                  d={`M${cx - 18},${headY + 25} Q${cx},${headY + 19} ${cx + 18},${headY + 25}`}
                  stroke="hsl(250 50% 70%)"
                  strokeWidth={1.2}
                  fill="none"
                  opacity={0.4}
                  strokeLinecap="round"
                />

                {/* Neck */}
                <rect x={cx - 5} y={headY + 14} width={10} height={12} rx={4} fill="hsl(var(--espresso))" />

                {/* Head with tilt */}
                <g
                  style={{
                    transformOrigin: `${cx}px ${headY}px`,
                    transform: `rotate(${pose.tilt}deg)`,
                    transition: "transform 0.3s ease-out",
                  }}
                >
                  {renderHairSilhouette(w.name, cx, headY)}

                  {/* Rim light on head — subtle edge glow */}
                  <ellipse
                    cx={cx}
                    cy={headY - 4}
                    rx={15}
                    ry={16}
                    fill="none"
                    stroke="hsl(250 50% 70%)"
                    strokeWidth={1}
                    opacity={0.3}
                  />
                </g>

                {/* Left arm */}
                <path
                  d={`M${cx - 20},${headY + 30} Q${cx - 28 + pose.lean},${headY + 48} ${cx - 22},${headY + 58}`}
                  stroke="hsl(var(--espresso))"
                  strokeWidth={6}
                  fill="none"
                  strokeLinecap="round"
                  style={{ transition: "d 0.3s ease-out" }}
                />

                {/* Right arm — popcorn or resting */}
                {hasPopcorn ? (
                  <g>
                    <path
                      d={`M${cx + 20},${headY + 30} Q${cx + 26},${headY + 40} ${cx + 22},${headY + 46}`}
                      stroke="hsl(var(--espresso))"
                      strokeWidth={6}
                      fill="none"
                      strokeLinecap="round"
                    />
                    {renderPopcorn(cx + 22, headY + 28)}
                  </g>
                ) : isSpeaking && frame >= 3 ? (
                  <path
                    d={`M${cx + 20},${headY + 30} Q${cx + 30},${headY + 22} ${cx + 28},${headY + 14}`}
                    stroke="hsl(var(--espresso))"
                    strokeWidth={6}
                    fill="none"
                    strokeLinecap="round"
                  />
                ) : (
                  <path
                    d={`M${cx + 20},${headY + 30} Q${cx + 28 - pose.lean},${headY + 48} ${cx + 22},${headY + 58}`}
                    stroke="hsl(var(--espresso))"
                    strokeWidth={6}
                    fill="none"
                    strokeLinecap="round"
                  />
                )}
              </g>

              {/* Speech bubble */}
              {isSpeaking && frame >= 2 && frame <= 5 && (
                <g
                  style={{
                    opacity: 1,
                    transition: "opacity 0.2s ease",
                  }}
                >
                  <rect
                    x={cx - 48}
                    y={4}
                    width={96}
                    height={24}
                    rx={12}
                    fill="hsl(var(--cream))"
                    stroke="hsl(var(--gold-light))"
                    strokeWidth={0.8}
                  />
                  <polygon
                    points={`${cx - 4},28 ${cx + 4},28 ${cx},34`}
                    fill="hsl(var(--cream))"
                  />
                  <text
                    x={cx}
                    y={19}
                    textAnchor="middle"
                    fontSize="8"
                    fontFamily="var(--font-body)"
                    fontWeight="500"
                    fill="hsl(var(--foreground))"
                  >
                    {speechTexts[activeSpeakers.indexOf(i)] || ""}
                  </text>
                </g>
              )}
            </g>
          );
        })}

        {/* Subtle film grain overlay */}
        <rect
          x="0" y="0" width="700" height="165"
          fill="url(data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.3'/%3E%3C/svg%3E)"
          opacity={0.06}
          style={{ mixBlendMode: "overlay" }}
        />
      </svg>
    </div>
  );
};

export default CinemaAudience;
