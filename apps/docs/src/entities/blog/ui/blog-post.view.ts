import { createView, type Child } from "@echojs-ecosystem/framework/hyperdom";
import { NavLink } from "@echojs-ecosystem/framework/router";
import { div, h1, p, Show, span } from "@echojs-ecosystem/framework/hyperdom";
import { blogCategoryLabels } from "@entities/blog/constants/blog.data.js";
import type { BlogPostVM } from "@entities/blog/types/blog.types.js";
import { blogPageStyles } from "@entities/blog/ui/blog.view.styles.js";

const page = blogPageStyles();

const formatDate = (iso: string): string =>
  new Date(iso).toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

export const BlogPostView = createView((vm: BlogPostVM): Child => {
  const post = vm.post;

  return div({ class: page.page() }, [
    div({ class: page.inner() }, [
      NavLink({
        to: vm.indexPage,
        class: page.backLink(),
        children: "← Back to blog",
      }),
      Show(
        () => post === null,
        () =>
          div({ class: page.notFound() }, [
            p({ class: page.notFoundTitle() }, "Post not found"),
            p({ class: page.notFoundBody() }, "This article may have moved or the link is outdated."),
          ]),
        () => {
          if (!post) return null;
          return div({ class: page.article() }, [
            div({ class: page.articleHeader() }, [
              h1({ class: page.articleTitle() }, post.title),
              p({ class: page.articleMeta() }, [
                span(null, formatDate(post.date)),
                span(null, "·"),
                span(null, post.author),
                span(null, "·"),
                span(null, blogCategoryLabels[post.category]),
                span(null, "·"),
                span(null, `${post.readingMinutes} min read`),
              ]),
            ]),
            div({ class: page.articleBody() }, post.body.map((paragraph) => p(null, paragraph))),
          ]);
        },
      ),
    ]),
  ]);
}, "BlogPostView");
