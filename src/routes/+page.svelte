<!-- 
<script>
	import Counter from './Counter.svelte';
	import welcome from '$lib/images/svelte-welcome.webp';
	import welcome_fallback from '$lib/images/svelte-welcome.png';
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head> 
-->
<script lang="ts">
	import { faGear, faUsers } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa/src/fa.svelte';

	import ArticleCard from './ArticleCard.svelte';
	import CurrentEventCard from './CurrentEventCard.svelte';
	import Counter from './Counter.svelte';

	import randomSeed from 'random-seed';

	/** @type {import('./$types').PageData} */
	export let data;

	// function getDing(targetIdx: number) {
	// 	let currentIdx = 0;

	// 	for (const line of pattern) {
	// 		for (const symbol of line) {
	// 			currentIdx++;

	// 			if (currentIdx === targetIdx) {
	// 				return symbol;
	// 			}
	// 		}
	// 	}
	// }

	const vscodeColors = {
		constDarkBlue: '#569cd6',
		propertyLightBlue: '#9adafb',
		stringOrange: '#ce9178',
		importPurple: '#c586c0',
		classGreen: '#4dc9b0',
		numberGreen: '#b4cda7',
		commentGreen: '#699855'
	};
	const articles = data.articles;

	// @ts-ignore
	// const pattern = articles.map((i, idx) => {
	// 	const ding = randomSeed.create('ARBITRARY_PATTERN_SEED_STRING' + idx);

	// 	const lineLength = ['TWO_THIRDS'][ding.range(2)];

	// 	return { color: '' };
	// });

	const pattern: { color: string; width: any }[] = [
		{ color: vscodeColors.constDarkBlue, width: 'TWO_THIRDS' },
		{ color: vscodeColors.classGreen, width: 'ONE_THIRD' },

		{ color: vscodeColors.propertyLightBlue, width: 'ONE_THIRD' },
		{ color: vscodeColors.stringOrange, width: 'TWO_THIRDS' },

		{ color: vscodeColors.propertyLightBlue, width: 'HALF' },
		{ color: vscodeColors.stringOrange, width: 'HALF' },

		{ color: vscodeColors.commentGreen, width: 'FULL' },

		{ color: vscodeColors.propertyLightBlue, width: 'TWO_THIRDS' },
		{ color: vscodeColors.numberGreen, width: 'ONE_THIRD' },

		{ color: vscodeColors.propertyLightBlue, width: 'TWO_THIRDS' },
		{ color: vscodeColors.stringOrange, width: 'ONE_THIRD' },

		{ color: vscodeColors.propertyLightBlue, width: 'ONE_THIRD' },
		{ color: vscodeColors.stringOrange, width: 'TWO_THIRDS' },

		{ color: vscodeColors.propertyLightBlue, width: 'TWO_THIRDS' },
		{ color: vscodeColors.constDarkBlue, width: 'ONE_THIRD' }
	];
</script>

<section>
	<div style="display: flex; gap: 1rem; margin-bottom: 8rem">
		<a class="dingsBlock" href="/articles">
			<div class="svgButton">
				<Fa icon={faGear} />
			</div>
			<div class="textContainer">
				<span class="tags">Admin feature</span>
				<h2>Manage content</h2>
			</div>
		</a>
		<a class="dingsBlock" href="/users">
			<div class="svgButton">
				<Fa icon={faUsers} />
			</div>

			<div class="textContainer">
				<span class="tags">Admin feature</span>
				<h2>Manage users</h2>
			</div>
		</a>
	</div>

	<CurrentEventCard />

	<div class="codeBlock">
		{#each articles as article, idx}
			<ArticleCard {article} color={pattern[idx].color} width={pattern[idx].width} />
		{/each}
	</div>
</section>

<style>
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
	.dingsBlock {
		display: flex;
		align-items: center;

		width: 100%;
		min-height: 3rem;
		padding: 1rem;
		gap: 1rem;

		background: var(--vscode-card-bg);
		color: white;
		border-radius: 6px;

		transition-duration: 0.2s;
		cursor: pointer;
	}
	.dingsBlock .svgButton {
		display: flex;
		align-items: center;
		justify-content: center;

		min-width: 3rem;
		min-height: 3rem;

		border-radius: 6px;
		background: var(--vscode-layer2);
		color: white;
	}

	.dingsBlock:hover {
		filter: brightness(1.1);

		text-decoration: none;
	}

	.dingsBlock:hover h2 {
		text-decoration: underline;
		text-decoration-color: white;
	}

	.codeBlock {
		display: flex;
		flex-wrap: wrap;

		width: 100%;
		gap: 1rem;

		border-radius: 6px;

		overflow: hidden;
	}
</style>
