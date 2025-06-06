import { FadeInUp } from "../animations/FadeInUp";
import { guidePageStyles } from "../../styles/guideStyles";

export const HeroSection = () => {
  return (
    <div className={guidePageStyles.hero.container}>
      <div className={guidePageStyles.hero.grid} />
      <FadeInUp className={guidePageStyles.hero.content}>
        <div className="text-center">
          <h1 className={guidePageStyles.hero.title}>
            <span className="block">IdeaForge로</span>
            <span className={guidePageStyles.hero.gradientText}>
              실력을 키워보세요
            </span>
          </h1>
        </div>
      </FadeInUp>
    </div>
  );
};
