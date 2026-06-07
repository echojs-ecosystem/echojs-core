import { createRouteView } from "@echojs-ecosystem/framework/router";
import type { AnyPage } from "@echojs-ecosystem/framework/router";
import { blogPosts, findBlogPostBySlug, BlogArticle, BlogIndex } from "@entities/blog/index.js";
import { applySeo } from "@core/seo/apply-seo.js";

let blogPageRef!: AnyPage;
let blogPostPageRef!: AnyPage;

blogPostPageRef = createRouteView<{ slug: string }>({
  name: "docs-blog-post",
  view: ({ params }) => {
    const post = findBlogPostBySlug(params.slug);
    applySeo({
      title: post ? post.title : "Post not found",
      description: post?.excerpt ?? "EchoJS blog article.",
      path: `/docs/blog/${params.slug}`,
      noindex: !post,
    });
    return BlogArticle({ slug: params.slug, indexPage: blogPageRef });
  },
});

blogPageRef = createRouteView({
  name: "docs-blog",
  view: () => {
    applySeo({
      title: "Blog · EchoJS",
      description: "Release notes, tutorials, and engineering posts from the EchoJS team.",
      path: "/docs/blog",
    });
    return BlogIndex({ posts: blogPosts, postPage: blogPostPageRef });
  },
});

export const blogPage = blogPageRef;
export const blogPostPage = blogPostPageRef;
