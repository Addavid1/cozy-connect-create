import { useEffect, useState } from "react";

interface CinemaAudienceProps {
  isReacting: boolean;
}

// 6 distinct women with different skin tones, hairstyles, and accessories
const women = [
  {
    id: 1,
    name: "Nneka",
    skinTone: "hsl(25 55% 40%)",
    skinHighlight: "hsl(25 50% 48%)",
    hairColor: "hsl(0 0% 8%)",
    hairStyle: "afro" as const,
    topColor: "hsl(340 70% 45%)",
    earringColor: "hsl(45 90% 55%)",
    lipColor: "hsl(350 60% 42%)",
  },
  {
    id: 2,
    name: "Adaeze",
    skinTone: "hsl(20 50% 35%)",
    skinHighlight: "hsl(20 45% 42%)",
    hairColor: "hsl(25 40% 12%)",
    hairStyle: "braids" as const,
    topColor: "hsl(200 65% 40%)",
    earringColor: "hsl(38 85% 55%)",
    lipColor: "hsl(355 55% 40%)",
  },
  {
    id: 3,
    name: "Chioma",
    skinTone: "hsl(22 48% 38%)",
    skinHighlight: "hsl(22 44% 45%)",
    hairColor: "hsl(0 0% 5%)",
    hairStyle: "bun" as const,
    topColor: "hsl(45 75% 50%)",
    earringColor: "hsl(0 0% 85%)",
    lipColor: "hsl(0 65% 45%)",
  },
  {
    id: 4,
    name: "Ifunanya",
    skinTone: "hsl(18 52% 42%)",
    skinHighlight: "hsl(18 48% 50%)",
    hairColor: "hsl(350 30% 15%)",
    hairStyle: "locs" as const,
    topColor: "hsl(145 50% 35%)",
    earringColor: "hsl(38 80% 50%)",
    lipColor: "hsl(345 50% 40%)",
  },
  {
    id: 5,
    name: "Ngozi",
    skinTone: "hsl(24 45% 32%)",
    skinHighlight: "hsl(24 40% 40%)",
    hairColor: "hsl(0 0% 10%)",
    hairStyle: "straight" as const,
    topColor: "hsl(280 55% 40%)",
    earringColor: "hsl(45 85% 60%)",
    lipColor: "hsl(340 55% 38%)",
  },
  {
    id: 6,
    name: "Zainab",
    skinTone: "hsl(20 60% 36%)",
    skinHighlight: "hsl(20 55% 44%)",
    hairColor: "hsl(15 30% 10%)",
    hairStyle: "short" as const,
    topColor: "hsl(15 70% 50%)",
    earringColor: "hsl(38 90% 55%)",
    lipColor: "hsl(5 60% 42%)",
  },
];

const speechBubbles = [
  "Emeka did THAT! 💅",
  "She's gorgeous! ✨",
  "The braids though! 😍",
  "Stunning work! 🔥",
  "Pass the popcorn! 🍿",
  "Look at her glow! ✨",
  "Absolutely beautiful!",
  "Emeka never misses! 💫",
];

const CinemaAudience = ({ isReacting }: CinemaAudienceProps) => {
  const [reactionFrame, setReactionFrame] = useState(0);
  const [activeSpeaker, setActiveSpeaker] = useState(-1);
  const [speechText, setSpeechText] = useState("");
  const [popcornHolder, setPopcornHolder] = useState(2);

  useEffect(() => {
    if (!isReacting) {
      setReactionFrame(0);
      setActiveSpeaker(-1);
      return;
    }

    let frame = 0;
    const interval = setInterval(() => {
      frame++;
      setReactionFrame(frame);

      // Pick a random speaker and speech bubble
      if (frame === 2) {
        const speaker = Math.floor(Math.random() * 6);
        setActiveSpeaker(speaker);
        setSpeechText(speechBubbles[Math.floor(Math.random() * speechBubbles.length)]);
      }

      // Pass popcorn
      if (frame === 4) {
        setPopcornHolder((prev) => (prev + 1) % 6);
      }

      if (frame >= 10) {
        clearInterval(interval);
        setActiveSpeaker(-1);
      }
    }, 90);

    return () => clearInterval(interval);
  }, [isReacting]);

  const getHeadTilt = (index: number) => {
    if (!isReacting || reactionFrame === 0) {
      // Idle: slight natural tilt variation
      return [3, -2, 4, -3, 2, -4][index];
    }
    const cycle = reactionFrame % 4;
    const base = [5, -8, 10, -6, 8, -10][index];
    return cycle % 2 === 0 ? base : base * 0.3;
  };

  const getBodyBounce = (index: number) => {
    if (!isReacting || reactionFrame === 0) return 0;
    const offset = index * 0.7;
    return Math.sin((reactionFrame + offset) * 1.2) * 3;
  };

  const renderHair = (woman: typeof women[0], headCx: number, headCy: number) => {
    const { hairColor, hairStyle } = woman;
    switch (hairStyle) {
      case "afro":
        return (
          <g>
            <ellipse cx={headCx} cy={headCy - 2} rx={18} ry={19} fill={hairColor} />
            {/* Volume detail curls */}
            {[...Array(8)].map((_, i) => {
              const angle = (i / 8) * Math.PI * 2;
              const x = headCx + Math.cos(angle) * 15;
              const y = headCy - 2 + Math.sin(angle) * 16;
              return <circle key={i} cx={x} cy={y} r={4} fill={hairColor} opacity={0.8} />;
            })}
          </g>
        );
      case "braids":
        return (
          <g>
            <ellipse cx={headCx} cy={headCy - 5} rx={14} ry={12} fill={hairColor} />
            {/* Braids hanging down */}
            {[-10, -6, -2, 2, 6, 10].map((offset, i) => (
              <line
                key={i}
                x1={headCx + offset}
                y1={headCy + 8}
                x2={headCx + offset * 1.3}
                y2={headCy + 28 + Math.sin(i) * 3}
                stroke={hairColor}
                strokeWidth={2.5}
                strokeLinecap="round"
              />
            ))}
          </g>
        );
      case "bun":
        return (
          <g>
            <ellipse cx={headCx} cy={headCy - 5} rx={13} ry={10} fill={hairColor} />
            <circle cx={headCx} cy={headCy - 16} r={8} fill={hairColor} />
            {/* Bun shine */}
            <circle cx={headCx - 2} cy={headCy - 18} r={2.5} fill="white" opacity={0.08} />
          </g>
        );
      case "locs":
        return (
          <g>
            <ellipse cx={headCx} cy={headCy - 4} rx={14} ry={11} fill={hairColor} />
            {/* Thick locs */}
            {[-9, -5, -1, 3, 7, 11].map((offset, i) => (
              <path
                key={i}
                d={`M${headCx + offset},${headCy + 6} Q${headCx + offset + (i % 2 === 0 ? 3 : -3)},${headCy + 18} ${headCx + offset},${headCy + 30 + i * 2}`}
                stroke={hairColor}
                strokeWidth={3}
                fill="none"
                strokeLinecap="round"
              />
            ))}
          </g>
        );
      case "straight":
        return (
          <g>
            <ellipse cx={headCx} cy={headCy - 4} rx={14} ry={11} fill={hairColor} />
            {/* Straight flowing hair */}
            <path
              d={`M${headCx - 13},${headCy} Q${headCx - 15},${headCy + 15} ${headCx - 12},${headCy + 28}`}
              stroke={hairColor}
              strokeWidth={5}
              fill="none"
              strokeLinecap="round"
            />
            <path
              d={`M${headCx + 13},${headCy} Q${headCx + 15},${headCy + 15} ${headCx + 12},${headCy + 28}`}
              stroke={hairColor}
              strokeWidth={5}
              fill="none"
              strokeLinecap="round"
            />
          </g>
        );
      case "short":
        return (
          <g>
            <ellipse cx={headCx} cy={headCy - 5} rx={14} ry={12} fill={hairColor} />
            {/* Textured short hair details */}
            {[...Array(5)].map((_, i) => {
              const angle = (i / 5) * Math.PI - Math.PI * 0.1;
              const x = headCx + Math.cos(angle) * 12;
              const y = headCy - 6 + Math.sin(angle) * -10;
              return <circle key={i} cx={x} cy={y} r={3} fill={hairColor} opacity={0.9} />;
            })}
          </g>
        );
    }
  };

  const renderPopcorn = (x: number, y: number) => (
    <g>
      {/* Popcorn bucket */}
      <path
        d={`M${x - 6},${y} L${x - 8},${y + 14} L${x + 8},${y + 14} L${x + 6},${y} Z`}
        fill="hsl(0 75% 50%)"
        stroke="hsl(0 60% 40%)"
        strokeWidth={0.5}
      />
      {/* Stripes */}
      <line x1={x - 3} y1={y + 1} x2={x - 4} y2={y + 13} stroke="hsl(45 90% 85%)" strokeWidth={1.5} />
      <line x1={x + 3} y1={y + 1} x2={x + 4} y2={y + 13} stroke="hsl(45 90% 85%)" strokeWidth={1.5} />
      {/* Popcorn pieces */}
      {[[-4, -3], [0, -4], [4, -3], [-2, -6], [2, -5]].map(([ox, oy], i) => (
        <circle key={i} cx={x + ox} cy={y + oy} r={2.5} fill="hsl(45 80% 80%)" />
      ))}
    </g>
  );

  return (
    <div className="relative w-full flex justify-center">
      <svg
        viewBox="0 0 660 140"
        className="w-full max-w-3xl h-auto select-none"
        style={{ filter: "drop-shadow(0 2px 8px rgba(0,0,0,0.2))" }}
      >
        {/* Cinema seats row */}
        {women.map((_, i) => {
          const cx = 55 + i * 100;
          return (
            <g key={`seat-${i}`}>
              {/* Seat back */}
              <rect
                x={cx - 28}
                y={75}
                width={56}
                height={55}
                rx={6}
                fill="hsl(0 65% 28%)"
              />
              {/* Seat cushion */}
              <rect
                x={cx - 26}
                y={105}
                width={52}
                height={16}
                rx={4}
                fill="hsl(0 60% 32%)"
              />
              {/* Armrests */}
              <rect x={cx - 30} y={88} width={5} height={32} rx={2} fill="hsl(30 20% 25%)" />
              <rect x={cx + 25} y={88} width={5} height={32} rx={2} fill="hsl(30 20% 25%)" />
            </g>
          );
        })}

        {/* Women characters */}
        {women.map((woman, i) => {
          const cx = 55 + i * 100;
          const headCy = 42;
          const bounce = getBodyBounce(i);
          const tilt = getHeadTilt(i);
          const hasPopcorn = popcornHolder === i;
          const isSpeaking = activeSpeaker === i;

          return (
            <g key={woman.id}>
              {/* Body group with bounce */}
              <g
                style={{
                  transform: `translateY(${bounce}px)`,
                  transition: "transform 0.1s ease-out",
                }}
              >
                {/* Torso / top */}
                <path
                  d={`M${cx - 16},${headCy + 22} Q${cx},${headCy + 18} ${cx + 16},${headCy + 22} L${cx + 20},${headCy + 55} L${cx - 20},${headCy + 55} Z`}
                  fill={woman.topColor}
                />
                {/* Neckline detail */}
                <path
                  d={`M${cx - 8},${headCy + 20} Q${cx},${headCy + 25} ${cx + 8},${headCy + 20}`}
                  stroke={woman.skinTone}
                  strokeWidth={2}
                  fill={woman.skinTone}
                />

                {/* Neck */}
                <rect
                  x={cx - 4}
                  y={headCy + 12}
                  width={8}
                  height={10}
                  rx={3}
                  fill={woman.skinTone}
                />

                {/* Head with tilt */}
                <g
                  style={{
                    transformOrigin: `${cx}px ${headCy}px`,
                    transform: `rotate(${tilt}deg)`,
                    transition: "transform 0.15s ease-out",
                  }}
                >
                  {/* Hair behind head */}
                  {renderHair(woman, cx, headCy)}

                  {/* Face */}
                  <ellipse cx={cx} cy={headCy} rx={12} ry={13} fill={woman.skinTone} />

                  {/* Face highlight */}
                  <ellipse cx={cx - 3} cy={headCy - 3} rx={6} ry={7} fill={woman.skinHighlight} opacity={0.3} />

                  {/* Eyes */}
                  <ellipse cx={cx - 4} cy={headCy - 1} rx={2} ry={2.2} fill="hsl(0 0% 10%)" />
                  <ellipse cx={cx + 4} cy={headCy - 1} rx={2} ry={2.2} fill="hsl(0 0% 10%)" />
                  {/* Eye shine */}
                  <circle cx={cx - 3.5} cy={headCy - 1.8} r={0.8} fill="white" opacity={0.9} />
                  <circle cx={cx + 4.5} cy={headCy - 1.8} r={0.8} fill="white" opacity={0.9} />

                  {/* Eyebrows */}
                  <line
                    x1={cx - 6} y1={headCy - 5} x2={cx - 2} y2={headCy - 5.5}
                    stroke="hsl(0 0% 10%)" strokeWidth={1} strokeLinecap="round"
                  />
                  <line
                    x1={cx + 2} y1={headCy - 5.5} x2={cx + 6} y2={headCy - 5}
                    stroke="hsl(0 0% 10%)" strokeWidth={1} strokeLinecap="round"
                  />

                  {/* Nose */}
                  <path
                    d={`M${cx - 1},${headCy + 1} Q${cx},${headCy + 4} ${cx + 1},${headCy + 1}`}
                    stroke={woman.skinHighlight}
                    strokeWidth={0.8}
                    fill="none"
                  />

                  {/* Lips */}
                  <ellipse cx={cx} cy={headCy + 6} rx={3.5} ry={1.8} fill={woman.lipColor} />
                  {/* Lip highlight */}
                  <ellipse cx={cx} cy={headCy + 5.5} rx={2} ry={0.6} fill="white" opacity={0.12} />

                  {/* Smile when reacting */}
                  {isReacting && reactionFrame > 1 && (
                    <path
                      d={`M${cx - 3},${headCy + 6} Q${cx},${headCy + 9} ${cx + 3},${headCy + 6}`}
                      stroke={woman.lipColor}
                      strokeWidth={1.5}
                      fill="none"
                      strokeLinecap="round"
                    />
                  )}

                  {/* Earrings */}
                  <circle cx={cx - 12} cy={headCy + 4} r={1.8} fill={woman.earringColor} />
                  <circle cx={cx + 12} cy={headCy + 4} r={1.8} fill={woman.earringColor} />
                </g>

                {/* Arms */}
                {/* Left arm */}
                <path
                  d={`M${cx - 16},${headCy + 28} Q${cx - 22},${headCy + 40} ${cx - 18},${headCy + 50}`}
                  stroke={woman.skinTone}
                  strokeWidth={4}
                  fill="none"
                  strokeLinecap="round"
                />
                {/* Left hand */}
                <circle cx={cx - 18} cy={headCy + 50} r={3} fill={woman.skinTone} />

                {/* Right arm - holding popcorn or gesturing */}
                {hasPopcorn ? (
                  <g>
                    <path
                      d={`M${cx + 16},${headCy + 28} Q${cx + 22},${headCy + 36} ${cx + 20},${headCy + 44}`}
                      stroke={woman.skinTone}
                      strokeWidth={4}
                      fill="none"
                      strokeLinecap="round"
                    />
                    <circle cx={cx + 20} cy={headCy + 44} r={3} fill={woman.skinTone} />
                    {renderPopcorn(cx + 20, headCy + 30)}
                  </g>
                ) : isSpeaking && isReacting ? (
                  // Gesturing hand up
                  <g>
                    <path
                      d={`M${cx + 16},${headCy + 28} Q${cx + 26},${headCy + 20} ${cx + 24},${headCy + 12}`}
                      stroke={woman.skinTone}
                      strokeWidth={4}
                      fill="none"
                      strokeLinecap="round"
                    />
                    <circle cx={cx + 24} cy={headCy + 12} r={3} fill={woman.skinTone} />
                  </g>
                ) : (
                  <g>
                    <path
                      d={`M${cx + 16},${headCy + 28} Q${cx + 22},${headCy + 40} ${cx + 18},${headCy + 50}`}
                      stroke={woman.skinTone}
                      strokeWidth={4}
                      fill="none"
                      strokeLinecap="round"
                    />
                    <circle cx={cx + 18} cy={headCy + 50} r={3} fill={woman.skinTone} />
                  </g>
                )}
              </g>

              {/* Speech bubble */}
              {isSpeaking && isReacting && reactionFrame >= 2 && reactionFrame <= 9 && (
                <g
                  style={{
                    opacity: reactionFrame >= 2 ? 1 : 0,
                    transition: "opacity 0.2s ease",
                  }}
                >
                  <rect
                    x={cx - 42}
                    y={2}
                    width={84}
                    height={22}
                    rx={10}
                    fill="white"
                    stroke="hsl(30 15% 85%)"
                    strokeWidth={0.5}
                  />
                  {/* Bubble tail */}
                  <polygon
                    points={`${cx - 4},24 ${cx + 4},24 ${cx},30`}
                    fill="white"
                  />
                  <text
                    x={cx}
                    y={16}
                    textAnchor="middle"
                    fontSize="7"
                    fontFamily="'Raleway', sans-serif"
                    fontWeight="500"
                    fill="hsl(30 15% 15%)"
                  >
                    {speechText}
                  </text>
                </g>
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
};

export default CinemaAudience;
