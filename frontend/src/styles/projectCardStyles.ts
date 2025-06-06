export const projectCardStyles = {
  container:
    "relative p-4 transition-all duration-200 bg-white rounded-2xl shadow cursor-pointer hover:bg-gray-50 hover:shadow-md active:bg-gray-100 active:scale-[0.98] dark:bg-gray-800 dark:hover:bg-gray-700 dark:active:bg-gray-600 sm:p-6 group",
  ring: "absolute inset-0 transition-opacity duration-200 rounded-2xl ring-2 ring-transparent group-hover:ring-indigo-500/20 group-active:ring-indigo-500/40 dark:group-hover:ring-indigo-400/20 dark:group-active:ring-indigo-400/40",
  content: "relative space-y-4",
  header: {
    container: "flex items-start justify-between",
    title:
      "text-lg font-semibold text-gray-900 transition-colors group-hover:text-indigo-600 dark:text-gray-100 dark:group-hover:text-indigo-400 sm:text-xl",
    description:
      "text-sm text-gray-600 transition-colors group-hover:text-gray-700 dark:text-gray-400 dark:group-hover:text-gray-300 line-clamp-2 sm:text-base",
    actions: "flex space-x-1 sm:space-x-2",
    button: {
      download:
        "p-1.5 text-green-600 transition-colors rounded-xl hover:bg-green-100 dark:text-green-400 dark:hover:bg-green-900/30 sm:p-2",
      remove:
        "p-1.5 text-red-600 transition-colors rounded-xl hover:bg-red-100 dark:text-red-400 dark:hover:bg-red-900/30 sm:p-2",
    },
  },
  tags: {
    container: "flex flex-wrap gap-1.5",
    difficulty:
      "px-2 py-0.5 text-xs font-medium text-blue-800 bg-blue-100 rounded-xl transition-colors group-hover:bg-blue-200 dark:bg-blue-900/30 dark:text-blue-200 dark:group-hover:bg-blue-900/50",
    type: "flex items-center gap-1 px-2 py-0.5 text-xs font-medium text-orange-800 bg-orange-100 rounded-xl transition-colors group-hover:bg-orange-200 dark:bg-orange-900/30 dark:text-orange-200 dark:group-hover:bg-orange-900/50",
    category:
      "px-2 py-0.5 text-xs font-medium text-green-800 bg-green-100 rounded-xl transition-colors group-hover:bg-green-200 dark:bg-green-900/30 dark:text-green-200 dark:group-hover:bg-green-900/50",
    theme:
      "px-2 py-0.5 text-xs font-medium text-purple-800 bg-purple-100 rounded-xl transition-colors group-hover:bg-purple-200 dark:bg-purple-900/30 dark:text-purple-200 dark:group-hover:bg-purple-900/50",
  },
  section: {
    container: "space-y-2",
    header:
      "flex items-center gap-1.5 text-xs text-gray-600 dark:text-gray-400",
    title: "font-medium",
    list: "pl-5 space-y-1 text-xs text-gray-600 list-disc dark:text-gray-400",
    listItem: "line-clamp-1",
    techStack: {
      container: "flex flex-wrap gap-1",
      item: "px-2 py-0.5 text-xs font-medium text-gray-800 bg-gray-100 rounded-xl transition-colors group-hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-200 dark:group-hover:bg-gray-600",
      more: "px-2 py-0.5 text-xs font-medium text-gray-600 bg-gray-100 rounded-xl transition-colors group-hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-400 dark:group-hover:bg-gray-600",
    },
  },
  footer: {
    container:
      "flex flex-wrap gap-2 pt-2 text-xs text-gray-500 dark:text-gray-400",
    item: "flex items-center gap-1",
  },
};
