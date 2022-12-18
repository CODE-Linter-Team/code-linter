<script lang="ts">
	import { faEye } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa/src/fa.svelte';

	import UserInfoCard from '../components/UserInfoCard.svelte';

	interface User {
		name: string;
		email: string;
		image: string;
	}
	interface Article {
		id: string;
		scope: string;
		state: string[];

		author: User;
		publisher: User | null;

		coverImgSrc: string;
		title: string;
		description: string;
		markdownText: string;
		contentTags: string[];
		url: string;

		submittedDate: number;
		publishedDate: number | null;
	}
	export let article: Article;

	let isAccountPopupOpen = false;

	function handleAvatarClick() {
		if (isAccountPopupOpen) {
			isAccountPopupOpen = false;

			return;
		}
		isAccountPopupOpen = true;
	}
	async function publishArticle(articleId: string) {
		const res = await fetch(`/api/articles/${articleId}/publish`, { method: 'POST' });
	}
	async function rejectArticle(articleId: string) {
		const res = await fetch(`/api/articles/${articleId}/reject`, { method: 'POST' });
	}
</script>

<div class="articleCard">
	<div class="topRow">
		<div style="display:flex;flex-direction:column; width: 100%">
			<div style="display: flex; align-items: center">
				<button
					style="border: none; background: none; position: relative"
					on:click={handleAvatarClick}
					on:blur={() =>
						setTimeout(() => {
							isAccountPopupOpen = false;
						}, 100)}
				>
					<span
						class="avatar"
						style={`background-image: url('${article.author.image}'); position: relative`}
					/>

					{#if isAccountPopupOpen}
						<UserInfoCard
							user={{
								...article.author,
								profilePictureSrc: article.author.image
							}}
							isMe={false}
							signOut={() => {}}
							style="left: 0; top: 52px;"
						/>
					{/if}
				</button>

				<div style="display:flex;flex-direction:column">
					<span class="text" style="padding-left: 12px;">{article.author.name}</span>
					<div class="dateInfoContainer" style="padding-left: 12px;">
						<span class="text">Submitted 23.3.2022</span>
						{#if article.state.includes('PUBLISHED')}
							<span class="text seperatorDot">•</span>
							<span class="text">Published 23.3.2022</span>

							<span class="text seperatorDot">•</span>
							<span class="text">69 views</span>
						{/if}
						<!-- <Fa
						icon={faEye}
						style="color: white; padding-left: 0.1rem; font-size: 0.7rem; padding-bottom: 1.5px"
					/> -->
					</div>
				</div>
			</div>
			<span class="topicText">{article.contentTags[0]}</span>
			<h2 style="font-weight: bold; color: white; font-size: 22px">
				{article.title}
			</h2>
		</div>

		<div class="buttonColumn">
			{#if article.state.includes('PENDING')}
				<button class="button" style="--color: #4dc9b0" on:click={() => publishArticle(article.id)}
					>Publish</button
				>
				<button class="button" style="--color: #ce9178" on:click={() => publishArticle(article.id)}
					>Reject</button
				>
			{/if}
		</div>
	</div>
	<img src={article.coverImgSrc} class="articleWallpaper" />
</div>

<style>
	* {
		box-sizing: border-box;
	}
	.buttonColumn {
		display: flex;
		flex-direction: column;

		min-width: 6rem;
		margin-left: 1rem;
		gap: 1rem;
	}
	.articleWallpaper {
		width: 100%;

		border-radius: 6px;

		margin-top: 1rem;

		height: 16rem;

		object-fit: cover;
	}
	h2 {
		margin: 0;
	}
	.topicText {
		margin-top: 12px;
		margin-bottom: -2px;
		color: white;
		font-size: 14px;
		text-decoration: none;
	}
	.text {
		color: var(--vscode-text);
	}
	.articleCard {
		display: flex;
		flex-direction: column;

		background: var(--vscode-layer1);

		border-radius: 6px;

		padding: 1rem;

		overflow: hidden;
	}
	.topRow {
		display: flex;

		width: 100%;

		justify-content: space-between;
	}
	.avatar {
		--size: 2.5rem;

		box-sizing: content-box;

		display: flex;

		cursor: pointer;

		min-width: var(--size);
		min-height: var(--size);

		background-size: cover;

		border-radius: 50%;

		margin: 3px;

		right: 3px;
		bottom: 3px;
	}
	.avatar:hover {
		margin: 0;
		border: 3px solid var(--vscode-layer2);
	}

	.button {
		background: none;

		border-radius: 6px;
		cursor: pointer;

		/* border: 2px solid var(--vscode-text); */
		border: none;
		/* color: var(--vscode-text); */
		color: white;

		background: var(--color);

		transition-duration: 0.1s;

		height: 2.2rem;

		width: 100%;
	}
	.button:hover {
		filter: brightness(1.1);
	}
	.dateInfoContainer {
		display: flex;
	}
	.seperatorDot {
		padding: 0 8px;
	}

	@media only screen and (max-width: 600px) {
		.dateInfoContainer {
			flex-direction: column;
		}
		.seperatorDot {
			display: none;
		}
	}
</style>
