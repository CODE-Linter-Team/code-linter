<script lang="ts">
	import ArticleInfoCard from '../ArticleInfoCard.svelte';

	import { browser } from '$app/environment';
	import { readable, writable } from 'svelte/store';
	import { page } from '$app/stores';

	import { PUBLIC_SERVICE_URL } from '$env/static/public';

	/** @type {import('./$types').PageData} */
	export let data;

	const articles = data.articles;

	function registerUrlField(defaultValue: string[], key: string) {
		const initialValue = browser
			? $page.url.searchParams.get(key)?.split(',') ?? defaultValue
			: defaultValue;

		const field = writable<string[]>(initialValue);

		// const sus = readable($page.url.searchParams.get(key)?.split(','), (set) => {
		// 	const update = () => set($page.url.searchParams.get(key)?.split(',') ?? []);
		// 	// window.addEventListener('hashchange', update);
		// 	// return () => window.removeEventListener('hashchange', update);
		// });
		// sus.subscribe(field.set);

		field.subscribe((value) => {
			if (browser) {
				$page.url.searchParams.set(key, value.join(','));
			}
		});
		return field;
	}
	export const authorsFilter = registerUrlField([], 'authors');
	export const contentTagsFilter = registerUrlField([], 'tags');
	export const statesFilter = registerUrlField([], 'states');

	import { useQuery } from '@sveltestack/svelte-query';

	const queryResult = useQuery(
		['articles', $authorsFilter.join(','), $contentTagsFilter.join(','), $statesFilter.join(',')],
		async function () {
			const res = await fetch(
				PUBLIC_SERVICE_URL +
					`/articles?authors=${$authorsFilter.join(',')}&tags=${$contentTagsFilter.join(
						','
					)}&states=${$statesFilter.join(',')}`
			);
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
		Found no articles matching this filter
	{/if}
</div>

<style>
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
