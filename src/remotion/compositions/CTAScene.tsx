import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate, Img } from "remotion";
import { FadeInChars, FadeInWords } from "../library/components/text/TextAnimation";

export const CTAScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Button entrance
  const btnScale = spring({ frame, fps, config: { damping: 12, mass: 0.7 }, delay: 25 });
  const btnOpacity = interpolate(frame, [25, 38], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // Button pulse
  const pulse = 1 + Math.sin(frame * 0.1) * 0.015;

  // Globe icon
  const globeScale = spring({ frame, fps, config: { damping: 10, mass: 0.5 }, delay: 5 });
  const globeOpacity = interpolate(frame, [5, 15], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const globeRotate = interpolate(frame, [0, 120], [0, 360]);

  // Decorative ring
  const ringScale = spring({ frame, fps, config: { damping: 20 }, delay: 10 });

  return (
    <AbsoluteFill
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 28,
        }}
      >
        {/* Rotating globe with ring */}
        <div style={{ position: "relative" }}>
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              width: 130,
              height: 130,
              border: "2px solid rgba(211,50,31,0.12)",
              borderRadius: "50%",
              transform: `translate(-50%, -50%) scale(${ringScale}) rotate(${frame * 0.5}deg)`,
            }}
          />
          <div
            style={{
              transform: `scale(${globeScale}) rotate(${globeRotate * 0.05}deg)`,
              opacity: globeOpacity,
            }}
          >
            <Img
              src="https://api.iconify.design/lucide/globe.svg?color=%23D3321F&width=80"
              width={80}
              height={80}
            />
          </div>
        </div>

        {/* Headline */}
        <FadeInChars
          startFrom={10}
          stagger={0.03}
          duration={0.5}
          ease="back.out(1.4)"
          style={{
            fontSize: 52,
            fontWeight: 800,
            color: "#1a1a1a",
            letterSpacing: "-0.02em",
            textAlign: "center",
          }}
        >
          Start Building Today
        </FadeInChars>

        {/* Subtitle */}
        <FadeInWords
          startFrom={20}
          stagger={0.1}
          duration={0.5}
          ease="power2.out"
          style={{
            fontSize: 22,
            color: "#4A4A4A",
            fontWeight: 400,
            textAlign: "center",
          }}
        >
          Your online journey begins at Namecheap
        </FadeInWords>

        {/* CTA Button */}
        <div
          style={{
            transform: `scale(${btnScale * pulse})`,
            opacity: btnOpacity,
            background: "linear-gradient(135deg, #D3321F 0%, #e84530 100%)",
            color: "#FFFFFF",
            fontSize: 22,
            fontWeight: 700,
            padding: "18px 52px",
            borderRadius: 50,
            boxShadow: "0 8px 28px rgba(211,50,31,0.35), 0 2px 8px rgba(211,50,31,0.2)",
            letterSpacing: "0.02em",
            cursor: "pointer",
          }}
        >
          namecheap.com
        </div>

        {/* Sub CTA */}
        <FadeInWords
          startFrom={35}
          stagger={0.08}
          duration={0.4}
          ease="power2.out"
          style={{
            fontSize: 15,
            color: "#4A4A4A",
            fontWeight: 500,
            opacity: 0.7,
          }}
        >
          Domains • Hosting • Email • Security
        </FadeInWords>
      </div>

      {/* Accent shapes */}
      <div
        style={{
          position: "absolute",
          bottom: 60,
          right: 100,
          width: 100,
          height: 100,
          border: "2px solid rgba(86,126,227,0.1)",
          borderRadius: "50%",
          transform: `scale(${spring({ frame, fps, config: { damping: 18 }, delay: 15 })})`,
          opacity: 0.5,
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 80,
          left: 120,
          width: 60,
          height: 60,
          border: "2px solid rgba(211,50,31,0.1)",
          borderRadius: 10,
          transform: `scale(${spring({ frame, fps, config: { damping: 18 }, delay: 20 })}) rotate(${30 + frame * 0.3}deg)`,
          opacity: 0.4,
        }}
      />
    </AbsoluteFill>
  );
};
