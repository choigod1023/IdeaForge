export const projectPageStyles = {
  container: "max-w-3xl mx-auto",
  detail: {
    container: "max-w-4xl p-4 mx-auto",
  },
  error: {
    container:
      "p-4 mb-4 text-red-700 bg-red-100 rounded-lg dark:bg-red-900/30 dark:text-red-400",
  },
  list: {
    container: "p-4 mx-auto space-y-8 max-w-7xl",
    header: {
      container: "flex items-center justify-between",
      title: "text-2xl font-bold text-gray-900 dark:text-gray-100",
      createButton:
        "inline-flex items-center px-4 py-2 text-sm font-medium text-white transition-colors bg-gradient-to-r from-indigo-600 to-indigo-500 rounded-xl hover:from-indigo-700 hover:to-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:from-indigo-500 dark:to-indigo-400 dark:hover:from-indigo-600 dark:hover:to-indigo-500 dark:focus:ring-offset-gray-800",
    },
    grid: "grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3",
    empty: {
      container: "p-8 text-center bg-white rounded-2xl dark:bg-gray-800",
      text: "text-gray-600 dark:text-gray-400",
      button:
        "inline-flex items-center px-4 py-2 mt-4 text-sm font-medium text-white transition-colors bg-gradient-to-r from-indigo-600 to-indigo-500 rounded-xl hover:from-indigo-700 hover:to-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:from-indigo-500 dark:to-indigo-400 dark:hover:from-indigo-600 dark:hover:to-indigo-500 dark:focus:ring-offset-gray-800",
    },
    error: {
      container: "p-8 text-center bg-red-50 rounded-2xl dark:bg-red-900/30",
      text: "text-red-600 dark:text-red-400",
      retryButton:
        "inline-flex items-center px-4 py-2 mt-4 text-sm font-medium text-white transition-colors bg-red-600 rounded-xl hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-offset-gray-800",
    },
  },
};

export const projectListStyles = {
  container: "container mx-auto px-4 py-8",
  grid: "grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3",
  list: {
    header: {
      container: "flex items-center justify-between mb-8",
      title: "text-2xl font-bold text-gray-900 dark:text-white",
      createButton:
        "flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:bg-blue-500 dark:hover:bg-blue-600",
    },
  },
  empty: {
    container: "flex flex-col items-center justify-center py-12 text-center",
    title: "text-xl font-semibold text-gray-900 dark:text-white mb-2",
    description: "text-gray-600 dark:text-gray-400 mb-6",
    button:
      "inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:bg-blue-500 dark:hover:bg-blue-600",
  },
} as const;
