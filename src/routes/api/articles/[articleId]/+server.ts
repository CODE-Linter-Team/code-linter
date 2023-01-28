import { error } from '@sveltejs/kit';
import ArticleController from '../../../../controllers/Article.controller';

export async function GET({ params, locals }: any) {
	const { user = null } = (await locals.getSession()) ?? {};

	const isSignedIn = user != null;

	// const clientIp = rest.getClientAddress()

	const fingerPrint = Math.random().toString();

	const article = await ArticleController.read(params.articleId, isSignedIn, fingerPrint);

	return new Response(JSON.stringify({ article }), {
		headers: { 'Content-Type': 'application/json' }
	});
}
