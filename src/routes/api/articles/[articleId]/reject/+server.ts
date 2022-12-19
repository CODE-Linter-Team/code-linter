import { error } from '@sveltejs/kit';

import ArticleController from '../../../../../controllers/Article.controller';
import UserController from '../../../../../controllers/User.controller';
import Permission from '../../../../../data/permissions';

export async function POST({ params, locals }: any) {

    await new Promise(res => setTimeout(res, 1000))

    const { user } = await locals.getSession()

    if (user == null) throw error(401, "login required")

    const hasPermission = await UserController.hasPermissions(user.email, [Permission.PUBLISH_ARTICLES.id])

    if (!hasPermission) throw error(403, "missing permission: 'PUBLISH_ARTICLES'")

    await ArticleController.rejectArticle(params.articleId, user.email)

    return new Response("{ ok: true }");
}