<script lang="ts">
	import { page } from '$app/stores';
	import { signIn, signOut } from '@auth/sveltekit/client';

	import Fa from 'svelte-fa/src/fa.svelte';
	import { faPen, faSignIn } from '@fortawesome/free-solid-svg-icons';

	import { faGoogle } from '@fortawesome/free-brands-svg-icons';
	import UserInfoCard from './UserInfoCard.svelte';

	import me, { watch } from '../stores/me.store';

	import { onMount } from 'svelte';
	import Permission from '../data/permissions';

	watch();

	$: console.info('ich in Header.svelte:', $me);

	const isLoggedIn = Object.keys($page?.data?.session || {}).length;

	let innerWidth = 0;
	let innerHeight = 0;

	$: isSmol = innerWidth < 900;

	let user: any;

	export let isAccountPopupOpen = false;

	function handleAvatarClick() {
		if (isAccountPopupOpen) {
			isAccountPopupOpen = false;

			return;
		}
		isAccountPopupOpen = true;
	}

	$: hasArticleWritePermisison = $me.permissions.includes(Permission.SUBMIT_ARTICLES_FOR_REVIEW.id);

	$: userProfilePicture = $me.me?.image ?? $page?.data?.session?.user?.image;

	const userEmail = $page?.data?.session?.user?.email;

	const username = $page?.data?.session?.user?.name;

	const usernameOrEmail = username || userEmail;

	$: if ($me.isSignedIn) {
		user = {
			name: username!,
			email: userEmail!,
			profilePictureSrc: userProfilePicture!,
			permissions: $me?.me?.permissions ?? [],
			articles: {},
			articleInfo: $me?.me?.articleInfo ?? {}
		};
	}
</script>

<svelte:window bind:innerWidth bind:innerHeight />

<header>
	<div class="navContainer">
		<nav class="upperNav">
			<div class="accountInfoContainer" />
			<a class="logoContainer" href="/">
				<svg class="logo" viewBox="0 0 401 120" xmlns="http://www.w3.org/2000/svg">
					<path
						d="M73.075 93.4058V31.9808H96.322C100.732 31.9808 104.795 32.5793 108.512 33.7763C112.229 34.9103 115.222 36.9263 117.49 39.8243C119.758 42.7223 120.892 46.7228 120.892 51.8258C120.892 56.2358 119.978 59.8898 118.151 62.7878C116.324 65.6858 113.93 67.9538 110.969 69.5918L124.294 93.4058H106.15L95.566 72.8048H89.329V93.4058H73.075ZM89.329 59.9528H95.188C101.74 59.9528 105.016 57.2438 105.016 51.8258C105.016 49.1798 104.165 47.3528 102.464 46.3448C100.826 45.3368 98.401 44.8328 95.188 44.8328H89.329V59.9528ZM132.599 93.4058V31.9808H172.289V45.5888H148.853V55.2278H168.887V68.8358H148.853V79.7978H173.234V93.4058H132.599ZM195.504 93.4058L177.36 31.9808H194.559L200.985 58.8188C201.867 62.0948 202.623 65.3393 203.253 68.5523C203.946 71.7023 204.702 74.9468 205.521 78.2858H205.899C206.781 74.9468 207.537 71.7023 208.167 68.5523C208.86 65.3393 209.616 62.0948 210.435 58.8188L216.672 31.9808H233.304L215.16 93.4058H195.504ZM239.188 93.4058V31.9808H255.442V93.4058H239.188ZM269.089 93.4058V31.9808H308.779V45.5888H285.343V55.2278H305.377V68.8358H285.343V79.7978H309.724V93.4058H269.089ZM326.513 93.4058L315.74 31.9808H332.372L335.774 58.8188C336.089 62.0318 336.435 65.2448 336.813 68.4578C337.191 71.6708 337.538 74.8838 337.853 78.0968H338.231C338.798 74.8838 339.365 71.6708 339.932 68.4578C340.499 65.1818 341.066 61.9688 341.633 58.8188L347.492 31.9808H361.1L366.959 58.8188C367.526 61.9058 368.093 65.0873 368.66 68.3633C369.227 71.5763 369.794 74.8208 370.361 78.0968H370.739C371.054 74.8208 371.4 71.5763 371.778 68.3633C372.156 65.0873 372.503 61.9058 372.818 58.8188L376.22 31.9808H391.718L381.512 93.4058H360.911L356.186 69.0248C355.745 66.6308 355.335 64.2053 354.957 61.7483C354.579 59.2913 354.233 56.9288 353.918 54.6608H353.54C353.225 56.9288 352.878 59.2913 352.5 61.7483C352.185 64.2053 351.776 66.6308 351.272 69.0248L346.736 93.4058H326.513Z"
					/>
					<path
						fill-rule="evenodd"
						clip-rule="evenodd"
						d="M61.8016 31.9259H0.321777V93.4058H61.8016V31.9259ZM24.6327 81.8783L43.6209 63.3387L44.219 62.7406L24.6327 43.4533L17.9046 50.0319L31.2113 62.5911L17.9046 75.2997L24.6327 81.8783Z"
					/>
				</svg>
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
								<span
									style="background-image: url('{userProfilePicture}'); width: 100%; height: 100%; background-size: cover"
								/>
							</div>
							{#if isAccountPopupOpen}
								<UserInfoCard {user} isMe={true} {signOut} style="right: 1.25rem; top: 6rem;" />
							{/if}
						</button>
					{/if}
				{:else if isSmol}
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

			{#if hasArticleWritePermisison}
				<a href="/compose" class="composeButton">
					<Fa icon={faPen} />
				</a>
			{/if}
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

		height: 4rem;
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

		overflow: hidden;
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
