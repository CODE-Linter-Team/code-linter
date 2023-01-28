<script lang="ts">
	import {
		faCircleCheck,
		faCircleXmark,
		faClock,
		faExternalLinkAlt
	} from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa/src/fa.svelte';

	import Permission from '../data/permissions';

	interface User {
		name: string;
		email: string;
		permissions: any[];
		profilePictureSrc: string;
		articleInfo: any;
	}
	// articlesUrl

	export let user: User;
	export let signOut: () => unknown;
	export let isMe: boolean;
	export let style: string;
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="userInfoCard" on:click={(e) => e.stopImmediatePropagation()} {style}>
	<div class="row">
		<div class="column" style="height: 5rem">
			<h2 class="propertyCaption" style="margin-right: auto">{user.name}</h2>
			<span class="property" style="margin-right: auto; margin-bottom: 2rem">{user.email}</span>
		</div>

		<div
			class="avatar"
			style="background-image: url('https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png'); background-size: cover"
		>
			<span style="background-image: url('{user.profilePictureSrc}')" />
		</div>
	</div>

	<div class="row">
		<div class="column">
			<h2 class="propertyCaption">Permissions</h2>
			{#each user.permissions as permissionId}
				<span class="property">{Permission[permissionId].text}</span>
			{/each}
		</div>

		<a class="column" href={`/articles?authors=${user.email}`}>
			<h2 class="propertyCaption">
				Articles <Fa
					icon={faExternalLinkAlt}
					style="padding-left: 0.1rem; font-size: 0.7rem; padding-bottom: 1.5px"
				/>
			</h2>

			<span class="property">
				<Fa icon={faCircleCheck} style="padding-right: 0.3rem; color: var(--success)" />
				{user.articleInfo.publishedCount} published
			</span>

			<span class="property">
				<Fa icon={faClock} style="padding-right: 0.3rem; color: var(--neutral)" />
				{user.articleInfo.pendingCount} pending</span
			>

			<span class="property">
				<Fa icon={faCircleXmark} style="padding-right: 0.3rem; color: var(--error)" />
				{user.articleInfo.rejectedCount} rejected
			</span>
		</a>
	</div>

	{#if isMe}
		<button on:click={signOut} class="signOutButton">Sign out</button>
	{/if}
</div>

<style>
	a.column:hover .propertyCaption {
		text-decoration: underline;
		text-decoration-color: var(--vscode-text);
	}
	a.column:hover {
		text-decoration: none;
	}
	h2 {
		margin: 0;
	}
	.row {
		display: flex;
		justify-content: space-between;
	}
	.column {
		display: flex;
		flex-direction: column;
		align-items: start;
	}
	.propertyCaption {
		color: white;

		margin-bottom: 2px;
	}
	.property {
		color: var(--vscode-text);
	}
	.avatar {
		--size: 3rem;

		display: flex;

		width: var(--size);
		height: var(--size);

		background-size: cover;

		border-radius: 50%;
	}

	.userInfoCard {
		position: absolute;
		display: flex;
		flex-direction: column;

		z-index: 999;

		width: 20rem;
		padding: 1rem;

		border-radius: 6px;
		background: var(--vscode-layer2);
	}
	.signOutButton {
		background: none;

		border-radius: 6px;
		cursor: pointer;

		border: 2px solid var(--vscode-text);
		color: var(--vscode-text);

		transition-duration: 0.1s;

		height: 2.2rem;

		margin-top: 1rem;
	}
	.signOutButton:hover {
		background: var(--vscode-text);

		color: var(--vscode-layer2);

		font-weight: bold;
	}
</style>
