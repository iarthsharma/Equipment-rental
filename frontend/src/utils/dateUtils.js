// src/utils/dateUtils.js

/**
 * Formats a Date object or ISO string to YYYY-MM-DD.
 * @param {Date|string} date
 * @returns {string}
 */
export function formatDate(date) {
  const d = date instanceof Date ? date : new Date(date);
  return d.toISOString().split("T")[0];
}

/**
 * Returns the number of days between two dates (inclusive).
 * @param {string|Date} start
 * @param {string|Date} end
 * @returns {number}
 */
export function getDaysBetween(start, end) {
  const startDate = new Date(formatDate(start));
  const endDate = new Date(formatDate(end));
  const diffTime = endDate - startDate;
  return Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1;
}

/**
 * Checks if a date string (YYYY-MM-DD) is in the past.
 * @param {string|Date} date
 * @returns {boolean}
 */
export function isPastDate(date) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const d = new Date(formatDate(date));
  return d < today;
}

/**
 * Generates an array of date strings (YYYY-MM-DD) between two dates (inclusive).
 * @param {string|Date} start
 * @param {string|Date} end
 * @returns {string[]}
 */
export function getDateRange(start, end) {
  const startDate = new Date(formatDate(start));
  const endDate = new Date(formatDate(end));
  const dates = [];
  let current = new Date(startDate);
  while (current <= endDate) {
    dates.push(formatDate(current));
    current.setDate(current.getDate() + 1);
  }
  return dates;
}

/**
 * Returns today's date as YYYY-MM-DD.
 * @returns {string}
 */
export function getToday() {
  return formatDate(new Date());
}
