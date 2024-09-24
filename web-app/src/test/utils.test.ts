import { timeAsString } from "../lib/utils";

const second = 1000;
const minute = 60 * second;
const hour = 60 * minute;

test("test conversion", () => {
  const res = timeAsString(23 * second + 10 * minute + 5 * hour);
  expect(res).toBe("05:10:23");
});

test("test second overflow", () => {
  const res = timeAsString(61 * second);
  expect(res).toBe("00:01:01");
});

test("test minute overflow", () => {
  const res = timeAsString(61 * minute);
  expect(res).toBe("01:01:00");
});

test("test hour overflow", () => {
  const res = timeAsString(25 * hour);
  expect(res).toBe("25:00:00");
});
