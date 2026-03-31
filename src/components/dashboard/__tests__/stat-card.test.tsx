import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { StatCard } from "../stat-card";

describe("StatCard", () => {
  it("renders the label", () => {
    render(
      <StatCard
        label="Total Posts"
        value={42}
        icon={<span data-testid="icon">icon</span>}
      />
    );
    expect(screen.getByText("Total Posts")).toBeDefined();
  });

  it("renders the value", () => {
    render(
      <StatCard
        label="Drafts"
        value={7}
        icon={<span>icon</span>}
      />
    );
    expect(screen.getByText("7")).toBeDefined();
  });

  it("renders the icon", () => {
    render(
      <StatCard
        label="Published"
        value={15}
        icon={<span data-testid="stat-icon">icon</span>}
      />
    );
    expect(screen.getByTestId("stat-icon")).toBeDefined();
  });

  it("renders zero value", () => {
    render(
      <StatCard
        label="Scheduled"
        value={0}
        icon={<span>icon</span>}
      />
    );
    expect(screen.getByText("0")).toBeDefined();
  });
});
