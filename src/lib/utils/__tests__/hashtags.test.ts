import { describe, it, expect } from "vitest";
import { parseHashtags, formatHashtags } from "../hashtags";

describe("parseHashtags", () => {
  it("parses space-separated hashtags with # prefix", () => {
    expect(parseHashtags("#founder #startup #ai")).toEqual([
      "#founder",
      "#startup",
      "#ai",
    ]);
  });

  it("parses comma-separated tags without # prefix", () => {
    expect(parseHashtags("founder, startup, ai")).toEqual([
      "#founder",
      "#startup",
      "#ai",
    ]);
  });

  it("handles mixed formats", () => {
    expect(parseHashtags("#founder startup, #ai")).toEqual([
      "#founder",
      "#startup",
      "#ai",
    ]);
  });

  it("returns empty array for empty string", () => {
    expect(parseHashtags("")).toEqual([]);
  });

  it("returns empty array for whitespace-only string", () => {
    expect(parseHashtags("   ")).toEqual([]);
  });

  it("strips extra whitespace", () => {
    expect(parseHashtags("  #tag1   #tag2  ")).toEqual(["#tag1", "#tag2"]);
  });
});

describe("formatHashtags", () => {
  it("formats hashtags with # prefix", () => {
    expect(formatHashtags(["#founder", "#startup"])).toBe("#founder #startup");
  });

  it("adds # prefix if missing", () => {
    expect(formatHashtags(["founder", "startup"])).toBe("#founder #startup");
  });

  it("handles mixed prefixed and unprefixed", () => {
    expect(formatHashtags(["#founder", "startup"])).toBe("#founder #startup");
  });

  it("returns empty string for empty array", () => {
    expect(formatHashtags([])).toBe("");
  });
});
