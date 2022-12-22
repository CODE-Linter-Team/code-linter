/** @type {import('./$types').PageLoad} */
export async function load({ params }) {
	const res = await fetch('http://localhost:5173/api/articles?states=PUBLISHED');

	const json = await res.json();

	return {
		articles: json.articles
	};
}
