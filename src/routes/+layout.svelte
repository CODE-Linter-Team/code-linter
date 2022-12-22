<script>
	import { SvelteToast } from '@zerodevx/svelte-toast';
	import Footer from './Footer.svelte';

	import Header from './Header.svelte';
	import './styles.css';

	import 'bytemd/dist/index.css';

	import { QueryClient, QueryClientProvider } from '@sveltestack/svelte-query';

	const queryClient = new QueryClient();
</script>

<QueryClientProvider client={queryClient}>
	<SvelteToast />

	<div class="app">
		<Header />

		<main>
			<slot />
		</main>

	<Footer />
</div>

<style>
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
