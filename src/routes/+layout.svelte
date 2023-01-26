<script>
	import { SvelteToast } from '@zerodevx/svelte-toast';
	import Footer from './Footer.svelte';

	import Header from './Header.svelte';
	import './styles.css';
	import './bytemd.css';

	import 'bytemd/dist/index.css';

	import { QueryClient, QueryClientProvider } from '@sveltestack/svelte-query';

	import { browser } from '$app/environment';

	const queryClient = new QueryClient();

	const isDarkmode =
		// @ts-ignore
		browser && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

	// const isDarkmode = true;
</script>

<svelte:head>
	<title>CODE Review</title>
	<meta
		name="description"
		content="Stay informed about the community of CODE University of Applied Sciences"
	/>
	<link
		rel="alternate"
		type="application/rss+xml"
		title="RSS Feed for CODE Review"
		href="/api/feed.rss"
	/>
</svelte:head>

<QueryClientProvider client={queryClient}>
	<SvelteToast />

	<div class={'app ' + (isDarkmode ? 'darkmode' : 'lightmode')}>
		<Header />

		<main>
			<slot />
		</main>

		<Footer />
	</div>
</QueryClientProvider>

<style>
	.app.darkmode {
	}
	.app.lightmode {
		background: white;
	}
	.app.darkmode {
		background: var(--vscode-bg);
	}
	.app {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}

	main {
		flex: 1;
		display: flex;
		flex-direction: column;
		max-width: 70rem;
		width: calc(100% - 2rem);
		margin: 0 auto;
		box-sizing: border-box;

		padding-top: 8rem;
	}
</style>
