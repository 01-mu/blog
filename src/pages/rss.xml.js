import rss from "@astrojs/rss";
import { getVisiblePosts } from "../utils/posts";

export async function GET(context) {
  const posts = await getVisiblePosts();

  return rss({
    title: "Masato log",
    description: "Designing systems from nothingness.",
    site: context.site,
    items: posts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.date,
      description: post.data.description ?? "",
      link: `/posts/${post.slug}`,
    })),
  });
}
