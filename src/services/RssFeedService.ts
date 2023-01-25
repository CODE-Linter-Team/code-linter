/**
 * rss is a feed format that allows users to subscribe using an rss reader,
 * and get notified about new articles.
 * rss is based on xml.
 * see: https://en.wikipedia.org/wiki/RSS
 * see: https://validator.w3.org/feed/docs/rss2.html
 * 
 */

export interface Feed {
  title: string
  description: string
  baseUrl: string
  items: FeedItem[]
}
export interface FeedItem {
  title: string
  authorEmail: string
  authorName: string
  url: string
  publishedDate: string
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
  </channel>
  ${feed.items.map(RssFeedService.getRssItem).join("")}
</rss>`

    const mimeType = "application/rss+xml"

    return {
      body,
      mimeType,
    }
  }
}
export default RssFeedService

// <link
//   rel="alternate"
//   type="application/rss+xml"
//   title="RSS Feed for CODE Review"
//   href="/api/feed.rss"
// />