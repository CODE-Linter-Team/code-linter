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
	const articles = data.articles;
</script>

<section>
	<div class="adminPanel">
		<div style="display: flex; flex-wrap: wrap; gap: 1rem; border-radius: 6px; overflow: hidden">
			<a href="#" class="adminPanelCard" style="--color: #569cd6">
				<Fa icon={faGear} style="padding-right: 0.3rem; color: white" />
				Manage content</a
			>
			<a href="#" class="adminPanelCard" style="--color: #699855"
				><Fa icon={faUsers} style="padding-right: 0.3rem; color: white" />
				Manage users</a
			>
		</div>
	</div>

	<CurrentEventCard />

	<div class="codeBlock">
		{#each articles as article, idx}
			<ArticleCard {article} color={pattern[idx].color} width={pattern[idx].width} />
		{/each}
	</div>
</section>

<style>
	.codeBlock {
		display: flex;
		flex-wrap: wrap;

		width: 100%;
		gap: 1rem;

		border-radius: 6px;

		overflow: hidden;
	}
	.adminPanel {
		display: flex;
		flex-direction: column;

		background: var(--vscode-layer1);
		border-radius: 6px;

		padding: 1rem;

		margin-bottom: 8rem;
	}
	.adminPanelCard {
		--color: #569cd6;

		display: flex;
		align-items: center;
		justify-content: center;

		background: var(--color);

		width: 100%;
		padding: 1rem;

		color: white;
	}
</style>
