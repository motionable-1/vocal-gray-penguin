import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate, Img } from "remotion";
import { FadeInWords } from "../library/components/text/TextAnimation";
import { Counter } from "../library/components/text/Counter";

export const BulkScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Domain stack animation
  const stackEntries = [0, 1, 2, 3, 4].map((i) => {
    const delay = 10 + i * 4;
    const y = interpolate(
      spring({ frame, fps, config: { damping: 16, mass: 0.7 }, delay }),
      [0, 1],
      [40, 0]
    );
    const opacity = interpolate(frame, [delay, delay + 10], [0, 1], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    });
    return { y, opacity };
  });

  // Layers icon
  const layersScale = spring({ frame, fps, config: { damping: 12, mass: 0.6 }, delay: 5 });
  const layersOpacity = interpolate(frame, [5, 15], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // Arrow animation
  const arrowProgress = spring({ frame, fps, config: { damping: 18 }, delay: 35 });

  const domains = [
    "mycompany.com",
    "mybrand.net",
    "mystore.org",
    "myapp.io",
    "mysite.co",
  ];

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
          gap: 30,
        }}
      >
        {/* Section label */}
        <FadeInWords
          startFrom={0}
          stagger={0.1}
          duration={0.5}
          ease="power2.out"
          style={{
            fontSize: 18,
            fontWeight: 600,
            color: "#D3321F",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
          }}
        >
          Bulk Domain Transfer
        </FadeInWords>

        {/* Main content row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 60,
          }}
        >
          {/* Domain stack */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 8,
              width: 320,
            }}
          >
            {domains.map((domain, i) => (
              <div
                key={i}
                style={{
                  transform: `translateY(${stackEntries[i].y}px)`,
                  opacity: stackEntries[i].opacity,
                  background: "#FFFFFF",
                  borderRadius: 12,
                  padding: "14px 20px",
                  boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
                  border: "1px solid rgba(74,74,74,0.08)",
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  fontSize: 16,
                  fontWeight: 500,
                  color: "#1a1a1a",
                }}
              >
                <div
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    backgroundColor: i % 2 === 0 ? "#D3321F" : "#567EE3",
                    opacity: 0.7,
                  }}
                />
                {domain}
              </div>
            ))}
          </div>

          {/* Arrow / Transfer indicator */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 20,
              opacity: arrowProgress,
            }}
          >
            <div
              style={{
                transform: `scale(${layersScale})`,
                opacity: layersOpacity,
              }}
            >
              <Img
                src="https://api.iconify.design/lucide/layers.svg?color=%23D3321F&width=64"
                width={64}
                height={64}
              />
            </div>

            {/* Transfer up to counter */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 6,
              }}
            >
              <div
                style={{
                  fontSize: 16,
                  fontWeight: 500,
                  color: "#4A4A4A",
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                }}
              >
                Transfer up to
              </div>
              <Counter
                from={0}
                to={50}
                duration={1.2}
                delay={1.2}
                ease="smooth"
                style={{
                  fontSize: 64,
                  fontWeight: 800,
                  color: "#D3321F",
                  lineHeight: 1,
                }}
              />
              <div
                style={{
                  fontSize: 18,
                  fontWeight: 600,
                  color: "#1a1a1a",
                }}
              >
                domains at once
              </div>
            </div>
          </div>
        </div>

        {/* Bottom text */}
        <FadeInWords
          startFrom={45}
          stagger={0.06}
          duration={0.5}
          ease="power2.out"
          style={{
            fontSize: 18,
            color: "#4A4A4A",
            fontWeight: 400,
          }}
        >
          Effortless bulk management for your portfolio
        </FadeInWords>
      </div>
    </AbsoluteFill>
  );
};
