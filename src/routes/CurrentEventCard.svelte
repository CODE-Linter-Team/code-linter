<script lang="ts">
	export let url: string;
	export let title: string;
	export let category: string;
</script>

<a class="currentEventCard" href={url}>
	<slot name="head" />
	<div class="textContainer">
		<span class="tags">{category}</span>
		<h2>{title}</h2>
	</div>
</a>

<style>
	* {
		box-sizing: border-box;
	}
	:global(.darkmode) .currentEventCard {
		background: var(--vscode-card-bg);
		color: white;
		border-radius: 6px;
	}
	:global(.lightmode) .currentEventCard {
		border-radius: 0;
		color: #444;
		background: white;

		border: 1px solid #ccc;
	}
	.currentEventCard {
		--padding: 2rem;

		display: flex;
		align-items: center;

		width: 100%;
		min-height: 3rem;
		padding: var(--padding);
		gap: var(--padding);

		transition: filter 0.2s;
		cursor: pointer;
	}
	.currentEventCard:hover {
		filter: brightness(1.1);

		text-decoration: none;
	}
	.currentEventCard:hover h2 {
		text-decoration: underline;
		text-decoration-color: white;
	}
	.textContainer {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		min-height: 3rem;
	}
	.tags {
		margin-bottom: -3px;

		color: var(--primary);
		font-size: 14px;
	}
	h2 {
		margin: 0;

		color: white;
		font-size: 22px;
		font-weight: bold;
	}
</style>
