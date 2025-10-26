// utils/date.ts

/** Returns the current local datetime in 'datetime-local' format */
export function getLocalDateTime(): string {
  const now = new Date();
  const YYYY = now.getFullYear();
  const MM = String(now.getMonth() + 1).padStart(2, '0');
  const DD = String(now.getDate()).padStart(2, '0');
  const HH = String(now.getHours()).padStart(2, '0');
  const mm = String(now.getMinutes()).padStart(2, '0');
  return `${YYYY}-${MM}-${DD}T${HH}:${mm}`;
}
