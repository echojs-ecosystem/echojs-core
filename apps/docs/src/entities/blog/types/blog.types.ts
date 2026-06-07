export type BlogCategory = "announcement" | "release" | "tutorial" | "engineering";

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  category: BlogCategory;
  tags: string[];
  readingMinutes: number;
  body: string[];
};

import type { AnyPage } from "@echojs-ecosystem/framework/router";

export type BlogIndexProps = {
  posts: BlogPost[];
  postPage: AnyPage;
};

export type BlogPostProps = {
  slug: string;
  indexPage: AnyPage;
};

export type BlogIndexVM = {
  posts: BlogPost[];
  postPage: AnyPage;
};

export type BlogPostVM = {
  post: BlogPost | null;
  slug: string;
  indexPage: AnyPage;
};
