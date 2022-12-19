<script lang="ts">
	import { page } from '$app/stores';
	import { signIn, signOut } from '@auth/sveltekit/client';

	import Fa from 'svelte-fa/src/fa.svelte';
	import { faPen, faSignIn } from '@fortawesome/free-solid-svg-icons';

	import { faGoogle } from '@fortawesome/free-brands-svg-icons';
	import UserInfoCard from '../components/UserInfoCard.svelte';

	const isLoggedIn = Object.keys($page.data.session || {}).length;

	import { onMount } from 'svelte';

	let innerWidth = 0;
	let innerHeight = 0;

	$: dings = innerWidth < 900;

	let me: any;

	onMount(async () => {
		if (!isLoggedIn) return;

		const res = await fetch('/api/me');

		me = (await res.json()).me;

		// $page.data.session!.user = me;
	});

	const userProfilePicture = $page?.data?.session?.user?.image;

	const userEmail = $page?.data?.session?.user?.email;

	const username = $page?.data?.session?.user?.name;

	const usernameOrEmail = username || userEmail;

	$: user = {
		name: username!,
		email: userEmail!,
		profilePictureSrc: userProfilePicture!,
		permissions: me?.permissions ?? [],
		articles: {},
		articleInfo: me?.articleInfo ?? {}
	};

	export let isAccountPopupOpen = false;

	function handleAvatarClick() {
		if (isAccountPopupOpen) {
			isAccountPopupOpen = false;

			return;
		}
		isAccountPopupOpen = true;
	}
</script>

<svelte:window bind:innerWidth bind:innerHeight />

<header>
	<div class="navContainer">
		<nav class="upperNav">
			<div class="accountInfoContainer" />
			<a class="logoContainer" href="/">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 102.6 26.9" class="logo"
					><path
						d="M13.3 20.5c-3.6 0-6.5-3.2-6.5-7.1s2.9-7.1 6.5-7.1c1.7 0 3.3.8 4.5 2l4.6-4.5C19.9 1.5 16.7 0 13.1 0 5.9 0 0 6 0 13.5 0 20.9 5.9 27 13.1 27c3.6 0 6.9-1.5 9.2-3.9l-4.6-4.5c-1.1 1.2-2.7 1.9-4.4 1.9zM32.2.6L19.5 13l-.4.4 13.1 12.9 4.5-4.4-8.9-8.4L36.7 5 32.2.6zm35.1.3h-8.6V26h8.7C75.3 26 81 21.2 81 13.5 81 5.7 75.3.9 67.3.9zm0 19.5h-2.1V6.6h2.1c4.6 0 7 3 7 6.9 0 3.7-2.6 6.9-7 6.9zm35.3-13.8V.9H84V26h18.6v-5.6H90.5v-4.3h11.8v-5.6H90.5V6.6h12.1zM42.8.6L38.3 5l8.9 8.5-8.9 8.4 4.5 4.4 13.1-12.9-.4-.4L42.8.6z"
					/></svg
				>
			</a>
			<div class="accountInfoContainer">
				{#if isLoggedIn}
					{#if userProfilePicture}
						<button
							style="border: none; background: none"
							on:click={handleAvatarClick}
							on:blur={() =>
								setTimeout(() => {
									isAccountPopupOpen = false;
								}, 100)}
						>
							<div
								class="avatar header-avatar"
								title={`Signed in as ${usernameOrEmail}`}
								style="background-image: url('https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png'); background-size: cover"
							>
								<span style="background-image: url('{userProfilePicture}')" />
							</div>
							{#if isAccountPopupOpen}
								<UserInfoCard {user} isMe={true} {signOut} style="right: 1.25rem; top: 6rem;" />
							{/if}
						</button>
					{/if}
				{:else if dings}
					<button on:click={() => signIn('google')} style="border: none; background: none">
						<span class="avatar header-avatar" title={`Sign in with @code.berlin`}>
							<Fa icon={faSignIn} />
						</span>
					</button>
				{:else}
					<button on:click={() => signIn('google')} class="googleSigninButton">
						<Fa icon={faGoogle} style="padding-right: 0.8rem" />
						Sign in with @code.berlin
					</button>
				{/if}
			</div>
		</nav>
		<nav class="lowerNav">
			<a href="/articles?tags=Campus" class="lowerNavItem">Campus</a>
			<a href="/articles?tags=Social" class="lowerNavItem">Social</a>
			<a href="/articles?tags=Technology" class="lowerNavItem">Technology</a>
			<a href="/articles?tags=Academic" class="lowerNavItem">Academic</a>
			<a href="/articles?tags=Opinion" class="lowerNavItem">Opinion</a>

			<a href="/compose" class="composeButton">
				<Fa icon={faPen} />
			</a>
		</nav>
	</div>
	<!-- <div class="corner">
		<a href="https://kit.svelte.dev">
			<img src={logo} alt="SvelteKit" />
		</a>
	</div>

	<nav>
		<svg viewBox="0 0 2 3" aria-hidden="true">
			<path d="M0,0 L1,2 C1.5,3 1.5,3 2,3 L2,0 Z" />
		</svg>
		<ul>
			<li aria-current={$page.url.pathname === '/' ? 'page' : undefined}>
				<a href="/">Home</a>
			</li>
			<li aria-current={$page.url.pathname === '/about' ? 'page' : undefined}>
				<a href="/about">About</a>
			</li>
			<li aria-current={$page.url.pathname.startsWith('/sverdle') ? 'page' : undefined}>
				<a href="/sverdle">Sverdle</a>
			</li>
		</ul>
		<svg viewBox="0 0 2 3" aria-hidden="true">
			<path d="M0,0 L0,3 C0.5,3 0.5,3 1,2 L2,0 Z" />
		</svg>
	</nav>

	<div class="corner">
		<a href="https://github.com/sveltejs/kit">
			<img src={github} alt="GitHub" />
		</a>
	</div> -->
</header>

<style>
	header {
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;

		background: var(--vscode-layer1);
	}
	.navContainer {
		display: flex;
		flex-direction: column;

		width: min(calc(100% - 2rem), 70rem);
	}
	.lowerNav {
		position: relative;
		display: flex;

		height: 4rem;
	}
	.upperNav {
		display: flex;

		height: 8rem;
	}

	/* .lowerNavItem:first-child {
		justify-content: start;
	}
	.lowerNavItem:last-child {
		justify-content: end;
	} */
	.lowerNavItem {
		display: flex;
		justify-content: center;

		width: 100%;
		height: 100%;

		color: var(--vscode-text);
	}
	.logoContainer {
		display: grid;
		place-content: center;

		width: 100%;
		height: 100%;
	}
	.logo {
		fill: white;

		height: 3rem;
	}
	h2 {
		margin: 0;
	}

	/* .corner {
		width: 3em;
		height: 3em;
	}

	.corner a {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 100%;
	}

	.corner img {
		width: 2em;
		height: 2em;
		object-fit: contain;
	}

	nav {
		display: flex;
		justify-content: center;
		--background: rgba(255, 255, 255, 0.7);
	}

	svg {
		width: 2em;
		height: 3em;
		display: block;
	}

	path {
		fill: var(--background);
	}

	ul {
		position: relative;
		padding: 0;
		margin: 0;
		height: 3em;
		display: flex;
		justify-content: center;
		align-items: center;
		list-style: none;
		background: var(--background);
		background-size: contain;
	}

	li {
		position: relative;
		height: 100%;
	}

	li[aria-current='page']::before {
		--size: 6px;
		content: '';
		width: 0;
		height: 0;
		position: absolute;
		top: 0;
		left: calc(50% - var(--size));
		border: var(--size) solid transparent;
		border-top: var(--size) solid var(--color-theme-1);
	}

	nav a {
		display: flex;
		height: 100%;
		align-items: center;
		padding: 0 0.5rem;
		color: var(--color-text);
		font-weight: 700;
		font-size: 0.8rem;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		text-decoration: none;
		transition: color 0.2s linear;
	}

	a:hover {
		color: var(--color-theme-1);
	} */

	.avatar {
		--size: 3rem;

		display: flex;
		align-items: center;
		justify-content: center;

		width: var(--size);
		height: var(--size);

		background-size: cover;

		border-radius: 50%;
	}
	.header-avatar {
		position: relative;

		margin: 3px;

		cursor: pointer;

		margin-right: calc(1.25rem + 3px);

		box-sizing: content-box;

		color: var(--vscode-text);
	}
	.header-avatar:hover {
		margin: 0;

		margin-right: calc(1.25rem + 3px - 3px);

		border: 3px solid var(--vscode-layer2);
	}

	.googleSigninButton {
		height: 2.2rem;
		padding: 0 1.5rem;

		border: none;

		cursor: pointer;

		transition-duration: 0.2s;

		font-size: 0.9rem;
		font-weight: bold;

		color: var(--vscode-layer1);

		background: white;

		display: flex;
		align-items: center;
		justify-content: center;

		border-radius: 6px;
	}
	.googleSigninButton:hover {
		filter: brightness(0.8);
	}
	.googleSigninButton:active {
		transform: scale(0.98);
	}
	.composeButton {
		--size: 4.5rem;

		font-size: 1.2rem;

		text-decoration: none !important;

		position: absolute;
		display: flex;
		align-items: center;
		justify-content: center;

		right: 1rem;
		bottom: calc(var(--size) / -2);

		width: var(--size);
		height: var(--size);

		background: var(--primary);
		box-shadow: 0 0 16px 0 rgba(0, 0, 0, 0.2);
		border-radius: 50%;

		color: white;

		transition-duration: 0.2s;
	}
	.composeButton:hover {
		filter: brightness(1.1);
	}
	.composeButton:active {
		transform: scale(0.95);
	}
	.accountInfoContainer {
		position: relative;
		display: flex;
		flex-direction: column;
		align-items: end;
		justify-content: center;

		min-width: 20rem;
		height: 100%;
	}
	@media (max-width: 800px) {
		.accountInfoContainer {
			min-width: auto;
			width: 5rem;
		}
	}
</style>
