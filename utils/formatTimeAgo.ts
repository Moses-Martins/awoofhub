export const formatTimeAgo = (dateString: string): string => {
  const date = new Date(dateString);

  if (isNaN(date.getTime())) return "";

  const now = new Date();
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  const MINUTE = 60;
  const HOUR = 3600;
  const DAY = 86400;
  const WEEK = 604800;
  const MONTH = 2592000; // ~30 days
  const YEAR = 31536000; // ~365 days

  if (seconds < 5) return "just now";

  if (seconds < MINUTE) {
    return `${seconds} sec ago`;
  }

  if (seconds < HOUR) {
    const mins = Math.floor(seconds / MINUTE);
    return `${mins} ${mins === 1 ? "min" : "mins"} ago`;
  }

  if (seconds < DAY) {
    const hrs = Math.floor(seconds / HOUR);
    return `${hrs} ${hrs === 1 ? "hr" : "hrs"} ago`;
  }

  if (seconds < WEEK) {
    const days = Math.floor(seconds / DAY);
    return `${days} ${days === 1 ? "day" : "days"} ago`;
  }

  if (seconds < MONTH) {
    const weeks = Math.floor(seconds / WEEK);
    return `${weeks} ${weeks === 1 ? "week" : "weeks"} ago`;
  }

  if (seconds < YEAR) {
    const months = Math.floor(seconds / MONTH);
    return `${months} ${months === 1 ? "month" : "months"} ago`;
  }

  const years = Math.floor(seconds / YEAR);
  return `${years} ${years === 1 ? "year" : "years"} ago`;
};