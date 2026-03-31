import { describe, it, expect, vi } from "vitest";
import { formatDate, formatDateTime, timeAgo, toDateTimeLocal } from "../dates";

describe("formatDate", () => {
  it("formats a valid date string", () => {
    const result = formatDate("2026-03-28T09:00:00Z");
    expect(result).toContain("Mar");
    expect(result).toContain("28");
    expect(result).toContain("2026");
  });

  it("returns dash for null", () => {
    expect(formatDate(null)).toBe("—");
  });
});

describe("formatDateTime", () => {
  it("formats a valid date with time", () => {
    const result = formatDateTime("2026-03-28T09:00:00Z");
    expect(result).toContain("Mar");
    expect(result).toContain("28");
    expect(result).toContain("2026");
  });

  it("returns dash for null", () => {
    expect(formatDateTime(null)).toBe("—");
  });
});

describe("timeAgo", () => {
  it('returns "just now" for very recent dates', () => {
    const now = new Date().toISOString();
    expect(timeAgo(now)).toBe("just now");
  });

  it("returns minutes ago", () => {
    const fiveMinAgo = new Date(Date.now() - 5 * 60 * 1000).toISOString();
    expect(timeAgo(fiveMinAgo)).toBe("5 minutes ago");
  });

  it("returns hours ago", () => {
    const twoHoursAgo = new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString();
    expect(timeAgo(twoHoursAgo)).toBe("2 hours ago");
  });

  it("returns singular form for 1 unit", () => {
    const oneHourAgo = new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString();
    expect(timeAgo(oneHourAgo)).toBe("1 hour ago");
  });

  it("returns days ago", () => {
    const threeDaysAgo = new Date(
      Date.now() - 3 * 24 * 60 * 60 * 1000
    ).toISOString();
    expect(timeAgo(threeDaysAgo)).toBe("3 days ago");
  });
});

describe("toDateTimeLocal", () => {
  it("converts ISO string to datetime-local format", () => {
    const result = toDateTimeLocal("2026-04-01T08:00:00Z");
    expect(result).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/);
  });

  it("returns empty string for null", () => {
    expect(toDateTimeLocal(null)).toBe("");
  });
});
