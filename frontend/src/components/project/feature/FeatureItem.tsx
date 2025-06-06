import type { FeatureItem as FeatureItemType } from "../../../utils/featureUtils";
import { featureStyles } from "../../../styles/featureStyles";

interface FeatureItemProps {
  item: FeatureItemType;
}

export function FeatureItem({ item }: FeatureItemProps) {
  const [icon, ...titleParts] = item.title.split(" ");

  return (
    <div className={featureStyles.section.content.item.container}>
      <div className={featureStyles.section.content.item.content}>
        <div className={featureStyles.section.content.item.icon.container}>
          {icon}
        </div>
        <div className={featureStyles.section.content.item.text.container}>
          <h5 className={featureStyles.section.content.item.text.title}>
            {titleParts.join(" ")}
          </h5>
          {item.description && (
            <p className={featureStyles.section.content.item.text.description}>
              {item.description}
            </p>
          )}
          {item.keyPoints && item.keyPoints.length > 0 && (
            <ul
              className={
                featureStyles.section.content.item.text.keyPoints.container
              }
            >
              {item.keyPoints.map((point, pointIndex) => {
                const [pointIcon, ...pointText] = point.split(" ");
                return (
                  <li
                    key={pointIndex}
                    className={
                      featureStyles.section.content.item.text.keyPoints.item
                    }
                  >
                    <span
                      className={
                        featureStyles.section.content.item.text.keyPoints.icon
                      }
                    >
                      {pointIcon}
                    </span>
                    {pointText.join(" ")}
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
