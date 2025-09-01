import dayjs from "dayjs";
import { test, expect, beforeAll } from "vitest";
import { increaseDate } from "./App";
import isoWeek from "dayjs/plugin/isoWeek";

beforeAll(() => {
  dayjs.extend(isoWeek);
});

test("decreaseDate", () => {
  const testDate = dayjs("2025-08-29");
  const increasedDate = increaseDate(testDate);
  expect(increasedDate.isSame(dayjs("2025-08-30"))).toBe(true);
});

test("test week changes when increasing date on a sunday", () => {
  const testDate = dayjs("2018-01-21");
  const decreasedDate = increaseDate(testDate);
  expect(testDate.isoWeek()).toBeLessThan(decreasedDate.isoWeek());
});
