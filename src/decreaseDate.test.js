import dayjs from "dayjs";
import { test, expect, beforeAll } from "vitest";
import { decreaseDate } from "./App";
import isoWeek from "dayjs/plugin/isoWeek";

beforeAll(() => {
  dayjs.extend(isoWeek);
});

test("test decreasing date", () => {
  const testDate = dayjs("2025-08-29");
  const decreasedDate = decreaseDate(testDate);
  expect(decreasedDate.isSame(dayjs("2025-08-28"))).toBe(true);
});

test("test week changes when decreasing date on a monday", () => {
  const testDate = dayjs("2018-01-01");
  const decreasedDate = decreaseDate(testDate);
  expect(testDate.isoWeek()).toBeLessThan(decreasedDate.isoWeek());
});
