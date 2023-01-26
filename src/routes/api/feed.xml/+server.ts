import connectToDatabase from '../../../modelss/connectToDatabase';
import ArticleController from '../../../controllers/Article.controller';
import RssFeedService, { type Feed, type FeedItem } from '../../../services/RssFeedService';

import { PUBLIC_SERVICE_URL } from "$env/static/public"

export async function GET({ locals, url, ...rest }: any) {
    await connectToDatabase();

    const { user } = (await locals.getSession()) ?? {};

    const isLoggedIn = user != null;

    const articles = await ArticleController.get({
        includeInternal: isLoggedIn,
        contentTags: [],
        authors: [],
        states: [],
    });
    const feedItems = articles.map<FeedItem>(i => {

        const {
            title,
            url,
            publishedDate,
            author,
        } = i!

        const authorEmail = author!.email!
        const authorName = author!.name!

        return {
            title,
            authorEmail,
            authorName,
            url,
            publishedDate: publishedDate,
        }
    })
    const feedObj: Feed = {
        title: "CODE Review Feed",
        description: "Stay informed about the community of CODE University of Applied Sciences",
        baseUrl: PUBLIC_SERVICE_URL,
        items: feedItems,
    }
    const feed = RssFeedService.getRssFeed(feedObj)

    return new Response(feed.body, {
        headers: { 'Content-Type': feed.mimeType }
    });
}