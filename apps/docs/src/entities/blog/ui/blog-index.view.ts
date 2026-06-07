import { createView, type Child } from "@echojs-ecosystem/framework/hyperdom";
import { div, h1, p } from "@echojs-ecosystem/framework/hyperdom";
import type { BlogIndexVM } from "@entities/blog/types/blog.types.js";
import { BlogPostCard } from "@entities/blog/ui/blog-post-card.js";
import { blogPageStyles } from "@entities/blog/ui/blog.view.styles.js";

const page = blogPageStyles();

export const BlogIndexView = createView(
  (vm: BlogIndexVM): Child =>
    div({ class: page.page() }, [
      div({ class: page.inner() }, [
        div({ class: page.header() }, [
          h1({ class: page.title() }, "Blog"),
          p({ class: page.lead() }, [
            "Release notes, engineering notes, and tutorials from the EchoJS team. Deep dives on signals, forms, routing, and how we build the docs you are reading.",
          ]),
        ]),
        div(
          { class: page.grid() },
          vm.posts.map((post) => BlogPostCard({ post, postPage: vm.postPage })),
        ),
      ]),
    ]),
  "BlogIndexView",
);
