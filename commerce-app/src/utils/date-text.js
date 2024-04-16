export function dateText(dateStr) {
  // Convert to a JavaScript Date object
  const date = new Date(dateStr);

  // Convert to a readable string with 24-hour format
  const readable = new Intl.DateTimeFormat("en-US", {
    month: "long", // "March"
    day: "2-digit", // "27"
    year: "numeric", // "2024"
    hour: "2-digit", // "23" (for 11 PM)
    minute: "2-digit", // "52"
    hourCycle: 'h23', // Use 24-hour cycle
  }).format(date);

  return readable; // "March 27, 2024, 23:52"
}
