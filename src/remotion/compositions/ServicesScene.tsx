import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate, Img } from "remotion";
import { FadeInWords } from "../library/components/text/TextAnimation";

interface ServiceCardProps {
  icon: string;
  title: string;
  description: string;
  delay: number;
  accentColor: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ icon, title, description, delay, accentColor }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const cardY = interpolate(
    spring({ frame, fps, config: { damping: 14, mass: 0.8 }, delay }),
    [0, 1],
    [60, 0]
  );
  const cardOpacity = interpolate(frame, [delay, delay + 12], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const iconScale = spring({ frame, fps, config: { damping: 12, mass: 0.5 }, delay: delay + 6 });

  // Subtle pulse on icon
  const pulse = 1 + Math.sin(frame * 0.06 + delay) * 0.03;

  return (
    <div
      style={{
        transform: `translateY(${cardY}px)`,
        opacity: cardOpacity,
        background: "#FFFFFF",
        borderRadius: 20,
        padding: "36px 32px",
        boxShadow: "0 8px 32px rgba(0,0,0,0.06)",
        border: `1px solid ${accentColor}15`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 16,
        width: 280,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Top accent line */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 3,
          background: `linear-gradient(90deg, transparent, ${accentColor}, transparent)`,
          opacity: 0.7,
        }}
      />

      {/* Icon container */}
      <div
        style={{
          width: 72,
          height: 72,
          borderRadius: 18,
          background: `${accentColor}0A`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transform: `scale(${iconScale * pulse})`,
        }}
      >
        <Img src={icon} width={40} height={40} />
      </div>

      {/* Title */}
      <div
        style={{
          fontSize: 20,
          fontWeight: 700,
          color: "#1a1a1a",
          textAlign: "center",
        }}
      >
        {title}
      </div>

      {/* Description */}
      <div
        style={{
          fontSize: 14,
          color: "#4A4A4A",
          textAlign: "center",
          lineHeight: 1.5,
          fontWeight: 400,
        }}
      >
        {description}
      </div>
    </div>
  );
};

export const ServicesScene: React.FC = () => {
  const services = [
    {
      icon: "https://api.iconify.design/lucide/server.svg?color=%23567EE3&width=40",
      title: "Web Hosting",
      description: "Reliable, fast hosting for any website",
      accentColor: "#567EE3",
      delay: 8,
    },
    {
      icon: "https://api.iconify.design/lucide/mail.svg?color=%23D3321F&width=40",
      title: "Pro Email",
      description: "Professional email for your brand",
      accentColor: "#D3321F",
      delay: 14,
    },
    {
      icon: "https://api.iconify.design/lucide/shield-check.svg?color=%23567EE3&width=40",
      title: "SSL Security",
      description: "Keep your site safe & trusted",
      accentColor: "#567EE3",
      delay: 20,
    },
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
          gap: 40,
        }}
      >
        {/* Section title */}
        <FadeInWords
          startFrom={0}
          stagger={0.1}
          duration={0.5}
          ease="power2.out"
          style={{
            fontSize: 18,
            fontWeight: 600,
            color: "#567EE3",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
          }}
        >
          Complete Web Services
        </FadeInWords>

        <FadeInWords
          startFrom={5}
          stagger={0.08}
          duration={0.6}
          ease="power3.out"
          style={{
            fontSize: 44,
            fontWeight: 800,
            color: "#1a1a1a",
            letterSpacing: "-0.02em",
            textAlign: "center",
          }}
        >
          Everything You Need Online
        </FadeInWords>

        {/* Service cards row */}
        <div
          style={{
            display: "flex",
            gap: 28,
            alignItems: "flex-start",
          }}
        >
          {services.map((service, i) => (
            <ServiceCard key={i} {...service} />
          ))}
        </div>
      </div>
    </AbsoluteFill>
  );
};
