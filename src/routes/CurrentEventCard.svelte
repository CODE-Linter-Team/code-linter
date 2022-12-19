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
	.currentEventCard {
		--padding: 2rem;

		display: flex;
		align-items: center;

		width: 100%;
		min-height: 3rem;
		padding: var(--padding);
		gap: var(--padding);

		background: var(--vscode-card-bg);
		color: white;
		border-radius: 6px;

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
