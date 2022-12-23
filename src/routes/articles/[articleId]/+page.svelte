<script>
	import { Viewer } from 'bytemd';

	import gfm from '@bytemd/plugin-gfm';
	import gemoji from '@bytemd/plugin-gemoji';
	import codeUniversityEntityBytemdPlugin from '../../../data/codeUniversityEntityBytemdPlugin';

	export let data;

	const article = data.article;
</script>

<svelte:head>
	<meta property="og:title" content={article.title} />
	<meta property="og:site_name" content="CODE Linter" />
	<meta property="og:description" content={article.description} />

	<meta property="og:type" content="article" />
	<meta property="article:published_time" content="CODE Linter" />
	<meta property="article:modified_time" content="CODE Linter" />
	<meta property="og:updated_time" content="CODE Linter" />

	<meta property="og:image" content={article.coverImgSrc} />
	<!-- <meta property="og:image:width" content="CODE Linter" />
	<meta property="og:image:height" content="CODE Linter" /> -->
	<!-- <meta property="og:image:alt" content="CODE Linter" /> -->
</svelte:head>

<article>
	{#if article == null}
		<span>article not found</span>
	{:else}
		<img src={article.coverImgSrc} class="headerImg" />
		<!-- <SvelteMarkdown source={article.markdownText} /> -->
		<h1 class="articleCaption">{article.title}</h1>
		<Viewer
			value={article.markdownText}
			plugins={[gfm(), gemoji(), codeUniversityEntityBytemdPlugin()]}
		/>
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
