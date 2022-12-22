<script>
	export let data;

	const article = data.article;

	import { Viewer } from 'bytemd';
</script>

<article>
	{#if article == null}
		article not found
	{:else}
		<img src={article.coverImgSrc} class="headerImg" />
		<!-- <SvelteMarkdown source={article.markdownText} /> -->
		<h1 class="articleCaption">{article.title}</h1>
		<Viewer value={article.markdownText} />
	{/if}
</article>

<style>
	.headerImg {
		width: 100%;
		height: 14rem;

		object-fit: cover;
	}
	article {
		color: var(--vscode-text);

		max-width: 52rem;

		margin: auto;
	}

	article h1 {
		color: white;
	}

	article h2 {
		font-weight: bold;
		color: white !important;
	}

	article p {
	}
</style>
