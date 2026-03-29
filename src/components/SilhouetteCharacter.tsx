import { useEffect, useState } from "react";

interface SilhouetteCharacterProps {
  isClapping: boolean;
}

const SilhouetteCharacter = ({ isClapping }: SilhouetteCharacterProps) => {
  const [clapFrame, setClapFrame] = useState(0);

  useEffect(() => {
    if (!isClapping) {
      setClapFrame(0);
      return;
    }

    let frame = 0;
    const interval = setInterval(() => {
      frame++;
      setClapFrame(frame);
      if (frame >= 8) clearInterval(interval);
    }, 80);

    return () => clearInterval(interval);
  }, [isClapping]);

  // Arm angles based on clap animation frame
  const getArmPose = () => {
    if (!isClapping || clapFrame === 0) {
      // Idle: arms down relaxed
      return {
        leftArmAngle: 30,
        rightArmAngle: -30,
        leftForearmAngle: 10,
        rightForearmAngle: -10,
        bodyBounce: 0,
      };
    }

    // Clapping cycle: arms come together overhead then apart
    const cycle = clapFrame % 4;
    switch (cycle) {
      case 1:
        return { leftArmAngle: -50, rightArmAngle: 50, leftForearmAngle: -30, rightForearmAngle: 30, bodyBounce: -3 };
      case 2:
        return { leftArmAngle: -15, rightArmAngle: 15, leftForearmAngle: -60, rightForearmAngle: 60, bodyBounce: -6 };
      case 3:
        return { leftArmAngle: -50, rightArmAngle: 50, leftForearmAngle: -30, rightForearmAngle: 30, bodyBounce: -3 };
      default:
        return { leftArmAngle: 30, rightArmAngle: -30, leftForearmAngle: 10, rightForearmAngle: -10, bodyBounce: 0 };
    }
  };

  const pose = getArmPose();

  return (
    <svg
      viewBox="0 0 120 200"
      className="w-20 md:w-28 h-auto select-none"
      style={{ filter: "drop-shadow(0 4px 12px rgba(0,0,0,0.3))" }}
    >
      <g
        transform={`translate(0, ${pose.bodyBounce})`}
        style={{ transition: "transform 0.08s ease-out" }}
      >
        {/* Head - round */}
        <circle cx="60" cy="40" r="22" fill="hsl(30 30% 12%)" />

        {/* Eyes - small glowing white dots */}
        <circle cx="52" cy="37" r="2.5" fill="white" opacity="0.95">
          <animate
            attributeName="opacity"
            values="0.95;0.6;0.95"
            dur="3s"
            repeatCount="indefinite"
          />
        </circle>
        <circle cx="68" cy="37" r="2.5" fill="white" opacity="0.95">
          <animate
            attributeName="opacity"
            values="0.95;0.6;0.95"
            dur="3s"
            repeatCount="indefinite"
          />
        </circle>

        {/* Body - torso */}
        <line
          x1="60" y1="62" x2="60" y2="120"
          stroke="hsl(30 30% 12%)"
          strokeWidth="6"
          strokeLinecap="round"
        />

        {/* Left arm */}
        <g
          style={{
            transformOrigin: "60px 70px",
            transform: `rotate(${pose.leftArmAngle}deg)`,
            transition: "transform 0.1s ease-out",
          }}
        >
          <line
            x1="60" y1="70" x2="60" y2="98"
            stroke="hsl(30 30% 12%)"
            strokeWidth="4"
            strokeLinecap="round"
          />
          {/* Left forearm */}
          <g
            style={{
              transformOrigin: "60px 98px",
              transform: `rotate(${pose.leftForearmAngle}deg)`,
              transition: "transform 0.1s ease-out",
            }}
          >
            <line
              x1="60" y1="98" x2="60" y2="118"
              stroke="hsl(30 30% 12%)"
              strokeWidth="3.5"
              strokeLinecap="round"
            />
            {/* Hand */}
            <circle cx="60" cy="120" r="4" fill="hsl(30 30% 12%)" />
          </g>
        </g>

        {/* Right arm */}
        <g
          style={{
            transformOrigin: "60px 70px",
            transform: `rotate(${pose.rightArmAngle}deg)`,
            transition: "transform 0.1s ease-out",
          }}
        >
          <line
            x1="60" y1="70" x2="60" y2="98"
            stroke="hsl(30 30% 12%)"
            strokeWidth="4"
            strokeLinecap="round"
          />
          {/* Right forearm */}
          <g
            style={{
              transformOrigin: "60px 98px",
              transform: `rotate(${pose.rightForearmAngle}deg)`,
              transition: "transform 0.1s ease-out",
            }}
          >
            <line
              x1="60" y1="98" x2="60" y2="118"
              stroke="hsl(30 30% 12%)"
              strokeWidth="3.5"
              strokeLinecap="round"
            />
            {/* Hand */}
            <circle cx="60" cy="120" r="4" fill="hsl(30 30% 12%)" />
          </g>
        </g>

        {/* Left leg */}
        <line
          x1="60" y1="120" x2="45" y2="165"
          stroke="hsl(30 30% 12%)"
          strokeWidth="5"
          strokeLinecap="round"
        />
        <line
          x1="45" y1="165" x2="40" y2="190"
          stroke="hsl(30 30% 12%)"
          strokeWidth="4"
          strokeLinecap="round"
        />

        {/* Right leg */}
        <line
          x1="60" y1="120" x2="75" y2="165"
          stroke="hsl(30 30% 12%)"
          strokeWidth="5"
          strokeLinecap="round"
        />
        <line
          x1="75" y1="165" x2="80" y2="190"
          stroke="hsl(30 30% 12%)"
          strokeWidth="4"
          strokeLinecap="round"
        />

        {/* Feet */}
        <ellipse cx="38" cy="192" rx="8" ry="3" fill="hsl(30 30% 12%)" />
        <ellipse cx="82" cy="192" rx="8" ry="3" fill="hsl(30 30% 12%)" />
      </g>
    </svg>
  );
};

export default SilhouetteCharacter;
