<script lang="ts">
	import { useQuery } from '@sveltestack/svelte-query';
	import { page } from '$app/stores';
	import { PUBLIC_SERVICE_URL } from '$env/static/public';

	import ArticleInfoCard from '../../components/ArticleInfoCard.svelte';

	/** @type {import('./$types').PageData} */
	export let data;

	const articles = data.articles;

	$: authorsFilter = $page.url.searchParams.get('authors')?.split(',') ?? [];
	$: contentTagsFilter = $page.url.searchParams.get('tags')?.split(',') ?? [];
	$: statesFilter = $page.url.searchParams.get('states')?.split(',') ?? [];

	$: queryResult = useQuery(
		['articles', authorsFilter, contentTagsFilter, statesFilter],
		async function () {
			const url = new URL('/api/articles', PUBLIC_SERVICE_URL);

			url.searchParams.set('authors', authorsFilter.join(','));
			url.searchParams.set('tags', contentTagsFilter.join(','));
			url.searchParams.set('states', statesFilter.join(','));

			const res = await fetch(url);
			const json = await res.json();

			return json;
		}
	);
</script>

<div class="articleList">
	{#if $queryResult.isLoading}
		{#each articles as article}
			<ArticleInfoCard {article} showStateChangeButtons={true} />
		{/each}
	{:else if $queryResult.error}
		<span>An error has occurred: {$queryResult.error.message}</span>
	{:else if $queryResult.data.articles.length > 0}
		{#each $queryResult.data.articles as article}
			<ArticleInfoCard {article} showStateChangeButtons={true} />
		{/each}
	{:else}
		<span>Found no articles matching this filter</span>
	{/if}
</div>

<style>
	span {
		color: var(--vscode-text);

		font-size: 1rem;
	}
	.articleList {
		display: flex;
		flex-direction: column;

		max-width: 40rem;
		gap: 3rem;
		margin: auto;
	}
	.sidePanel {
		position: fixed;

		right: 5rem;

		padding: 2rem 1rem;

		width: 10rem;
		height: 10rem;

		background: var(--vscode-layer1);

		border-radius: 6px;
	}
</style>
