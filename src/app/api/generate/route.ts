import Anthropic from "@anthropic-ai/sdk";
import { NextRequest, NextResponse } from "next/server";

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY!,
});

const TOPIC_CATEGORIES = [
  "Hiring and recruiting — what's broken and how to fix it",
  "Founder lessons — hard truths from building a company",
  "Leadership — managing teams, giving feedback, making decisions",
  "Career growth — promotions, job switches, skill stacking",
  "Remote vs in-office work — the real tradeoffs",
  "Product management — shipping, prioritization, user research",
  "Engineering culture — code reviews, tech debt, developer experience",
  "Personal branding — building an audience, writing online",
  "Design and UX — taste, simplicity, user-centered thinking",
  "Sales and revenue — closing deals, pricing, customer conversations",
  "AI and automation in the workplace — practical use cases, not hype",
  "Startup mistakes — failures, pivots, lessons learned",
  "Productivity and focus — deep work, saying no, time management",
  "Open source and developer tools — building in public",
  "Mental health at work — burnout, boundaries, sustainability",
  "Finance and fundraising — bootstrapping vs raising, runway, investor relations",
  "Marketing — content strategy, growth loops, brand building",
  "Company culture — values, rituals, what actually works",
  "Public speaking and communication — presentations, storytelling",
  "Side projects and indie hacking — building outside your day job",
];

function pickRandomTopic(): string {
  const index = Math.floor(Math.random() * TOPIC_CATEGORIES.length);
  return TOPIC_CATEGORIES[index];
}

const SYSTEM_PROMPT = `You are a world-class LinkedIn ghostwriter.

Your writing style:
- Hook in the first 1-2 lines that stops the scroll
- Short paragraphs (1-3 lines max)
- Use → bullets and line breaks for scanability
- Personal, first-person, conversational tone — never corporate
- End with a specific, easy-to-answer call to action
- Include 3-5 relevant hashtags

IMPORTANT: Write about the EXACT topic you are given. Do NOT default to AI or tech topics unless that is the assigned topic.

You MUST respond with ONLY valid JSON (no markdown, no backticks, no explanation) in this exact format:
{"title":"A short internal title","hook":"The first 1-2 attention-grabbing lines","body":"The main body (use \\n for line breaks)","cta":"A closing question or call to action","hashtags":["#tag1","#tag2","#tag3"],"trending_topic":"The specific topic this post is about","image_keyword":"A single English keyword for a stock photo (e.g. leadership, coding, teamwork, startup, meeting, presentation)"}`;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const customTopic = body?.topic as string | undefined;

    const topic = customTopic || pickRandomTopic();

    const userPrompt = `Write an engaging LinkedIn post about this topic: ${topic}

Give a fresh, original, specific perspective. Use a real-sounding anecdote or example. Make it feel personal and authentic — not generic advice.`;

    const message = await client.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1024,
      messages: [{ role: "user", content: userPrompt }],
      system: SYSTEM_PROMPT,
    });

    const textBlock = message.content.find((block) => block.type === "text");
    if (!textBlock || textBlock.type !== "text") {
      return NextResponse.json(
        { error: "No text response from Claude" },
        { status: 500 }
      );
    }

    const raw = textBlock.text
      .replace(/^```(?:json)?\s*/i, "")
      .replace(/\s*```$/i, "")
      .trim();
    const parsed = JSON.parse(raw);

    // Attach a stock image seeded by the topic
    const seed = (parsed.image_keyword || parsed.trending_topic || "post")
      .replace(/\s+/g, "")
      .slice(0, 20);
    const hash = Array.from(seed).reduce((acc, c) => acc + c.charCodeAt(0), 0) + Math.floor(Math.random() * 500);
    parsed.image_url = `https://picsum.photos/seed/${hash}/800/450`;

    return NextResponse.json(parsed);
  } catch (error) {
    console.error("Generation error:", error);
    return NextResponse.json(
      { error: "Failed to generate post" },
      { status: 500 }
    );
  }
}
