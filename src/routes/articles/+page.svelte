<script lang="ts">
	import ArticleInfoCard from '../ArticleInfoCard.svelte';

	import { browser } from '$app/environment';
	import { writable } from 'svelte/store';
	import { page } from '$app/stores';

	/** @type {import('./$types').PageData} */
	export let data;

	const articles = data.articles;

	function registerUrlField(defaultValue: string[], key: string) {
		const initialValue = browser
			? $page.url.searchParams.get(key)?.split(',') ?? defaultValue
			: defaultValue;

		const field = writable<string[]>(initialValue);

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
</script>

<div class="articleList">
	{#each articles as article}
		<ArticleInfoCard {article} showStateChangeButtons={true} />
	{/each}
	<!-- <div class="sidePanel" /> -->
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
