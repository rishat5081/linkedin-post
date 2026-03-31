import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { PostPreview } from "../post-preview";
import type { PostFormData } from "@/types";

const baseData: PostFormData = {
  title: "Test Post Title",
  hook: "This is the hook that grabs attention",
  body: "This is the body text of the post with more details.",
  cta: "What do you think? Comment below!",
  hashtags: ["#testing", "#vitest", "#react"],
  image_urls: [],
  status: "draft",
  scheduled_for: null,
};

describe("PostPreview", () => {
  it("renders hook text", () => {
    render(<PostPreview data={baseData} />);
    expect(screen.getByText(baseData.hook)).toBeDefined();
  });

  it("renders body text", () => {
    render(<PostPreview data={baseData} />);
    expect(screen.getByText(baseData.body)).toBeDefined();
  });

  it("renders CTA text", () => {
    render(<PostPreview data={baseData} />);
    expect(screen.getByText(baseData.cta)).toBeDefined();
  });

  it("renders hashtags", () => {
    render(<PostPreview data={baseData} />);
    expect(screen.getByText("#testing #vitest #react")).toBeDefined();
  });

  it("renders status badge", () => {
    render(<PostPreview data={baseData} />);
    expect(screen.getByText("draft")).toBeDefined();
  });

  it("shows placeholder when no content", () => {
    const emptyData: PostFormData = {
      title: "",
      hook: "",
      body: "",
      cta: "",
      hashtags: [],
      image_urls: [],
      status: "draft",
      scheduled_for: null,
    };
    render(<PostPreview data={emptyData} />);
    expect(screen.getByText("Start writing to see a preview")).toBeDefined();
  });

  it("does not render CTA section when empty", () => {
    const noCta = { ...baseData, cta: "" };
    render(<PostPreview data={noCta} />);
    expect(screen.queryByText("Comment below!")).toBeNull();
  });

  it("does not render hashtags when empty", () => {
    const noTags = { ...baseData, hashtags: [] };
    render(<PostPreview data={noTags} />);
    expect(screen.queryByText("#testing")).toBeNull();
  });
});
