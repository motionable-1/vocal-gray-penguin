import { AbsoluteFill, Artifact, useCurrentFrame, Sequence } from "remotion";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { loadFont } from "@remotion/google-fonts/Inter";
import { Audio } from "@remotion/media";
import { slideOver } from "../library/components/layout/transitions/presentations";
import { Background } from "./Background";
import { IntroScene } from "./IntroScene";
import { PricingScene } from "./PricingScene";
import { ServicesScene } from "./ServicesScene";
import { BulkScene } from "./BulkScene";
import { CTAScene } from "./CTAScene";

const { fontFamily } = loadFont("normal", {
  weights: ["400", "500", "600", "700", "800"],
  subsets: ["latin"],
});

// Scene durations (frames at 30fps)
const INTRO = 120;       // 4s
const PRICING = 130;     // ~4.3s
const SERVICES = 130;    // ~4.3s
const BULK = 130;        // ~4.3s
const CTA = 120;         // 4s
const TRANSITION = 15;   // 0.5s transitions

// Total = 630 - 4*15 = 570 frames = 19s

const WHOOSH_URL = "https://pub-e3bfc0083b0644b296a7080b21024c5f.r2.dev/sfx/1772944155651_8e4d6ps87a2_sfx_Subtle_modern_UI_whoosh_transi.mp3";
const CHIME_URL = "https://pub-e3bfc0083b0644b296a7080b21024c5f.r2.dev/sfx/1772944159518_ij6y3mv0yh_sfx_Soft_positive_digital_notifica.mp3";

export const Main: React.FC = () => {
  const frame = useCurrentFrame();

  // Transition timings for SFX
  const transitionFrames = [
    INTRO - TRANSITION,
    INTRO + PRICING - 2 * TRANSITION,
    INTRO + PRICING + SERVICES - 3 * TRANSITION,
    INTRO + PRICING + SERVICES + BULK - 4 * TRANSITION,
  ];

  return (
    <>
      {frame === 0 && (
        <Artifact content={Artifact.Thumbnail} filename="thumbnail.jpeg" />
      )}

      <AbsoluteFill style={{ fontFamily }}>
        {/* Persistent background */}
        <Background />

        {/* Scene transitions */}
        <TransitionSeries>
          <TransitionSeries.Sequence durationInFrames={INTRO}>
            <IntroScene />
          </TransitionSeries.Sequence>

          <TransitionSeries.Transition
            presentation={slideOver("left")}
            timing={linearTiming({ durationInFrames: TRANSITION })}
          />

          <TransitionSeries.Sequence durationInFrames={PRICING}>
            <PricingScene />
          </TransitionSeries.Sequence>

          <TransitionSeries.Transition
            presentation={slideOver("left")}
            timing={linearTiming({ durationInFrames: TRANSITION })}
          />

          <TransitionSeries.Sequence durationInFrames={SERVICES}>
            <ServicesScene />
          </TransitionSeries.Sequence>

          <TransitionSeries.Transition
            presentation={slideOver("left")}
            timing={linearTiming({ durationInFrames: TRANSITION })}
          />

          <TransitionSeries.Sequence durationInFrames={BULK}>
            <BulkScene />
          </TransitionSeries.Sequence>

          <TransitionSeries.Transition
            presentation={slideOver("left")}
            timing={linearTiming({ durationInFrames: TRANSITION })}
          />

          <TransitionSeries.Sequence durationInFrames={CTA}>
            <CTAScene />
          </TransitionSeries.Sequence>
        </TransitionSeries>

        {/* Sound effects on transitions */}
        {transitionFrames.map((f, i) => (
          <Sequence key={i} from={f}>
            <Audio src={WHOOSH_URL} volume={0.25} />
          </Sequence>
        ))}

        {/* Chime on CTA */}
        <Sequence from={transitionFrames[3] + 20}>
          <Audio src={CHIME_URL} volume={0.2} />
        </Sequence>
      </AbsoluteFill>
    </>
  );
};
