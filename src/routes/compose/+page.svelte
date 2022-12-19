<script lang="ts">
	// coverImgSrc: string

	import { writable } from 'svelte/store';
	import { toast } from '@zerodevx/svelte-toast';
	import { Pulse } from 'svelte-loading-spinners';

	import { browser } from '$app/environment';

	import ToastTheme from '../../data/toastThemes';
	import Toggle from '../../components/Toggle.svelte';

	function registerLocalField<T extends unknown>(defaultValue: T, key: string) {
		const initialValue = browser
			? JSON.parse(window.localStorage.getItem(key)!) ?? defaultValue
			: defaultValue;

		const field = writable<T>(initialValue);

		field.subscribe((value) => {
			if (browser) {
				window.localStorage.setItem(key, JSON.stringify(value));
			}
		});
		return field;
	}

	export const title = registerLocalField<string>('', 'code-linter:compose-field:title');
	export const description = registerLocalField<string>(
		'',
		'code-linter:compose-field:description'
	);
	export const markdownContent = registerLocalField<string>('', 'code-linter:compose-field:title');
	export const coverImgSrc = registerLocalField<string>(
		'',
		'code-linter:compose-field:markdown-content'
	);
	export const topic = registerLocalField<string>('', 'code-linter:compose-field:topic');
	export let isInternal = registerLocalField<boolean>(
		false,
		'code-linter:compose-field:is-internal'
	);

	let state: { state: 'DEFAULT' } | { state: 'SUBMITTING' } | { state: 'SUBMITTED' } = {
		state: 'DEFAULT'
	};

	async function submitForReview() {
		const body = {
			title: $title,
			description: $description,
			markdownContent: $markdownContent,
			coverImgSrc: $coverImgSrc,
			contentTags: [$topic],
			scope: $isInternal ? 'INTERNAL' : 'PUBLIC'
		};
		state = { state: 'SUBMITTING' };

		try {
			const res = await fetch('/api/articles', { method: 'POST', body: JSON.stringify(body) });

			if (!res.ok) throw new Error();

			title.set('');
			description.set('');
			markdownContent.set('');
			coverImgSrc.set('');
			topic.set('');
			isInternal.set(false);

			state = { state: 'SUBMITTED' };

			toast.push('Submitted article for review', {
				theme: ToastTheme.success
			});
		} catch (err) {
			state = { state: 'DEFAULT' };

			toast.push('Failed to submit article', {
				theme: ToastTheme.error
			});
		}
	}
	$: isSubmitting = state.state === 'SUBMITTING';
</script>

<div class="editor">
	<div
		class="booleanRow"
		on:click={() => isInternal.set(!$isInternal)}
		title="Internal articles can only be viewed by users signed into their CODE account"
	>
		<span>Internal article</span>
		<Toggle isToggled={$isInternal} />
	</div>
	<input bind:value={$title} type="text" placeholder="Article title" />
	<input bind:value={$description} type="text" placeholder="Article description" />
	<input bind:value={$topic} type="text" placeholder="Article topic" />

	<span class="textBox" role="textbox" contenteditable>{$markdownContent}</span>

	<button
		class="button"
		style="--color: var(--primary)"
		on:click={submitForReview}
		disabled={isSubmitting}
	>
		{#if isSubmitting}
			<Pulse size="40" color="white" unit="px" duration="1s" />
		{:else}
			Submit for review
		{/if}
	</button>
</div>

<!-- internal switch
tag select -->
<style>
	.booleanRow {
		display: flex;
		align-items: center;

		width: 100%;
		padding: 0 1rem;

		font-weight: bold;
		gap: 1rem;

		color: white;

		font-size: 1rem;

		cursor: pointer;
	}
	.booleanRow:hover :global(div) {
		filter: brightness(1.1);
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

		height: 3rem;

		font-size: 1rem;

		font-weight: bold;

		width: 100%;
	}
	.button:hover {
		filter: brightness(1.1);
	}
	.editor {
		display: flex;
		flex-direction: column;

		gap: 1rem;
	}
	input {
		height: 2.5rem;

		padding: 0 1rem;

		border-radius: 6px;

		background: var(--vscode-card-bg);

		color: #ccc;

		border: none;

		transition-duration: 0.2s;
	}

	input:hover,
	.textBox:hover {
		filter: brightness(1.1);
	}
	.textBox {
		min-height: 1rem;

		padding: 1rem;

		border-radius: 6px;

		background: var(--vscode-card-bg);

		color: #ccc;

		border: none;

		transition: filter 0.2s;

		font-family: inherit;
	}
</style>
