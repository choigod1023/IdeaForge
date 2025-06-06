import { Link } from "react-router-dom";
import { FadeInUp } from "../animations/FadeInUp";
import { guidePageStyles } from "../../styles/guideStyles";

export const CtaSection = () => {
  return (
    <div className={guidePageStyles.ctaSection.container}>
      <div className={guidePageStyles.ctaSection.gradient} />
      <FadeInUp className="relative">
        <Link to="/create">
          <button className={guidePageStyles.ctaSection.button}>
            프로젝트 생성하러 가기
            <span className="ml-2" role="img" aria-label="rocket">
              🚀
            </span>
          </button>
        </Link>
      </FadeInUp>
    </div>
  );
};
