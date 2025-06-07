export const DESCRIPTION_EMOJIS = {
  "실제 문제": "🎯",
  "사용자 경험": "👥",
  활용성: "💡",
  피드백: "📝",
  "기술 학습": "📚",
  창의성: "✨",
  커뮤니티: "🌱",
  기여: "🤝",
  기능: "⚡",
  성능: "🚀",
  보안: "🔒",
  확장성: "📈",
  유지보수: "🔧",
  테스트: "🧪",
  문서화: "📄",
  협업: "👥",
  디자인: "🎨",
  접근성: "♿",
  반응형: "📱",
  최적화: "⚡",
} as const;

export type DescriptionEmojiKey = keyof typeof DESCRIPTION_EMOJIS;

export const getEmojiForDescription = (desc: string): string => {
  const matchedKey = Object.keys(DESCRIPTION_EMOJIS).find((key) =>
    desc.toLowerCase().includes(key.toLowerCase())
  );
  return matchedKey
    ? DESCRIPTION_EMOJIS[matchedKey as DescriptionEmojiKey]
    : "✨";
};
