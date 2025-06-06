import { TechIntroSection } from "../components/TechIntroSection";
import { FeatureSection } from "../components/FeatureSection";
import { HeroSection } from "../components/guide/HeroSection";
import { CtaSection } from "../components/guide/CtaSection";
import { FadeInUp } from "../components/animations/FadeInUp";
import {
  guidePageStyles,
  gridPatternStyle,
  scrollbarHideStyle,
} from "../styles/guideStyles";

const GuidePage = () => {
  return (
    <>
      <style>{`
        ${gridPatternStyle}
        ${scrollbarHideStyle}
      `}</style>
      <div className={guidePageStyles.container}>
        <HeroSection />

        <FadeInUp>
          <FeatureSection />
        </FadeInUp>

        <div className={guidePageStyles.techSection.container}>
          <div className={guidePageStyles.techSection.gradient} />
          <FadeInUp className="relative">
            <TechIntroSection />
          </FadeInUp>
        </div>

        <CtaSection />
      </div>
    </>
  );
};

export default GuidePage;
