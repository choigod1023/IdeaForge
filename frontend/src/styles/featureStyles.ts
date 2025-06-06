export const featureStyles = {
  container: "space-y-6",
  header: {
    container:
      "flex items-center text-xl font-semibold text-gray-900 dark:text-white",
    icon: "w-5 h-5 mr-3 text-indigo-500 dark:text-indigo-400",
  },
  section: {
    container:
      "overflow-hidden bg-white border border-gray-200 rounded-xl dark:bg-gray-800 dark:border-gray-700",
    header: {
      container: "p-5 border-b border-gray-100 dark:border-gray-700",
      titleContainer: "flex items-center gap-2 mb-2",
      title: "text-lg font-semibold text-gray-900 dark:text-white",
      description: "text-sm text-gray-600 dark:text-gray-300",
    },
    content: {
      container: "divide-y divide-gray-100 dark:divide-gray-700",
      item: {
        container: "p-5",
        content: "flex items-start gap-4",
        icon: {
          container:
            "flex items-center justify-center flex-shrink-0 w-10 h-10 text-2xl rounded-lg bg-indigo-50 dark:bg-indigo-900/30",
        },
        text: {
          container: "flex-1 min-w-0",
          title: "text-base font-medium text-gray-900 dark:text-white",
          description: "mt-1 text-sm text-gray-600 dark:text-gray-300",
          keyPoints: {
            container: "mt-3 space-y-2",
            item: "flex items-start text-sm text-gray-600 dark:text-gray-300",
            icon: "mr-2 text-lg",
          },
        },
      },
    },
  },
} as const;
