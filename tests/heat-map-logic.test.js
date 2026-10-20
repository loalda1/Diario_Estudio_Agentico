const test = require('node:test');
const assert = require('node:assert/strict');

const {
  buildHeatMap,
  formatLocalDate,
  getHeatMapStart,
  getIntensityLevel,
  isValidDateString,
} = require('../heat-map-logic.js');

function localDate(year, month, day) {
  return new Date(year, month - 1, day);
}

function findDay(weeks, date) {
  return weeks.flatMap(week => week.days).find(day => day.date === date);
}

test('builds twelve Monday-to-Sunday weeks with a fixed local today', () => {
  const today = localDate(2026, 10, 3);
  const weeks = buildHeatMap([], today);

  assert.equal(weeks.length, 12);
  assert.ok(weeks.every(week => week.days.length === 7));
  assert.equal(weeks[0].startDate, '2026-07-13');
  assert.equal(weeks.at(-1).days.at(-1).date, '2026-10-04');
  assert.equal(weeks.flatMap(week => week.days).length, 84);
  assert.equal(weeks[0].days[0].date, '2026-07-13');
  assert.equal(weeks[0].days[6].date, '2026-07-19');
});

test('handles a leap day while calculating the local period', () => {
  const today = localDate(2024, 3, 1);
  const start = getHeatMapStart(today);
  const weeks = buildHeatMap([], today);

  assert.equal(formatLocalDate(start), '2023-12-11');
  assert.ok(findDay(weeks, '2024-02-29'));
});

test('keeps future cells visible but empty and excludes their sessions', () => {
  const today = localDate(2026, 10, 3);
  const weeks = buildHeatMap([
    { date: '2026-10-04', topic: 'Future', minutes: 90 },
    { date: '2026-10-03', topic: 'Today', minutes: 20 },
  ], today);

  assert.deepEqual(findDay(weeks, '2026-10-04'), {
    date: '2026-10-04',
    minutes: 0,
    level: 'none',
    isFuture: true,
  });
  assert.equal(findDay(weeks, '2026-10-03').minutes, 20);
  assert.equal(findDay(weeks, '2026-10-03').isFuture, false);
});

test('sums multiple valid sessions into one daily total', () => {
  const weeks = buildHeatMap([
    { date: '2026-10-02', topic: 'A', minutes: 30 },
    { date: '2026-10-02', topic: 'B', minutes: 31 },
  ], localDate(2026, 10, 3));

  assert.deepEqual(findDay(weeks, '2026-10-02'), {
    date: '2026-10-02',
    minutes: 61,
    level: 'high',
    isFuture: false,
  });
});

test('uses the fixed inclusive intensity boundaries', () => {
  assert.equal(getIntensityLevel(0, false), 'none');
  assert.equal(getIntensityLevel(1, true), 'low');
  assert.equal(getIntensityLevel(30, true), 'low');
  assert.equal(getIntensityLevel(31, true), 'medium');
  assert.equal(getIntensityLevel(60, true), 'medium');
  assert.equal(getIntensityLevel(61, true), 'high');
  assert.equal(getIntensityLevel(120, true), 'high');
  assert.equal(getIntensityLevel(121, true), 'maximum');
});

test('ignores invalid records without mutating the input', () => {
  const sessions = [
    { date: '2026-02-30', topic: 'Impossible', minutes: 20 },
    { date: '2026-10-02', topic: 'Zero', minutes: 0 },
    { date: '2026-10-02', topic: 'Negative', minutes: -1 },
    { date: '2026-10-02', topic: 'Decimal', minutes: 1.5 },
    { date: '2026-10-02', topic: 'Text', minutes: '20' },
    { date: '2026-10-01', topic: 'Valid', minutes: 20 },
  ];
  const original = structuredClone(sessions);
  const weeks = buildHeatMap(sessions, localDate(2026, 10, 3));

  assert.equal(isValidDateString('2026-02-30'), false);
  assert.equal(findDay(weeks, '2026-10-02').minutes, 0);
  assert.equal(findDay(weeks, '2026-10-01').minutes, 20);
  assert.deepEqual(sessions, original);
});

test('ignores valid sessions outside the twelve-week period', () => {
  const weeks = buildHeatMap([
    { date: '2026-07-12', topic: 'Before', minutes: 100 },
    { date: '2026-07-13', topic: 'Start', minutes: 40 },
  ], localDate(2026, 10, 3));

  assert.equal(findDay(weeks, '2026-07-12'), undefined);
  assert.equal(findDay(weeks, '2026-07-13').minutes, 40);
});
