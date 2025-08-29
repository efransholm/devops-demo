import dayjs from 'dayjs';
import { test, expect } from 'vitest';
import { increaseDate } from './App';

test('decreaseDate', () => {
  const testDate = dayjs('2025-08-29');
  const increasedDate = increaseDate(testDate);
  expect(increasedDate.isSame(dayjs('2025-08-30'))).toBe(true);
});
