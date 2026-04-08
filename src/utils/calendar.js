import {
  addDays,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  isAfter,
  isBefore,
  isSameDay,
  isSameMonth,
  startOfMonth,
  startOfWeek,
} from "date-fns";

export function buildCalendarDays(currentMonth) {
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const gridStart = startOfWeek(monthStart, { weekStartsOn: 0 });
  const gridEnd = endOfWeek(monthEnd, { weekStartsOn: 0 });
  return eachDayOfInterval({ start: gridStart, end: gridEnd });
}

export function weekdayShortLabels() {
  const labels = [];
  let day = startOfWeek(new Date(), { weekStartsOn: 0 });
  for (let i = 0; i < 7; i += 1) {
    labels.push(format(day, "EEE"));
    day = addDays(day, 1);
  }
  return labels;
}

export function normalizeRange(start, end) {
  if (!start || !end) {
    return { rangeStart: start, rangeEnd: end };
  }
  if (isAfter(start, end)) {
    return { rangeStart: end, rangeEnd: start };
  }
  return { rangeStart: start, rangeEnd: end };
}

export function classifyDay(day, monthDate, start, end) {
  const inMonth = isSameMonth(day, monthDate);
  const isStart = Boolean(start) && isSameDay(day, start);
  const isEnd = Boolean(end) && isSameDay(day, end);

  let isInRange = false;
  if (start && end) {
    isInRange =
      (isAfter(day, start) || isSameDay(day, start)) &&
      (isBefore(day, end) || isSameDay(day, end));
  }

  return {
    inMonth,
    isStart,
    isEnd,
    isInRange,
  };
}
