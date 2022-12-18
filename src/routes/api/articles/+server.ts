import { error } from '@sveltejs/kit';

import connectToDatabase from '../../../modelss/connectToDatabase';
import ArticleController from '../../../controllers/Article.controller';
import UserController from '../../../controllers/User.controller';
import Permission from '../../../data/permissions';

export async function GET({ locals, url, ...rest }: any) {

    await connectToDatabase()

    const { user } = await locals.getSession() ?? {}

    const isLoggedIn = user != null

    const contentTags = url.searchParams.get('tags')?.split(",")
    const authors = url.searchParams.get('author')?.split(",")
    const states = url.searchParams.get('state')?.split(",")

    const articles = await ArticleController.get({
        includeInternal: isLoggedIn,
        contentTags,
        authors,
        states,
    })
    return new Response(JSON.stringify({ articles }), { headers: { "Content-Type": "application/json" } });
}


export async function POST({ locals, request }: any) {

    await connectToDatabase()

    const { user } = await locals.getSession() ?? {}

    const isLoggedIn = user != null

    if (!isLoggedIn) return new Response("{}", { headers: { "Content-Type": "application/json" }, status: 401 })

    const hasPermission = await UserController.hasPermissions(user.email, [Permission.SUBMIT_ARTICLES_FOR_REVIEW.id])

    if (!hasPermission) throw error(403, "missing permission: 'SUBMIT_ARTICLES_FOR_REVIEW'")

    const body = await request.json()

    const authorId = user.email

    await ArticleController.submitArticleForReview({
        ...body,
        authorId,
    })
    return new Response("{}", { headers: { "Content-Type": "application/json" }, status: 201 })
}