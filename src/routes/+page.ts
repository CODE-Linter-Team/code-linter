// since there's no dynamic data here, we can prerender
// it so that it gets served as a static asset in production
// export const prerender = true;

/** @type {import('./$types').PageLoad} */
export async function load({ params }) {

    const res = await fetch("http://localhost:5173/api/articles?states=PUBLISHED")

    const json = await res.json()

    return {
        articles: json.articles,
    };
}