const STORAGE_KEY = 'diario-estudio-sesiones';
const form = document.querySelector('#sessionForm');
const dateInput = document.querySelector('#date');
const topicInput = document.querySelector('#topic');
const minutesInput = document.querySelector('#minutes');
const list = document.querySelector('#sessionList');
const feedback = document.querySelector('#formFeedback');
const heatMap = document.querySelector('#heatMap');

function localDate(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function readSessions() {
  try {
    const sessions = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return Array.isArray(sessions) ? sessions : [];
  } catch {
    return [];
  }
}

function saveSessions(sessions) { localStorage.setItem(STORAGE_KEY, JSON.stringify(sessions)); }

function formatDate(dateString) {
  const [year, month, day] = dateString.split('-').map(Number);
  return new Date(year, month - 1, day).toLocaleDateString('es-ES', { day: 'numeric', month: 'short' }).replace('.', '');
}

function calculateStreak(sessions) {
  const days = new Set(sessions.map(session => session.date));
  const today = new Date();
  let cursor = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  if (!days.has(localDate(cursor))) cursor.setDate(cursor.getDate() - 1);
  if (!days.has(localDate(cursor))) return 0;
  let streak = 0;
  while (days.has(localDate(cursor))) { streak++; cursor.setDate(cursor.getDate() - 1); }
  return streak;
}

function isValidDateString(dateString) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(dateString)) return false;
  const [year, month, day] = dateString.split('-').map(Number);
  const date = new Date(year, month - 1, day);
  return date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day;
}

function isNextLocalDay(previousDateString, currentDateString) {
  const [year, month, day] = previousDateString.split('-').map(Number);
  const nextDate = new Date(year, month - 1, day);
  nextDate.setDate(nextDate.getDate() + 1);
  return localDate(nextDate) === currentDateString;
}

function calculateBestStreak(sessions) {
  const today = localDate();
  const days = [...new Set(sessions
    .map(session => session.date)
    .filter(date => isValidDateString(date) && date <= today))].sort();
  let best = 0;
  let current = 0;
  let previousDate = null;

  days.forEach(date => {
    current = previousDate && isNextLocalDay(previousDate, date) ? current + 1 : 1;
    best = Math.max(best, current);
    previousDate = date;
  });

  return best;
}

function calculateWeeklyMinutes(sessions) {
  const today = new Date();
  const dayOfWeek = today.getDay();
  const daysSinceMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
  const monday = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  monday.setDate(monday.getDate() - daysSinceMonday);

  const startDate = localDate(monday);
  const endDate = localDate(today);

  return sessions
    .filter(session => isValidDateString(session.date) && session.date >= startDate && session.date <= endDate)
    .reduce((total, session) => {
      const minutes = Number(session.minutes);
      return Number.isFinite(minutes) && minutes > 0 ? total + minutes : total;
    }, 0);
}

function calculateMonthlyStudyDays(sessions) {
  const today = localDate();
  const currentMonth = today.slice(0, 7);
  return new Set(sessions
    .map(session => session.date)
    .filter(date => isValidDateString(date) && date.startsWith(currentMonth) && date <= today)).size;
}

function renderStreak(sessions) {
  const streak = calculateStreak(sessions);
  const bestStreak = calculateBestStreak(sessions);
  const weeklyMinutes = calculateWeeklyMinutes(sessions);
  const monthlyDays = calculateMonthlyStudyDays(sessions);
  document.querySelector('#streakNumber').textContent = streak;
  document.querySelector('#streakWord').textContent = streak === 1 ? 'día' : 'días';
  document.querySelector('#streakMessage').textContent = streak ? (streak === 1 ? '¡Buen comienzo!' : 'Sigue así, vas genial') : 'Empieza hoy';
  document.querySelector('#bestStreakNumber').textContent = bestStreak;
  document.querySelector('#bestStreakWord').textContent = bestStreak === 1 ? 'día' : 'días';
  document.querySelector('#weeklyMinutesNumber').textContent = weeklyMinutes.toLocaleString('es-ES');
  document.querySelector('#monthlyDaysNumber').textContent = monthlyDays;
}

function formatHeatMapDate(dateString, options) {
  const [year, month, day] = dateString.split('-').map(Number);
  return new Date(year, month - 1, day).toLocaleDateString('es-ES', options);
}

function getHeatMapDayLabel(day) {
  const date = formatHeatMapDate(day.date, {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
  if (day.isFuture) return `${date}: día futuro`;
  const minuteWord = day.minutes === 1 ? 'minuto' : 'minutos';
  return `${date}: ${day.minutes} ${minuteWord}`;
}

function renderHeatMap(sessions) {
  if (!heatMap || !window.HeatMapLogic) return;

  const weeks = window.HeatMapLogic.buildHeatMap(sessions, new Date());
  heatMap.innerHTML = weeks.map(week => {
    const weekLabel = formatHeatMapDate(week.startDate, { day: 'numeric', month: 'short' }).replace('.', '');
    const accessibleWeekLabel = `Semana del ${formatHeatMapDate(week.startDate, {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    })}`;
    const cells = week.days.map(day => {
      const futureClass = day.isFuture ? ' is-future' : '';
      return `<div class="heatmap-day level-${day.level}${futureClass}" role="gridcell" aria-disabled="${day.isFuture}" aria-label="${getHeatMapDayLabel(day)}"></div>`;
    }).join('');
    return `<div class="heatmap-week" role="row" aria-label="${accessibleWeekLabel}"><span class="heatmap-week-label" aria-hidden="true">${weekLabel}</span>${cells}</div>`;
  }).join('');
}

function renderSessions() {
  const sessions = readSessions()
    .filter(session => session && typeof session === 'object')
    .sort((a, b) => String(b.date || '').localeCompare(String(a.date || '')) || (b.createdAt || 0) - (a.createdAt || 0));
  document.querySelector('#sessionCount').textContent = `${sessions.length} ${sessions.length === 1 ? 'sesión' : 'sesiones'}`;
  renderStreak(sessions);
  renderHeatMap(sessions);
  if (!sessions.length) {
    list.innerHTML = '<div class="empty-state"><span>✦</span><div>Aún no hay sesiones.<br>Tu primer paso empieza aquí.</div></div>';
    return;
  }
  list.innerHTML = sessions.map(session => {
    const [year, month, day] = session.date.split('-').map(Number);
    const date = new Date(year, month - 1, day);
    const weekday = date.toLocaleDateString('es-ES', { weekday: 'short' }).replace('.', '');
    return `<article class="session-item"><div class="session-date"><strong>${day}</strong><span>${weekday}</span></div><div class="session-info"><div class="session-topic">${escapeHtml(session.topic)}</div><div class="session-when">${formatDate(session.date)}</div></div><div class="session-minutes">${session.minutes} min</div></article>`;
  }).join('');
}

function escapeHtml(value) { const node = document.createElement('div'); node.textContent = value; return node.innerHTML; }

dateInput.value = localDate();
document.querySelector('#todayLabel').textContent = new Date().toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long' });

form.addEventListener('submit', event => {
  event.preventDefault();
  const topic = topicInput.value.trim();
  const minutes = Number(minutesInput.value);
  if (!dateInput.value || !topic || !Number.isInteger(minutes) || minutes < 1) {
    feedback.textContent = 'Completa todos los campos con datos válidos.';
    return;
  }
  const sessions = readSessions();
  sessions.push({ date: dateInput.value, topic, minutes, createdAt: Date.now() });
  saveSessions(sessions);
  form.reset();
  dateInput.value = localDate();
  feedback.textContent = 'Sesión guardada. ¡Buen trabajo!';
  renderSessions();
  setTimeout(() => { feedback.textContent = ''; }, 3000);
});

renderSessions();
