import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Badge } from "../badge";

describe("Badge", () => {
  it("renders the status text", () => {
    render(<Badge status="draft" />);
    expect(screen.getByText("draft")).toBeDefined();
  });

  it("renders published status", () => {
    render(<Badge status="published" />);
    expect(screen.getByText("published")).toBeDefined();
  });

  it("renders scheduled status", () => {
    render(<Badge status="scheduled" />);
    expect(screen.getByText("scheduled")).toBeDefined();
  });

  it("applies correct color classes for draft", () => {
    const { container } = render(<Badge status="draft" />);
    const badge = container.firstChild as HTMLElement;
    expect(badge.className).toContain("bg-zinc-100");
  });

  it("applies correct color classes for published", () => {
    const { container } = render(<Badge status="published" />);
    const badge = container.firstChild as HTMLElement;
    expect(badge.className).toContain("bg-emerald-50");
  });

  it("applies correct color classes for scheduled", () => {
    const { container } = render(<Badge status="scheduled" />);
    const badge = container.firstChild as HTMLElement;
    expect(badge.className).toContain("bg-amber-50");
  });
});
