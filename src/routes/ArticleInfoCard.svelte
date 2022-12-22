<script lang="ts">
	import { faEye } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa/src/fa.svelte';

	import UserInfoCard from '../components/UserInfoCard.svelte';

	import ToastTheme from '../data/toastThemes';

	import { toast } from '@zerodevx/svelte-toast';
	import { Pulse } from 'svelte-loading-spinners';
	import dayjs from 'dayjs';

	interface User {
		name: string;
		email: string;
		image: string;

		permissions: string[];
		articleInfo: any;
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

	export let showStateChangeButtons: boolean;

	let isAccountPopupOpen = false;

	let state: { state: 'DEFAULT' } | { state: 'SUBMITTING' } | { state: 'SUBMITTED' } = {
		state: 'DEFAULT'
	};

	function handleAvatarClick() {
		if (isAccountPopupOpen) {
			isAccountPopupOpen = false;

			return;
		}
		isAccountPopupOpen = true;
	}
	async function publishArticle(articleId: string) {
		state = { state: 'SUBMITTING' };
		try {
			const res = await fetch(`/api/articles/${articleId}/publish`, { method: 'POST' });

			if (!res.ok) throw new Error();

			toast.push('Published article', {
				theme: ToastTheme.success
			});
			state = { state: 'SUBMITTED' };
		} catch (err) {
			toast.push('Failed to reject article', {
				theme: ToastTheme.error
			});
			state = { state: 'DEFAULT' };
		}
	}
	async function rejectArticle(articleId: string) {
		state = { state: 'SUBMITTING' };

		try {
			const res = await fetch(`/api/articles/${articleId}/reject`, { method: 'POST' });

			if (!res.ok) throw new Error();

			toast.push('Rejected article', {
				theme: ToastTheme.success
			});
			state = { state: 'SUBMITTED' };
		} catch (err) {
			toast.push('Failed to reject article', {
				theme: ToastTheme.error
			});
			state = { state: 'DEFAULT' };
		}
	}
	$: isSubmitting = state.state === 'SUBMITTING';
</script>

<div class="articleCard">
	<div class="topRow">
		<div style="display:flex;flex-direction:column; width: 100%">
			<div style="display: flex; align-items: center">
				<button
					style="border: none; background: none; position: relative; padding: 0"
					on:click={handleAvatarClick}
					on:blur={() =>
						setTimeout(() => {
							isAccountPopupOpen = false;
						}, 100)}
				>
					<div
						style="background-image: url('https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png'); background-size: cover"
						class="avatar"
					>
						<span style={`background-image: url('${article.author.image}')`} />
					</div>

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
						<span class="text">Submitted {dayjs(article.submittedDate).format('DD.MM.YYYY')}</span>
						{#if article.state.includes('PUBLISHED')}
							<span class="text seperatorDot">•</span>
							<span class="text">Published {dayjs(article.publishedDate).format('DD.MM.YYYY')}</span
							>

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
			{#if article.state.includes('PENDING') && showStateChangeButtons}
				<button
					class="button"
					style="--color: var(--success)"
					on:click={() => publishArticle(article.id)}
				>
					{#if isSubmitting}
						<Pulse size="24" color="white" unit="px" duration="1s" />
					{:else}
						Publish
					{/if}
				</button>
				<button
					class="button"
					style="--color: var(--error)"
					on:click={() => publishArticle(article.id)}
				>
					{#if isSubmitting}
						<Pulse size="24" color="white" unit="px" duration="1s" />
					{:else}
						Reject
					{/if}
				</button>
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
		display: flex;
		align-items: center;
		justify-content: center;
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
