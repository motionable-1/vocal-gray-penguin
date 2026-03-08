import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate, Img } from "remotion";
import { FadeInWords, SlideInText } from "../library/components/text/TextAnimation";
import { Counter } from "../library/components/text/Counter";

export const PricingScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Price card entrance
  const cardScale = spring({ frame, fps, config: { damping: 14, mass: 0.8 }, delay: 5 });
  const cardOpacity = interpolate(frame, [5, 18], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // Tag icon
  const tagScale = spring({ frame, fps, config: { damping: 12, mass: 0.6 }, delay: 10 });
  const tagOpacity = interpolate(frame, [10, 20], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // Badge pop
  const badgeScale = spring({ frame, fps, config: { damping: 10, mass: 0.5 }, delay: 30 });

  // Floating price tag accent
  const floatY = Math.sin(frame * 0.08) * 8;

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
          Ultra-Low Pricing
        </FadeInWords>

        {/* Price card */}
        <div
          style={{
            transform: `scale(${cardScale}) translateY(${floatY}px)`,
            opacity: cardOpacity,
            background: "linear-gradient(135deg, #FFFFFF 0%, #F8F8FA 100%)",
            borderRadius: 24,
            padding: "48px 72px",
            boxShadow: "0 20px 60px rgba(0,0,0,0.08), 0 4px 16px rgba(211,50,31,0.06)",
            border: "1px solid rgba(211,50,31,0.08)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 12,
            position: "relative",
          }}
        >
          {/* Tag icon */}
          <div
            style={{
              transform: `scale(${tagScale})`,
              opacity: tagOpacity,
              marginBottom: 8,
            }}
          >
            <Img
              src="https://api.iconify.design/lucide/tag.svg?color=%23D3321F&width=48"
              width={48}
              height={48}
            />
          </div>

          {/* Domain extension */}
          <div
            style={{
              fontSize: 28,
              fontWeight: 700,
              color: "#1a1a1a",
              letterSpacing: "-0.01em",
            }}
          >
            .COM Domains
          </div>

          {/* Price with counter */}
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: 4,
            }}
          >
            <span
              style={{
                fontSize: 32,
                fontWeight: 700,
                color: "#D3321F",
                marginTop: 8,
              }}
            >
              $
            </span>
            <Counter
              from={19.99}
              to={6.79}
              duration={1.5}
              delay={0.6}
              decimals={2}
              ease="smooth"
              style={{
                fontSize: 80,
                fontWeight: 800,
                color: "#D3321F",
                letterSpacing: "-0.03em",
                lineHeight: 1,
              }}
            />
          </div>

          <div
            style={{
              fontSize: 16,
              color: "#4A4A4A",
              fontWeight: 500,
            }}
          >
            per year
          </div>

          {/* Best value badge */}
          <div
            style={{
              position: "absolute",
              top: -14,
              right: -10,
              transform: `scale(${badgeScale}) rotate(-8deg)`,
              background: "linear-gradient(135deg, #D3321F 0%, #e84530 100%)",
              color: "#FFFFFF",
              fontSize: 13,
              fontWeight: 700,
              padding: "6px 16px",
              borderRadius: 20,
              boxShadow: "0 4px 12px rgba(211,50,31,0.3)",
              letterSpacing: "0.05em",
              textTransform: "uppercase",
            }}
          >
            Best Value
          </div>
        </div>

        {/* Sub-text */}
        <SlideInText
          startFrom={40}
          direction="bottom"
          distance={30}
          stagger={0.03}
          duration={0.5}
          ease="power2.out"
          style={{
            fontSize: 20,
            color: "#4A4A4A",
            fontWeight: 400,
            textAlign: "center",
          }}
        >
          Register your dream domain today
        </SlideInText>
      </div>

      {/* Decorative floating dots */}
      {[0, 1, 2, 3, 4].map((i) => {
        const dotDelay = 15 + i * 5;
        const dotOpacity = interpolate(frame, [dotDelay, dotDelay + 15], [0, 0.3], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });
        const positions = [
          { left: "15%", top: "25%" },
          { left: "82%", top: "35%" },
          { left: "20%", top: "72%" },
          { left: "78%", top: "68%" },
          { left: "50%", top: "15%" },
        ];
        const sizes = [8, 10, 6, 12, 7];
        const colors = ["#D3321F", "#567EE3", "#D3321F", "#567EE3", "#D3321F"];
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              ...positions[i],
              width: sizes[i],
              height: sizes[i],
              borderRadius: "50%",
              backgroundColor: colors[i],
              opacity: dotOpacity,
              transform: `translateY(${Math.sin(frame * 0.06 + i * 1.5) * 12}px)`,
            }}
          />
        );
      })}
    </AbsoluteFill>
  );
};
