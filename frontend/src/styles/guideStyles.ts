export const gridPatternStyle = `
  .bg-grid-pattern {
    background-image: linear-gradient(to right, #e5e7eb 1px, transparent 1px),
      linear-gradient(to bottom, #e5e7eb 1px, transparent 1px);
    background-size: 24px 24px;
  }
  @media (prefers-color-scheme: dark) {
    .bg-grid-pattern {
      background-image: linear-gradient(to right, #374151 1px, transparent 1px),
        linear-gradient(to bottom, #374151 1px, transparent 1px);
    }
  }
`;

export const scrollbarHideStyle = `
  .scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
  .scrollbar-hide::-webkit-scrollbar {
    display: none;
  }
`;

export const guidePageStyles = {
  container:
    "min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50/50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900/50",
  hero: {
    container: "relative overflow-hidden",
    grid: "absolute inset-0 bg-grid-pattern opacity-5",
    content: "relative px-4 py-2 mx-auto max-w-7xl sm:px-6 lg:px-8 lg:py-32",
    title:
      "text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-5xl md:text-6xl",
    gradientText:
      "block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-indigo-500",
  },
  techSection: {
    container: "relative",
    gradient:
      "absolute inset-0 bg-gradient-to-b from-transparent via-gray-50/50 to-transparent dark:via-gray-800/50",
  },
  ctaSection: {
    container:
      "relative px-4 py-16 pb-32 mx-auto text-center max-w-7xl sm:px-6 lg:px-8 sm:pb-16",
    gradient:
      "absolute inset-0 bg-gradient-to-b from-transparent to-gray-50/30 dark:to-gray-900/30",
    button:
      "inline-flex items-center px-8 py-4 text-lg font-medium text-white transition-all duration-300 shadow-lg rounded-2xl bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-700 hover:to-indigo-600 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500",
  },
};
