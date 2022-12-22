/** @type {import('./$types').PageLoad} */
export async function load({ params }) {
    const res = await fetch(`http://localhost:5173/api/articles/${params.articleId}`);

    const json = await res.json();

    const { article } = json

    return {
        article,
    };
}
