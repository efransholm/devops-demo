import dayjs from 'dayjs';
import { test, expect } from 'vitest';
import { decreaseDate } from './App';

test('decreaseDate', () => {
  const testDate = dayjs('2025-08-29');
  const decreasedDate = decreaseDate(testDate);
  expect(decreasedDate.isSame(dayjs('2025-08-28'))).toBe(true);
});
