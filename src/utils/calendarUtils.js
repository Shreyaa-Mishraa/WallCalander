export const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const DAY_NAMES = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export const MONTH_THEMES = {
  0: {
    palette: { primary: "#4A6080", secondary: "#C4D4E0", accent: "#E8EFF5", text: "#2A3A4F", mood: "Winter frost" },
    emoji: "❄️",
    gradient: "linear-gradient(135deg, #4A6080 0%, #6B89A0 50%, #8FAFC0 100%)",
    description: "Crisp winter mornings, quiet snowfall, new beginnings",
  },
  1: {
    palette: { primary: "#B5737A", secondary: "#E8C4C8", accent: "#F7EEF0", text: "#7A3A40", mood: "Tender warmth" },
    emoji: "🌸",
    gradient: "linear-gradient(135deg, #B5737A 0%, #C88A90 50%, #D9A5A8 100%)",
    description: "Love letters, candlelit evenings, the warmth of being known",
  },
  2: {
    palette: { primary: "#5C6B45", secondary: "#A8BC88", accent: "#EBF0E2", text: "#3A4A28", mood: "First bloom" },
    emoji: "🌱",
    gradient: "linear-gradient(135deg, #5C6B45 0%, #7A8F5F 50%, #96A878 100%)",
    description: "New growth, thawing ground, the world waking again",
  },
  3: {
    palette: { primary: "#6B7F6B", secondary: "#B2C4B2", accent: "#E8EFE8", text: "#3A4F3A", mood: "Gentle rain" },
    emoji: "🌧️",
    gradient: "linear-gradient(135deg, #6B7F6B 0%, #859985 50%, #9EB09E 100%)",
    description: "April showers, dancing leaves, petrichor on pavement",
  },
  4: {
    palette: { primary: "#C4922A", secondary: "#E8C97A", accent: "#FBF3E0", text: "#7A5510", mood: "Golden days" },
    emoji: "🌻",
    gradient: "linear-gradient(135deg, #C4922A 0%, #D4A840 50%, #E0BC60 100%)",
    description: "Golden afternoons, flowers in full bloom, warmth returned",
  },
  5: {
    palette: { primary: "#C1694F", secondary: "#E8A890", accent: "#FBF0EC", text: "#7A3020", mood: "Solstice glow" },
    emoji: "☀️",
    gradient: "linear-gradient(135deg, #C1694F 0%, #D07F65 50%, #DC9A80 100%)",
    description: "Longest days, summer solstice, everything alive",
  },
  6: {
    palette: { primary: "#B05A30", secondary: "#D89070", accent: "#F8EDE7", text: "#6A2A10", mood: "High summer" },
    emoji: "🏖️",
    gradient: "linear-gradient(135deg, #B05A30 0%, #C47050 50%, #D88870 100%)",
    description: "Heat shimmers, firefly evenings, the peak of summer",
  },
  7: {
    palette: { primary: "#7A6B45", secondary: "#BCA878", accent: "#F0EAD8", text: "#4A3B18", mood: "Late harvest" },
    emoji: "🌾",
    gradient: "linear-gradient(135deg, #7A6B45 0%, #948560 50%, #ACA07A 100%)",
    description: "Harvest time, golden fields, slow amber afternoons",
  },
  8: {
    palette: { primary: "#8B6914", secondary: "#C4A050", accent: "#F5EDD8", text: "#5A3D00", mood: "Autumn ember" },
    emoji: "🍂",
    gradient: "linear-gradient(135deg, #8B6914 0%, #A88030 50%, #C09A50 100%)",
    description: "Leaves turning, crisp air, the beauty of change",
  },
  9: {
    palette: { primary: "#8B3A2A", secondary: "#C47060", accent: "#F5E8E5", text: "#5A1A0A", mood: "Dark enchant" },
    emoji: "🎃",
    gradient: "linear-gradient(135deg, #8B3A2A 0%, #A85040 50%, #BC6858 100%)",
    description: "Harvest moon, misty mornings, magic in the air",
  },
  10: {
    palette: { primary: "#4A5A4A", secondary: "#8A9A8A", accent: "#E5EAE5", text: "#2A3A2A", mood: "Quiet grey" },
    emoji: "🍁",
    gradient: "linear-gradient(135deg, #4A5A4A 0%, #637063 50%, #7A8A7A 100%)",
    description: "Bare branches, woodsmoke, the quiet before winter",
  },
  11: {
    palette: { primary: "#2A4A6A", secondary: "#6A8AA0", accent: "#E0EBF2", text: "#0A2A4A", mood: "Velvet night" },
    emoji: "✨",
    gradient: "linear-gradient(135deg, #2A4A6A 0%, #3A5A7A 50%, #4A6A8A 100%)",
    description: "Candlelight, silent nights, the world holding its breath",
  },
};

export const HOLIDAYS = {
  "1-1": { name: "New Year's Day", emoji: "🎊" },
  "2-14": { name: "Valentine's Day", emoji: "❤️" },
  "3-17": { name: "St. Patrick's Day", emoji: "🍀" },
  "4-22": { name: "Earth Day", emoji: "🌍" },
  "5-1": { name: "May Day", emoji: "🌸" },
  "6-21": { name: "Summer Solstice", emoji: "☀️" },
  "7-4": { name: "Independence Day", emoji: "🎆" },
  "10-31": { name: "Halloween", emoji: "🎃" },
  "11-11": { name: "Veterans Day", emoji: "🎖️" },
  "12-25": { name: "Christmas Day", emoji: "🎄" },
  "12-31": { name: "New Year's Eve", emoji: "🥂" },
};

export function getDaysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate();
}

export function getFirstDayOfMonth(year, month) {
  return new Date(year, month, 1).getDay();
}

export function buildCalendarGrid(year, month) {
  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);
  const daysInPrevMonth = getDaysInMonth(year, month - 1);
  const cells = [];
  for (let i = firstDay - 1; i >= 0; i -= 1) {
    cells.push({ day: daysInPrevMonth - i, isCurrentMonth: false, isPrev: true });
  }
  for (let d = 1; d <= daysInMonth; d += 1) {
    cells.push({ day: d, isCurrentMonth: true });
  }
  const remaining = 42 - cells.length;
  for (let d = 1; d <= remaining; d += 1) {
    cells.push({ day: d, isCurrentMonth: false, isNext: true });
  }
  return cells;
}

export function isSameDay(d1, d2) {
  if (!d1 || !d2) return false;
  return d1.year === d2.year && d1.month === d2.month && d1.day === d2.day;
}

export function dateToNum(d) {
  return d.year * 10000 + d.month * 100 + d.day;
}

export function isInRange(date, start, end) {
  if (!start || !end || !date) return false;
  const d = dateToNum(date);
  const s = dateToNum(start);
  const e = dateToNum(end);
  return d > Math.min(s, e) && d < Math.max(s, e);
}

export function formatDateRange(start, end) {
  if (!start) return "";
  const startStr = `${MONTH_NAMES[start.month].slice(0, 3)} ${start.day}`;
  if (!end) return startStr;
  const endStr = `${MONTH_NAMES[end.month].slice(0, 3)} ${end.day}`;
  return `${startStr} - ${endStr}`;
}

export function daysBetween(start, end) {
  if (!start || !end) return 0;
  const s = new Date(start.year, start.month, start.day);
  const e = new Date(end.year, end.month, end.day);
  return Math.abs(Math.round((e - s) / (1000 * 60 * 60 * 24)));
}

export function isToday(date) {
  const today = new Date();
  return date.year === today.getFullYear() && date.month === today.getMonth() && date.day === today.getDate();
}

export function isWeekend(dayOfWeek) {
  return dayOfWeek === 0 || dayOfWeek === 6;
}

export function getHoliday(month, day) {
  const key = `${month + 1}-${day}`;
  return HOLIDAYS[key] || null;
}
