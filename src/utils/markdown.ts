export const formatMarkdown = (text: string): string => {
  // Replace double asterisks with strong tags
  const formattedText = text.replace(
    /\*\*(.*?)\*\*/g,
    '<strong class="font-semibold text-slate-700 dark:text-slate-300">$1</strong>'
  );

  return formattedText;
};
