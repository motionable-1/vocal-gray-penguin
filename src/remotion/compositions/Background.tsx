import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate } from "remotion";

export const Background: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const time = frame / fps;

  // Subtle floating gradient orbs
  const orb1X = interpolate(Math.sin(time * 0.3), [-1, 1], [15, 35]);
  const orb1Y = interpolate(Math.cos(time * 0.25), [-1, 1], [10, 30]);
  const orb2X = interpolate(Math.sin(time * 0.2 + 2), [-1, 1], [60, 85]);
  const orb2Y = interpolate(Math.cos(time * 0.35 + 1), [-1, 1], [55, 80]);
  const orb3X = interpolate(Math.sin(time * 0.15 + 4), [-1, 1], [40, 60]);
  const orb3Y = interpolate(Math.cos(time * 0.2 + 3), [-1, 1], [70, 90]);

  return (
    <AbsoluteFill style={{ backgroundColor: "#FFFFFF" }}>
      {/* Subtle gradient orbs */}
      <div
        style={{
          position: "absolute",
          left: `${orb1X}%`,
          top: `${orb1Y}%`,
          width: 600,
          height: 600,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(211,50,31,0.06) 0%, transparent 70%)",
          transform: "translate(-50%, -50%)",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: `${orb2X}%`,
          top: `${orb2Y}%`,
          width: 500,
          height: 500,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(86,126,227,0.06) 0%, transparent 70%)",
          transform: "translate(-50%, -50%)",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: `${orb3X}%`,
          top: `${orb3Y}%`,
          width: 400,
          height: 400,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(211,50,31,0.04) 0%, transparent 70%)",
          transform: "translate(-50%, -50%)",
        }}
      />

      {/* Subtle dot grid */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "radial-gradient(circle, rgba(74,74,74,0.08) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
          opacity: interpolate(Math.sin(time * 0.5), [-1, 1], [0.3, 0.6]),
        }}
      />
    </AbsoluteFill>
  );
};
