// since there's no dynamic data here, we can prerender
// it so that it gets served as a static asset in production
// export const prerender = true;

import { PUBLIC_SERVICE_URL } from '$env/static/public';
import type { PageLoad } from './$types';

export const load: PageLoad = async () => {
	const res = await fetch(PUBLIC_SERVICE_URL + '/api/articles?states=PUBLISHED');

	const json = await res.json();

	return {
		articles: json.articles
	};
};
