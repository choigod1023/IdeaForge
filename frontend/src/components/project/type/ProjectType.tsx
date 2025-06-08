import { ProjectTypeInfo } from "./ProjectTypeInfo";
import { getEmojiForDescription } from "../../../constants/emojis";

interface ProjectTypeProps {
  type: string;
}

export function ProjectType({ type }: ProjectTypeProps) {
  return (
    <div className="p-4 bg-white border border-gray-200 rounded-xl dark:bg-gray-800 dark:border-gray-700">
      <ProjectTypeInfo type={type}>
        {({ type: cleanType, icon: Icon, descriptions }) => (
          <>
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 text-indigo-600 rounded-lg bg-indigo-50 dark:bg-indigo-900/30 dark:text-indigo-400">
                <Icon className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {cleanType}
              </h3>
            </div>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
              {descriptions.map((desc: string, idx: number) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="mt-1 text-lg">
                    {getEmojiForDescription(desc)}
                  </span>
                  <span>{desc}</span>
                </li>
              ))}
            </ul>
          </>
        )}
      </ProjectTypeInfo>
    </div>
  );
}
