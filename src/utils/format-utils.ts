export function formatFileNameTitle(fileName: string): string {
  // If the input is a URL or path, extract just the filename
  const fileNameOnly = fileName.split(/[\\/]/).pop() || fileName;

  // Remove file extension
  const withoutExtension = fileNameOnly.replace(/\.[^/.]+$/, "");

  // Handle auto-generated filenames or UUIDs (like in your example)
  if (/^[a-zA-Z0-9]{20,}$/.test(withoutExtension)) {
    // This looks like a generated ID, not a meaningful name
    return "Document Summary";
  }

  // Remove parenthetical content like "(7)" or "(copy)"
  const withoutParentheses = withoutExtension.replace(/\s*\([^)]*\)\s*/g, " ");

  // Replace dashes, underscores and multiple spaces with single spaces
  const withSpaces = withoutParentheses
    .replace(/[-_]+/g, " ") // Convert "-" and "_" to spaces
    .replace(/([a-z])([A-Z])/g, "$1 $2") // Add space between camelCase words
    .replace(/\s+/g, " "); // Replace multiple spaces with single space

  // Convert to title case (capitalize first letter of each word)
  const titleCase = withSpaces
    .split(" ")
    .map((word) => {
      if (!word) return "";
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    })
    .join(" ")
    .trim();

  return titleCase || "Document Summary"; // Fallback if we end up with an empty string
}