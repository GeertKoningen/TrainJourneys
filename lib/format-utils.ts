// journeyData stores dates as "DD-MM-YYYY" and times as "H:mm"

export function formatDateDisplay(date: Date): string {
  return new Intl.DateTimeFormat(undefined, {
    dateStyle: "short",
  }).format(date);
}

export function formatDateFilter(date: Date): string {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
}

export function formatTime(date: Date): string {
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  return `${hours}:${minutes}`;
}

export function formatDuration(from: Date, to: Date): string {
  const diffMs = to.getTime() - from.getTime();
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
  return `${diffHours ? diffHours + "h " : ""}${diffMinutes}m`;
}

export function createDate(date: string, time: string): Date {
  const [day, month, year] = date.split("-").map(Number);
  const [hours, minutes] = time.split(":").map(Number);
  return new Date(year, month - 1, day, hours, minutes);
}

export function formatPrice(value: number, currency: string): string {
  return new Intl.NumberFormat(undefined, {
    style: "currency",
    currency,
  }).format(value);
}
