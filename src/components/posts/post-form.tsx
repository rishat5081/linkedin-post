"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input, Textarea, Select, Button } from "@/components/ui";
import { ImageUploader } from "./image-uploader";
import { PostPreview } from "./post-preview";
import { FadeIn } from "@/components/motion";
import { parseHashtags, toDateTimeLocal } from "@/lib/utils";
import { createPost, updatePost } from "@/lib/posts/actions";
import type { Post, PostFormData, PostStatus } from "@/types";

interface PostFormProps {
  post?: Post;
}

const statusOptions = [
  { value: "draft", label: "Draft" },
  { value: "scheduled", label: "Scheduled" },
  { value: "published", label: "Published" },
];

export function PostForm({ post }: PostFormProps) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [formData, setFormData] = useState<PostFormData>({
    title: post?.title ?? "",
    hook: post?.hook ?? "",
    body: post?.body ?? "",
    cta: post?.cta ?? "",
    hashtags: post?.hashtags ?? [],
    image_urls: post?.image_urls ?? [],
    status: post?.status ?? "draft",
    scheduled_for: post?.scheduled_for ?? null,
  });

  const [hashtagInput, setHashtagInput] = useState(
    post?.hashtags.join(" ") ?? ""
  );

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!formData.title.trim()) newErrors.title = "Title is required";
    if (!formData.hook.trim()) newErrors.hook = "Hook is required";
    if (!formData.body.trim()) newErrors.body = "Body is required";
    if (formData.status === "scheduled" && !formData.scheduled_for) {
      newErrors.scheduled_for = "Schedule date is required for scheduled posts";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setSaving(true);
    try {
      if (post) {
        await updatePost(post.id, formData);
      } else {
        await createPost(formData);
      }
      router.push("/posts");
      router.refresh();
    } catch (err) {
      console.error("Save failed:", err);
    } finally {
      setSaving(false);
    }
  };

  const updateField = <K extends keyof PostFormData>(
    key: K,
    value: PostFormData[K]
  ) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[key];
        return next;
      });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        {/* Editor */}
        <FadeIn delay={0}>
          <div className="space-y-5">
            <Input
              label="Title"
              placeholder="Give your post a title..."
              value={formData.title}
              onChange={(e) => updateField("title", e.target.value)}
              error={errors.title}
            />

            <Textarea
              label="Hook"
              placeholder="The first 1-2 lines that stop the scroll..."
              value={formData.hook}
              onChange={(e) => updateField("hook", e.target.value)}
              error={errors.hook}
              rows={2}
            />

            <Textarea
              label="Body"
              placeholder="The main content of your post..."
              value={formData.body}
              onChange={(e) => updateField("body", e.target.value)}
              error={errors.body}
              rows={8}
            />

            <Textarea
              label="Call to Action"
              placeholder="End with a question or prompt..."
              value={formData.cta}
              onChange={(e) => updateField("cta", e.target.value)}
              rows={2}
            />

            <Input
              label="Hashtags"
              placeholder="#founder #startup #productivity"
              value={hashtagInput}
              onChange={(e) => {
                setHashtagInput(e.target.value);
                updateField("hashtags", parseHashtags(e.target.value));
              }}
            />

            <div className="grid grid-cols-2 gap-4">
              <Select
                label="Status"
                options={statusOptions}
                value={formData.status}
                onChange={(e) =>
                  updateField("status", e.target.value as PostStatus)
                }
              />

              {formData.status === "scheduled" && (
                <Input
                  label="Scheduled For"
                  type="datetime-local"
                  value={toDateTimeLocal(formData.scheduled_for)}
                  onChange={(e) =>
                    updateField(
                      "scheduled_for",
                      e.target.value ? new Date(e.target.value).toISOString() : null
                    )
                  }
                  error={errors.scheduled_for}
                />
              )}
            </div>

            <ImageUploader
              images={formData.image_urls}
              onImagesChange={(urls) => updateField("image_urls", urls)}
            />

            <div className="flex items-center gap-3 pt-2">
              <Button type="submit" isLoading={saving}>
                {post ? "Update Post" : "Create Post"}
              </Button>
              <Button
                type="button"
                variant="ghost"
                onClick={() => router.back()}
              >
                Cancel
              </Button>
            </div>
          </div>
        </FadeIn>

        {/* Preview */}
        <FadeIn delay={0.15} className="lg:sticky lg:top-8 lg:self-start">
          <div className="space-y-3">
            <h3 className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
              Preview
            </h3>
            <PostPreview data={formData} />
          </div>
        </FadeIn>
      </div>
    </form>
  );
}
