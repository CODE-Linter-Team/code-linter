/**
 * rss is a feed format that allows users to subscribe using an rss reader,
 * and get notified about new articles.
 * rss is based on xml.
 * see: https://en.wikipedia.org/wiki/RSS
 * see: https://validator.w3.org/feed/docs/rss2.html
 *
 */

export interface Feed {
	title: string;
	description: string;
	baseUrl: string;
	items: FeedItem[];
}
export interface FeedItem {
	title: string;
	authorEmail: string;
	authorName: string;
	url: string;
	publishedDate: string;
}

const RssFeedService = {
	getRssItem: (item: FeedItem) => `<item>
  <title>${item.title}</title>
  <author>${item.authorEmail} (${item.authorName})</author>
  <link>${item.url}</link>
  <guid>${item.url}</guid>
  <pubDate>${item.publishedDate}</pubDate>
</item>`,

	getRssFeed: (feed: Feed) => {
		const body = `<rss version="2.0">
  <channel>
    <title>${feed.title}</title>
    <description>${feed.description}</description>
    <link>${feed.baseUrl}</link>
    <language>en</language>
  ${feed.items.map(RssFeedService.getRssItem).join('')}
  </channel>
</rss>`;

		const mimeType = 'application/rss+xml';

		return {
			body,
			mimeType
		};
	}
};
export default RssFeedService;

// <description> & lt;img src = "https://imgs.xkcd.com/comics/runtime.png" title = "At least there's a general
//   understanding all around that Doctor Who is its own thing." alt="At least there's a general
//   understanding all around that Doctor Who is its own thing." /&gt;</description>
