import { FaList } from "react-icons/fa";
import type { FeatureSection } from "../../../utils/featureUtils";
import { processFeatures } from "../../../utils/featureUtils";
import { featureStyles } from "../../../styles/featureStyles";
import { FeatureSection as FeatureSectionComponent } from "./FeatureSection";

interface ProjectFeaturesProps {
  features: string[] | FeatureSection[];
}

export function ProjectFeatures({ features }: ProjectFeaturesProps) {
  const processedFeatures = processFeatures(features);

  return (
    <div className={featureStyles.container}>
      <h3 className={featureStyles.header.container}>
        <FaList className={featureStyles.header.icon} />
        주요 기능
      </h3>

      <div className="grid gap-6">
        {processedFeatures.map((section, sectionIndex) => (
          <FeatureSectionComponent key={sectionIndex} section={section} />
        ))}
      </div>
    </div>
  );
}
