import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate, Img } from "remotion";
import { FadeInWords, FadeInChars } from "../library/components/text/TextAnimation";

export const IntroScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Logo bar animation
  const barScale = spring({ frame, fps, config: { damping: 15, mass: 0.8 }, delay: 5 });
  const barOpacity = interpolate(frame, [5, 15], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // Icon entrance
  const iconScale = spring({ frame, fps, config: { damping: 12, mass: 0.6 }, delay: 8 });
  const iconOpacity = interpolate(frame, [8, 18], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // Decorative line
  const lineWidth = spring({ frame, fps, config: { damping: 20 }, delay: 25 });

  return (
    <AbsoluteFill
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Center content */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 24,
        }}
      >
        {/* Logo accent bar */}
        <div
          style={{
            width: 60,
            height: 6,
            backgroundColor: "#D3321F",
            borderRadius: 3,
            transform: `scaleX(${barScale})`,
            opacity: barOpacity,
          }}
        />

        {/* Globe icon */}
        <div
          style={{
            transform: `scale(${iconScale})`,
            opacity: iconOpacity,
          }}
        >
          <Img
            src="https://api.iconify.design/lucide/globe.svg?color=%23D3321F&width=80"
            width={80}
            height={80}
          />
        </div>

        {/* Brand name */}
        <FadeInChars
          startFrom={12}
          stagger={0.04}
          duration={0.5}
          ease="back.out(1.7)"
          style={{
            fontSize: 72,
            fontWeight: 800,
            color: "#1a1a1a",
            letterSpacing: "-0.02em",
          }}
        >
          Namecheap
        </FadeInChars>

        {/* Decorative line */}
        <div
          style={{
            width: 200 * lineWidth,
            height: 2,
            background: "linear-gradient(90deg, transparent, #D3321F, #567EE3, transparent)",
            opacity: 0.6,
          }}
        />

        {/* Tagline */}
        <FadeInWords
          startFrom={30}
          stagger={0.12}
          duration={0.6}
          ease="power3.out"
          style={{
            fontSize: 28,
            fontWeight: 500,
            color: "#4A4A4A",
            letterSpacing: "0.04em",
            textTransform: "uppercase",
          }}
        >
          Make More Online, For Less
        </FadeInWords>
      </div>

      {/* Corner accent shapes */}
      <div
        style={{
          position: "absolute",
          top: 60,
          right: 80,
          width: 120,
          height: 120,
          border: "2px solid rgba(211,50,31,0.1)",
          borderRadius: "50%",
          transform: `scale(${spring({ frame, fps, config: { damping: 18 }, delay: 20 })}) rotate(${frame * 0.3}deg)`,
          opacity: interpolate(frame, [20, 35], [0, 0.6], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: 80,
          left: 100,
          width: 80,
          height: 80,
          border: "2px solid rgba(86,126,227,0.12)",
          borderRadius: 12,
          transform: `scale(${spring({ frame, fps, config: { damping: 18 }, delay: 25 })}) rotate(${45 + frame * 0.2}deg)`,
          opacity: interpolate(frame, [25, 40], [0, 0.5], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
        }}
      />
    </AbsoluteFill>
  );
};
