function formatLocalDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function isValidDateString(dateString) {
  if (typeof dateString !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(dateString)) return false;

  const [year, month, day] = dateString.split('-').map(Number);
  const date = new Date(year, month - 1, day);
  return date.getFullYear() === year
    && date.getMonth() === month - 1
    && date.getDate() === day;
}

function getMondayOfWeek(today) {
  const monday = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const daysSinceMonday = monday.getDay() === 0 ? 6 : monday.getDay() - 1;
  monday.setDate(monday.getDate() - daysSinceMonday);
  return monday;
}

function getHeatMapStart(today) {
  const start = getMondayOfWeek(today);
  start.setDate(start.getDate() - 77);
  return start;
}

function isFutureDate(dateString, today) {
  return dateString > formatLocalDate(today);
}

function isValidSession(session) {
  return session
    && isValidDateString(session.date)
    && typeof session.minutes === 'number'
    && Number.isInteger(session.minutes)
    && session.minutes > 0;
}

function sumValidMinutesByDate(sessions) {
  const minutesByDate = {};

  for (const session of sessions) {
    if (!isValidSession(session)) continue;
    minutesByDate[session.date] = (minutesByDate[session.date] || 0) + session.minutes;
  }

  return minutesByDate;
}

function getIntensityLevel(totalMinutes, hasSessions) {
  if (!hasSessions) return 'none';
  if (totalMinutes <= 30) return 'low';
  if (totalMinutes <= 60) return 'medium';
  if (totalMinutes <= 120) return 'high';
  return 'maximum';
}

function buildHeatMap(sessions, today) {
  const todayString = formatLocalDate(today);
  const start = getHeatMapStart(today);
  const startString = formatLocalDate(start);
  const minutesByDate = sumValidMinutesByDate(sessions);
  const weeks = [];

  for (let weekIndex = 0; weekIndex < 12; weekIndex++) {
    const days = [];

    for (let dayIndex = 0; dayIndex < 7; dayIndex++) {
      const date = new Date(start.getFullYear(), start.getMonth(), start.getDate());
      date.setDate(date.getDate() + weekIndex * 7 + dayIndex);
      const dateString = formatLocalDate(date);
      const isFuture = dateString > todayString;
      const isInPeriod = dateString >= startString;
      const hasSessions = !isFuture
        && isInPeriod
        && Object.prototype.hasOwnProperty.call(minutesByDate, dateString);
      const minutes = hasSessions ? minutesByDate[dateString] : 0;

      days.push({
        date: dateString,
        minutes,
        level: getIntensityLevel(minutes, hasSessions),
        isFuture,
      });
    }

    weeks.push({
      startDate: days[0].date,
      days,
    });
  }

  return weeks;
}

const heatMapLogic = {
  buildHeatMap,
  formatLocalDate,
  getHeatMapStart,
  getIntensityLevel,
  isFutureDate,
  isValidDateString,
  sumValidMinutesByDate,
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = heatMapLogic;
} else {
  globalThis.HeatMapLogic = heatMapLogic;
}
