import { PUBLIC_SERVICE_URL } from '$env/static/public';

/** @type {import('./$types').PageLoad} */
export async function load({ params }) {
	const res = await fetch(PUBLIC_SERVICE_URL + `/api/articles/${params.articleId}`);

	const json = await res.json();

	const { article } = json;

	return {
		article
	};
}
