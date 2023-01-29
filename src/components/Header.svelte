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
			<!-- <div class="accountInfoContainer" /> -->
			<a class="logoContainer" href="/">
				<svg class="logo" viewBox="0 0 557 195" xmlns="http://www.w3.org/2000/svg">
					<path
						d="M154.995 164.977V93.4769H182.055C187.189 93.4769 191.919 94.1735 196.245 95.5669C200.572 96.8869 204.055 99.2335 206.695 102.607C209.335 105.98 210.655 110.637 210.655 116.577C210.655 121.71 209.592 125.964 207.465 129.337C205.339 132.71 202.552 135.35 199.105 137.257L214.615 164.977H193.495L181.175 140.997H173.915V164.977H154.995ZM173.915 126.037H180.735C188.362 126.037 192.175 122.884 192.175 116.577C192.175 113.497 191.185 111.37 189.205 110.197C187.299 109.024 184.475 108.437 180.735 108.437H173.915V126.037ZM224.283 164.977V93.4769H270.483V109.317H243.203V120.537H266.523V136.377H243.203V149.137H271.583V164.977H224.283ZM297.506 164.977L276.386 93.4769H296.406L303.886 124.717C304.912 128.53 305.792 132.307 306.526 136.047C307.332 139.714 308.212 143.49 309.166 147.377H309.606C310.632 143.49 311.512 139.714 312.246 136.047C313.052 132.307 313.932 128.53 314.886 124.717L322.146 93.4769H341.506L320.386 164.977H297.506ZM348.355 164.977V93.4769H367.275V164.977H348.355ZM383.16 164.977V93.4769H429.36V109.317H402.08V120.537H425.4V136.377H402.08V149.137H430.46V164.977H383.16ZM450.003 164.977L437.463 93.4769H456.823L460.783 124.717C461.149 128.457 461.553 132.197 461.993 135.937C462.433 139.677 462.836 143.417 463.203 147.157H463.643C464.303 143.417 464.963 139.677 465.623 135.937C466.283 132.124 466.943 128.384 467.603 124.717L474.423 93.4769H490.263L497.083 124.717C497.743 128.31 498.403 132.014 499.063 135.827C499.723 139.567 500.383 143.344 501.043 147.157H501.483C501.849 143.344 502.253 139.567 502.693 135.827C503.133 132.014 503.536 128.31 503.903 124.717L507.863 93.4769H525.903L514.023 164.977H490.043L484.543 136.597C484.029 133.81 483.553 130.987 483.113 128.127C482.673 125.267 482.269 122.517 481.903 119.877H481.463C481.096 122.517 480.693 125.267 480.253 128.127C479.886 130.987 479.409 133.81 478.823 136.597L473.543 164.977H450.003Z"
					/>
					<path
						d="M177.905 78.053C173.589 78.053 169.585 77.117 165.893 75.245C162.253 73.321 159.315 70.435 157.079 66.587C154.843 62.739 153.725 57.929 153.725 52.157C153.725 47.893 154.375 44.123 155.675 40.847C157.027 37.519 158.847 34.711 161.135 32.423C163.475 30.135 166.101 28.419 169.013 27.275C171.977 26.079 175.045 25.481 178.217 25.481C181.597 25.481 184.613 26.157 187.265 27.509C189.969 28.809 192.205 30.369 193.973 32.189L186.953 40.769C185.705 39.677 184.405 38.793 183.053 38.117C181.753 37.389 180.245 37.025 178.529 37.025C176.553 37.025 174.707 37.623 172.991 38.819C171.327 39.963 169.975 41.627 168.935 43.811C167.947 45.995 167.453 48.621 167.453 51.689C167.453 56.421 168.441 60.087 170.417 62.687C172.445 65.235 175.097 66.509 178.373 66.509C180.349 66.509 182.091 66.067 183.599 65.183C185.159 64.299 186.485 63.285 187.577 62.141L194.597 70.565C192.465 73.061 189.969 74.933 187.109 76.181C184.249 77.429 181.181 78.053 177.905 78.053ZM219.861 78.053C215.181 78.053 211.073 77.013 207.537 74.933C204.001 72.801 201.245 69.759 199.269 65.807C197.293 61.855 196.305 57.097 196.305 51.533C196.305 45.969 197.293 41.263 199.269 37.415C201.245 33.515 204.001 30.551 207.537 28.523C211.073 26.495 215.181 25.481 219.861 25.481C224.541 25.481 228.649 26.495 232.185 28.523C235.721 30.551 238.477 33.515 240.453 37.415C242.429 41.263 243.417 45.969 243.417 51.533C243.417 57.097 242.429 61.855 240.453 65.807C238.477 69.759 235.721 72.801 232.185 74.933C228.649 77.013 224.541 78.053 219.861 78.053ZM219.861 66.509C222.929 66.509 225.321 65.157 227.037 62.453C228.805 59.749 229.689 56.109 229.689 51.533C229.689 46.905 228.805 43.343 227.037 40.847C225.321 38.299 222.929 37.025 219.861 37.025C216.845 37.025 214.453 38.299 212.685 40.847C210.917 43.343 210.033 46.905 210.033 51.533C210.033 56.109 210.917 59.749 212.685 62.453C214.453 65.157 216.845 66.509 219.861 66.509ZM252.495 77.117V26.417H267.471C272.619 26.417 277.143 27.275 281.043 28.991C284.995 30.655 288.063 33.333 290.247 37.025C292.431 40.717 293.523 45.553 293.523 51.533C293.523 57.513 292.431 62.401 290.247 66.197C288.063 69.941 285.073 72.697 281.277 74.465C277.481 76.233 273.139 77.117 268.251 77.117H252.495ZM265.911 66.353H266.691C269.135 66.353 271.345 65.937 273.321 65.105C275.297 64.273 276.857 62.791 278.001 60.659C279.197 58.527 279.795 55.485 279.795 51.533C279.795 47.581 279.197 44.591 278.001 42.563C276.857 40.483 275.297 39.079 273.321 38.351C271.345 37.571 269.135 37.181 266.691 37.181H265.911V66.353ZM302.54 77.117V26.417H335.3V37.649H315.956V45.605H332.492V56.837H315.956V65.885H336.08V77.117H302.54Z"
					/>
					<path
						fill-rule="evenodd"
						clip-rule="evenodd"
						d="M139.293 26.0076H0.32373V164.977H139.293V26.0076ZM55.2763 138.92L98.1974 97.013L99.5492 95.6611L55.2763 52.0641L40.068 66.9344L70.1466 95.3232L40.068 124.05L55.2763 138.92Z"
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
		display: flex;
		align-items: center;

		width: 100%;
		height: 100%;

		margin-right: auto;
	}
	.logo {
		fill: white;

		height: 3.5rem;
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

		/* make more subtle */
		border: 2px solid var(--vscode-text);
		color: var(--vscode-text);
		background: none;
		border-radius: 999rem;
		height: 2.5rem;
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
