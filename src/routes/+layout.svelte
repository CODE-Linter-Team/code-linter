<script>
	import { SvelteToast } from '@zerodevx/svelte-toast';

	import Header from './Header.svelte';
	import './styles.css';

	import 'bytemd/dist/index.css';

	const options = {};

	import { QueryClient, QueryClientProvider } from '@sveltestack/svelte-query';

	const queryClient = new QueryClient();
</script>

<QueryClientProvider client={queryClient}>
	<SvelteToast {options} />

	<div class="app">
		<Header />

		<main>
			<slot />
		</main>

		<footer>
			<nav>
				<a href="#">Imprint</a>
				<a href="#">Privacy</a>
				<a href="#">Contact</a>
			</nav>
		</footer>
	</div>
</QueryClientProvider>

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

	footer {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 50px 0;

		background: var(--vscode-layer1);

		width: 100%;

		height: 300px;

		margin-top: 8rem;
	}

	footer a {
		font-weight: bold;
	}

	@media (min-width: 480px) {
		footer {
			padding: 12px 0;
		}
	}
	nav {
		display: flex;

		justify-content: space-between;

		margin: auto;
	}
	nav a {
		display: grid;
		place-content: center;

		height: 100%;
		padding: 0 3rem;

		color: var(--vscode-text);
	}
	@media (max-width: 42rem) {
		nav {
			flex-direction: column;

			gap: 3rem;
		}
	}
</style>
