export type DateTimeInputValue = {
  year: string; // 2025
  month: string; // 12
  day: string; // 01
  hour: string; // 07
  minute: string; // 30
  second: string; // 00
};

export function currentUnixTime(isInMs: boolean): number {
  const current = new Date().getTime();

  return isInMs ? current : Math.round(current / 1000);
}

// convert unix timestamp in MS to JS date
export function convertUnixMsToDate(unixTimeMS: number): Date {
  return new Date(unixTimeMS);
}

export function readableDateTime(d: Date, timeZone?: string): string {
  return new Intl.DateTimeFormat(undefined, {
    dateStyle: "medium",
    timeStyle: "medium",
    timeZone,
  }).format(d);
}

export function toLocalIsoString(date = new Date()) {
  const tzOffsetMinutes = date.getTimezoneOffset(); // minutes *behind* UTC (e.g. 420 for UTC-7)
  const localMs = date.getTime() - tzOffsetMinutes * 60_000;
  const localDate = new Date(localMs);

  const sign = tzOffsetMinutes > 0 ? "-" : "+"; // positive offset => west of UTC (e.g. -07:00)
  const abs = Math.abs(tzOffsetMinutes);
  const hours = String(Math.floor(abs / 60)).padStart(2, "0");
  const minutes = String(abs % 60).padStart(2, "0");

  // Drop the trailing "Z" and replace with the proper offset
  return localDate.toISOString().replace("Z", `${sign}${hours}:${minutes}`);
}

export function getClientUtcOffsetString() {
  const offset = -new Date().getTimezoneOffset(); // minutes from UTC
  const sign = offset >= 0 ? "+" : "-";
  const abs = Math.abs(offset);
  const hours = String(Math.floor(abs / 60)).padStart(2, "0");
  const minutes = String(abs % 60).padStart(2, "0");
  return `${sign}${hours}:${minutes}`;
}

export const getCurrentDateTimeString = (
  datetime?: string
): DateTimeInputValue => {
  const now = datetime ? new Date(datetime) : new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1; // convert 0–11 to 1–12
  const day = now.getDate();

  const hour = now.getHours();
  const minute = now.getMinutes();
  const second = now.getSeconds();
  return {
    year: addPaddedZero(year.toString()),
    month: addPaddedZero(month.toString()),
    day: addPaddedZero(day.toString()),
    hour: addPaddedZero(hour.toString()),
    minute: addPaddedZero(minute.toString()),
    second: addPaddedZero(second.toString()),
  };
};

export function addPaddedZero(v: string): string {
  if (!v) return "";

  if (v.length > 1) return v;

  return `0${v}`;
}
