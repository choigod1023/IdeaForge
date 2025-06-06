import type { FeatureSection as FeatureSectionType } from "../../../utils/featureUtils";
import { featureStyles } from "../../../styles/featureStyles";
import { FeatureItem } from "./FeatureItem";

interface FeatureSectionProps {
  section: FeatureSectionType;
}

export function FeatureSection({ section }: FeatureSectionProps) {
  const [icon, ...titleParts] = section.mainTitle.split(" ");

  return (
    <div className={featureStyles.section.container}>
      <div className={featureStyles.section.header.container}>
        <div className={featureStyles.section.header.titleContainer}>
          <span className="text-2xl">{icon}</span>
          <h4 className={featureStyles.section.header.title}>
            {titleParts.join(" ")}
          </h4>
        </div>
        <p className={featureStyles.section.header.description}>
          {section.description}
        </p>
      </div>

      <div className={featureStyles.section.content.container}>
        {section.items.map((item, itemIndex) => (
          <FeatureItem key={itemIndex} item={item} />
        ))}
      </div>
    </div>
  );
}
