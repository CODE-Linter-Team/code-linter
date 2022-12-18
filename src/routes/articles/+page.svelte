<script>
	import ArticleInfoCard from '../ArticleInfoCard.svelte';

	/** @type {import('./$types').PageData} */
	export let data;

	const articles = data.articles;
</script>

<div class="articleList">
	{#each articles as article}
		<ArticleInfoCard {article} />
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
