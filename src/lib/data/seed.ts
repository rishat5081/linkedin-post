import type { Post } from "@/types";

/**
 * Sample LinkedIn posts for development and seeding.
 * Covers varied statuses and realistic content themes.
 */
export const seedPosts: Omit<Post, "id" | "created_at" | "updated_at">[] = [
  {
    title: "The One Habit That Changed My Startup",
    hook: "I used to start every morning checking Slack. Then I stopped. Here's what happened →",
    body: `For 2 years I let notifications run my day. Every ping was "urgent." Every thread needed my input.

Then I tried something radical: 90 minutes of deep work before opening any app.

The first week was brutal. FOMO was real. But by week three, I'd shipped more than the entire previous month.

The secret wasn't productivity hacks. It was protecting my creative energy when it was at its peak.

Your mornings belong to your most important work, not someone else's inbox.`,
    cta: "What's your morning non-negotiable? Drop it below 👇",
    hashtags: ["#founders", "#deepwork", "#productivity", "#startups"],
    image_urls: [],
    status: "published",
    scheduled_for: null,
    published_at: "2026-03-28T09:00:00Z",
  },
  {
    title: "Why We Rewrote Our Backend in 6 Weeks",
    hook: "Our API was returning 500s every day. We had two options: patch or rebuild. We chose the scary one.",
    body: `Technical debt doesn't announce itself. It accumulates silently until one day your on-call rotation becomes a full-time job.

Here's what we did:
1. Mapped every endpoint and its actual usage
2. Cut 40% of endpoints nobody called
3. Migrated from REST to a hybrid REST + event-driven architecture
4. Wrote integration tests before touching a single line

Result: 99.97% uptime for 90 consecutive days.

The lesson? Sometimes the fastest path forward is to stop, assess, and rebuild with intention.`,
    cta: "Have you ever done a major rewrite? Was it worth it?",
    hashtags: ["#engineering", "#backend", "#techdebt", "#startup"],
    image_urls: [],
    status: "published",
    scheduled_for: null,
    published_at: "2026-03-25T14:00:00Z",
  },
  {
    title: "Design Is Not Decoration",
    hook: "A beautiful button that no one clicks is just a painting. Design is about outcomes, not aesthetics.",
    body: `I've reviewed hundreds of product designs this year. The best ones share one trait: restraint.

Great product design:
→ Removes friction, doesn't add polish
→ Guides decisions, doesn't overwhelm with options
→ Feels invisible when it works perfectly

The best designers I work with start with the user's job-to-be-done, not a mood board.

Aesthetic quality matters. But it's a multiplier, not the foundation. Function first, then form.`,
    cta: "What's one product whose design you genuinely admire? Let me know ↓",
    hashtags: ["#design", "#productdesign", "#ux", "#buildinpublic"],
    image_urls: [],
    status: "published",
    scheduled_for: null,
    published_at: "2026-03-22T10:30:00Z",
  },
  {
    title: "AI Won't Replace You. But Someone Using AI Will.",
    hook: "I automated 3 hours of my daily workflow last week. Not with a new hire—with a prompt.",
    body: `Here's what I automated:
• Meeting summaries → AI generates action items in Slack
• Code review triage → AI flags high-risk changes first
• Weekly reporting → AI drafts from our metrics dashboard

Total time saved: ~15 hours/week across the team.

This isn't about replacing people. It's about removing the repetitive work so talented people can focus on judgment calls, creativity, and strategy.

The teams that embrace AI as a tool (not a threat) will compound their advantage every single quarter.`,
    cta: "What's one task you wish AI could handle for you today?",
    hashtags: ["#AI", "#automation", "#futureofwork", "#productivity"],
    image_urls: [],
    status: "scheduled",
    scheduled_for: "2026-04-01T08:00:00Z",
    published_at: null,
  },
  {
    title: "Stop Shipping Features. Start Shipping Outcomes.",
    hook: "We shipped 47 features last quarter. Usage went down. Here's what we learned the hard way.",
    body: `More features ≠ more value. We learned this after watching our NPS drop while our changelog grew.

The problem: we were building what users asked for, not what they needed.

The fix:
1. Replaced feature requests with outcome interviews
2. Created a "one metric that matters" for each initiative
3. Killed 12 features that had < 5% weekly usage

Within 8 weeks, activation rate jumped 23%.

Ship less. Measure more. Listen deeper.`,
    cta: "What feature did you build that nobody used? No judgment—we've all been there.",
    hashtags: ["#product", "#startups", "#productmanagement", "#growth"],
    image_urls: [],
    status: "scheduled",
    scheduled_for: "2026-04-03T12:00:00Z",
    published_at: null,
  },
  {
    title: "Your Personal Brand Is a Compound Asset",
    hook: "Two years ago I had 200 LinkedIn connections. Today: 28,000+ and it changed my career trajectory.",
    body: `Here's what I wish someone told me earlier about building a personal brand:

1. Consistency beats virality. I posted 3x/week for 18 months before anything "took off."
2. Share your real work. Behind-the-scenes content outperforms polished advice.
3. Engage before you broadcast. I spent 30 min/day commenting before I wrote my first post.
4. Your niche finds you. I thought I'd write about marketing. Turns out, people wanted my founder stories.

The best part? Opportunities come to you. Investors, hires, partners—all from content.

Personal brand is the highest-ROI investment a founder can make.`,
    cta: "If you're starting from zero, what's holding you back from posting? Be honest.",
    hashtags: ["#personalbrand", "#linkedin", "#contentcreation", "#founders"],
    image_urls: [],
    status: "draft",
    scheduled_for: null,
    published_at: null,
  },
  {
    title: "The 5-Minute Code Review That Saves Hours",
    hook: "Our PR review time dropped from 2 days to 4 hours. The change was embarrassingly simple.",
    body: `We added a PR template with 5 questions:

1. What does this change?
2. Why is it needed?
3. What's the test plan?
4. What could go wrong?
5. Screenshot/recording (if UI)

That's it. No fancy tooling. No new process.

Why it works:
→ Reviewers have context before reading code
→ Authors think through edge cases before submitting
→ Async reviews become productive instead of ping-pong

The best engineering processes are the ones people actually follow.`,
    cta: "What's your team's code review process? I'm always looking to learn.",
    hashtags: ["#engineering", "#codereview", "#devtools", "#teamwork"],
    image_urls: [],
    status: "draft",
    scheduled_for: null,
    published_at: null,
  },
  {
    title: "I Interviewed 50 Top Performers. They All Do This.",
    hook: "Not a morning routine. Not cold showers. Something much simpler—and much harder.",
    body: `They all have clarity on their priorities. Not goals. Priorities.

The difference:
• A goal is "grow revenue 3x"
• A priority is "this week I'm closing Deal X and nothing else matters"

Top performers ruthlessly protect their focus. They say no to good opportunities to protect great ones.

They don't manage time. They manage attention.

Here's the exercise that helps: every Sunday, write down ONE thing that would make the week successful. Just one. Then build your calendar around it.

Simple? Yes. Easy? Not even close.`,
    cta: "What's your ONE priority this week? Write it below to make it real.",
    hashtags: ["#leadership", "#productivity", "#focus", "#careers"],
    image_urls: [],
    status: "published",
    scheduled_for: null,
    published_at: "2026-03-20T07:00:00Z",
  },
  {
    title: "Why I Open-Sourced Our Internal Tool",
    hook: "We built an internal tool that saved us 10 hours/week. Then we gave it away for free. Here's why →",
    body: `6 months ago our team built a CLI tool for managing database migrations across microservices.

It was internal-only. Then I thought: what if we open-sourced it?

The results surprised everyone:
→ 1,200+ GitHub stars in 3 months
→ 14 external contributors improved it beyond what we'd planned
→ 3 senior engineers applied to join us because of the project

Open source isn't charity. It's a hiring moat, a quality multiplier, and a brand builder.

If you have an internal tool that solves a real problem, consider sharing it. The ROI might surprise you.`,
    cta: "What internal tool does your team rely on that the world should know about?",
    hashtags: ["#opensource", "#engineering", "#devtools", "#hiring"],
    image_urls: [],
    status: "draft",
    scheduled_for: null,
    published_at: null,
  },
  {
    title: "How to Write LinkedIn Posts That Actually Get Read",
    hook: "I've written 400+ LinkedIn posts. My top 20 all follow the same structure. Here it is (steal it):",
    body: `The anatomy of a high-performing LinkedIn post:

1. THE HOOK (line 1-2)
   → Pattern interrupt. Make them stop scrolling.
   → Use a bold claim, counterintuitive take, or specific number.

2. THE STORY (body)
   → Make it personal. Real > polished.
   → Use short paragraphs. One idea per line.
   → Use "→" and line breaks for scanability.

3. THE INSIGHT
   → What did you learn? Why does it matter?
   → Connect your experience to a universal truth.

4. THE CTA (last line)
   → Ask a specific question.
   → Make it easy to answer.

Write for one person, not an audience. That's the real secret.`,
    cta: "Save this for your next post. And tell me: what's YOUR best writing tip?",
    hashtags: ["#contentcreation", "#linkedin", "#writing", "#personalbrand"],
    image_urls: [],
    status: "scheduled",
    scheduled_for: "2026-04-05T09:00:00Z",
    published_at: null,
  },
];
