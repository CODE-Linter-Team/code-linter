<script lang="ts">
	// coverImgSrc: string

	import { writable } from 'svelte/store';
	import { toast } from '@zerodevx/svelte-toast';
	import { Pulse } from 'svelte-loading-spinners';

	import { browser } from '$app/environment';

	import ToastTheme from '../../data/toastThemes';
	import Toggle from '../../components/Toggle.svelte';
	import FileInput from '../../components/FileInput.svelte';

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
	export const markdownContent = registerLocalField<string>(
		'',
		'code-linter:compose-field:markdown-content'
	);
	export const coverImg = registerLocalField<(File & { url: string }) | null>(
		null,
		'code-linter:compose-field:hero-img'
	);
	export const topic = registerLocalField<string>('', 'code-linter:compose-field:topic');
	export let isInternal = registerLocalField<boolean>(
		false,
		'code-linter:compose-field:is-internal'
	);

	let state: { state: 'DEFAULT' } | { state: 'SUBMITTING' } | { state: 'SUBMITTED' } = {
		state: 'DEFAULT'
	};

	function handleChange(e: any) {
		markdownContent.set(e.detail.value);
	}

	async function submitForReview() {
		const body = {
			title: $title,
			description: $description,
			markdownContent: $markdownContent,
			coverImgSrc: $coverImg?.url,
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
			coverImg.set(null);
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

	import { Editor, Viewer } from 'bytemd';
	import gfm from '@bytemd/plugin-gfm';

	const plugins = [
		gfm()
		// Add more plugins here
	];

	$: files = $coverImg == null ? [] : [$coverImg];

	function setFiles(newFiles: any[]) {
		if (newFiles.length === 0) {
			coverImg.set(null);

			return;
		}
		const { data, ...rest } = newFiles[0];

		coverImg.set(rest);
	}
	async function uploadEditorImages(files: File[]) {
		const refinedFiles = await Promise.all(
			files.map(async (i: File) => {
				const formData = new FormData();

				const filenameWithoutExtension = /^(.*)\..*$/;

				const imageTitle =
					i.name.match(filenameWithoutExtension)?.[1] ?? i.name ?? 'Untitled image';

				formData.append('data', i);
				formData.append('title', imageTitle);
				formData.append('alt', imageTitle);

				const options = {
					method: 'POST',
					body: formData
				};
				// const options = {
				// 	method: 'POST',
				// 	headers: { 'Content-Type': i.type },
				// 	body: i
				// }
				const res = await fetch('/api/assets', options);

				const file = res.json();

				return file;
			})
		);
		return refinedFiles.map(({ url, title, alt }) => ({ url, title, alt }));
	}
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
	<FileInput {files} {setFiles} />
	<input bind:value={$title} type="text" placeholder="Article title" />
	<input bind:value={$description} type="text" placeholder="Article description" />
	<input bind:value={$topic} type="text" placeholder="Article topic" />

	<!-- <span class="textBox" role="textbox" contenteditable>{$markdownContent}</span> -->

	<Editor
		value={$markdownContent}
		{plugins}
		on:change={handleChange}
		previewDebounce={10}
		placeholder="Article content"
		uploadImages={uploadEditorImages}
	/>
	<!-- <Viewer value={$markdownContent} /> -->

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

<!-- constDarkBlue: '#569cd6',
propertyLightBlue: '#9adafb',
stringOrange: '#ce9178',
importPurple: '#c586c0',
classGreen: '#4dc9b0',
numberGreen: '#b4cda7',
commentGreen: '#699855' -->

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
	:global(.bytemd) {
		background: var(--vscode-layer1);

		color: var(--vscode-text);
		border: none;
		border-radius: 6px;

		overflow: hidden;

		height: 40rem;
	}
	:global(.bytemd-toolbar) {
		background: var(--vscode-layer1);
		border-bottom: 1px solid var(--vscode-layer3) !important;
	}
	:global(.bytemd-preview) {
		border-left: 1px solid var(--vscode-layer3) !important;
	}
	:global(.CodeMirror) {
		background: var(--vscode-layer1);
		color: var(--vscode-text);
	}
	:global(.markdown-body) {
	}

	:global(.bytemd-status) {
		border-top: 1px solid var(--vscode-layer3) !important;
	}

	:global(.CodeMirror) :global(.cm-header) {
		color: #569cd6;
	}
	:global(.CodeMirror) :global(.cm-link) {
		color: #ce9178;
		text-decoration: none;
	}
	:global(.CodeMirror) :global(.cm-url) {
		color: white;
		text-decoration: underline;
	}
	:global(.markdown-body) :global(h1) {
		color: white;
	}
	:global(.markdown-body) :global(h2) {
		color: white;
	}

	:global(.markdown-body) :global(h3) {
		color: white;
	}
	:global(.markdown-body) :global(h4) {
		color: white;
	}
	:global(.markdown-body) :global(h5) {
		color: white;
	}
	:global(.markdown-body) :global(h6) {
		color: white;
	}
	:global(.markdown-body) :global(a) {
		color: var(--primary);
	}
	:global(.cm-variable-2) {
		color: #569cd6 !important;
	}
	:global(.bytemd-status) :global(input[type='checkbox']) {
		accent-color: var(--primary);
	}
	:global(.CodeMirror) :global(span) {
		color: white;
	}
	:global(.CodeMirror) :global(.cm-quote) {
		color: #699855;
	}
	:global(.CodeMirror) :global(.cm-comment) {
		color: #ce9178;
	}
	:global(.CodeMirror) :global(.cm-meta) {
		color: #ce9178;
	}
	:global(.CodeMirror) :global(.CodeMirror-cursor) {
		border-color: white;
	}
</style>
