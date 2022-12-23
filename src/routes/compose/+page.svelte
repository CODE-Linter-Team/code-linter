<script lang="ts">
	const defaultMarkdownContent = `## Writing your first article

So you wanna write an article huh?
Easy as cake, just fill out all the required fields and hit \`Submit for review\`.
But please, finish reading this text first :)

### CODE-Linter content guidelines

CODE-Linter presents itself as a respectable platform, so please respect a few rules:

#### Objectivity

#### Respecting others
If you include people inside or outside of CODE in your article, ask them for permission beforehand.
If the article should best remain inside the CODE community, toggle the \`Internal article\` switch at the top of the editor.

#### Topical relevance
Even though CODE is primarily a tech university, we accept articles on any topic given relevance to CODE.

You can tell your article is not suitable for CODE-Linter if:
- its purely focused on tech or current events, consider posting this on a blog instead

### Text format
CODE-Linter uses \`markdown\` as its content format of choice. If you're not familiar with the syntax, you can find a guide [here](https://www.markdownguide.org/basic-syntax/).

#### Images
- Article submissions with foreign image urls will get rejected.
Upload images using the button at the top of the editor instead.
- Submissions with images that you don't have usage rights for will get rejected.

### Submitting your article for review

Once your article is finished, just hit the submit button.
If you're and admin, you can just head.
Otherwise, you'll have to wait until your article either gets published or rejected.
Check the status of your pending articles anytime by clicking on your profile picture at the top of the page.

For any questions, feel free to reach out to @[user](linus.bolls@code.berlin).


![Good luck](https://t4.ftcdn.net/jpg/02/24/11/57/360_F_224115780_2ssvcCoTfQrx68Qsl5NxtVIDFWKtAgq2.jpg "Good luck")

> this is how you do comments
\\- @[user](linus.bolls@code.berlin)`;

	import { writable } from 'svelte/store';
	import { toast } from '@zerodevx/svelte-toast';
	import { Pulse } from 'svelte-loading-spinners';

	import { browser } from '$app/environment';

	import { PUBLIC_SERVICE_URL } from '$env/static/public';

	import ToastTheme from '../../data/toastThemes';
	import Toggle from '../../components/Toggle.svelte';
	import FileInput from '../../components/FileInput.svelte';

	import { Editor } from 'bytemd';
	import gfm from '@bytemd/plugin-gfm';
	import gemoji from '@bytemd/plugin-gemoji';
	import codeUniversityEntityBytemdPlugin from '../../data/codeUniversityEntityBytemdPlugin';

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
		defaultMarkdownContent,
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

	export let fieldContainer: any = null;

	async function submitForReview() {
		const regexEscapedHost = PUBLIC_SERVICE_URL.replace(/\//g, '\\/').replace(/\./g, '\\.');

		/**
		 * see: https://regex101.com/r/bQlEM9/1
		 */
		const selectExternalMarkdownImages = new RegExp(
			`\!\\[.*\\]\\((?!${regexEscapedHost})(.*)\\)`,
			'g'
		);
		const externalImages = $markdownContent.match(selectExternalMarkdownImages);

		if (externalImages != null) {
			toast.push(
				`Foreign image source '${externalImages[0]}' detected, please upload your images via the ui or Ctrl + v`,
				{
					theme: ToastTheme.error
				}
			);
			return;
		}

		if ($title.length < 12 || $description.length < 12 || $topic.length < 1 || $coverImg == null) {
			shouldHighlightInvalidInputs = true;

			fieldContainer.scrollIntoView();

			return;
		}

		const body = {
			title: $title,
			description: $description,
			markdownText: $markdownContent,
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
			markdownContent.set(defaultMarkdownContent);
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
	export let shouldHighlightInvalidInputs = false;
</script>

<div class={'editor' + (shouldHighlightInvalidInputs ? ' editor--highlightInvalidInputs' : '')}>
	<div
		class="booleanRow"
		on:click={() => isInternal.set(!$isInternal)}
		title="Internal articles can only be viewed by users signed into their CODE account"
	>
		<span>Internal article</span>
		<Toggle isToggled={$isInternal} />
	</div>

	<div style="display: flex; flex-wrap: wrap; gap: 2rem" bind:this={fieldContainer}>
		<div class="resizing-column">
			<input bind:value={$title} type="text" placeholder="Article title" minlength="12" required />
			<input
				bind:value={$description}
				type="text"
				placeholder="Article description"
				minlength="12"
				maxlength="42"
				required
			/>
			<input bind:value={$topic} type="text" placeholder="Article topic" minlength="1" required />
		</div>
		<div class="resizing-column">
			<FileInput {files} {setFiles} />
		</div>
	</div>

	<!-- <span class="textBox" role="textbox" contenteditable>{$markdownContent}</span> -->

	<Editor
		value={$markdownContent}
		plugins={[gfm(), gemoji(), codeUniversityEntityBytemdPlugin()]}
		on:change={handleChange}
		previewDebounce={10}
		placeholder="Article content"
		uploadImages={uploadEditorImages}
		editorConfig={{
			theme: 'neo'
		}}
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
	.editor {
		display: flex;
		flex-direction: column;

		gap: 2rem;
	}
	.booleanRow {
		display: flex;
		align-items: center;

		width: 100%;
		height: 40px;
		padding: 0 1rem;

		margin-bottom: -1.5rem;

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
	.resizing-column {
		display: flex;
		flex-direction: column;

		gap: 0.5rem;

		width: calc(50% - 1rem);
	}
	@media (max-width: 52rem) {
		.resizing-column {
			width: 100% !important;
		}
	}
	/* select non-empty invalid inputs*/
	/* input:not(:placeholder-shown):not(:valid) {
		outline: 3px solid var(--error);
	} */

	.editor.editor--highlightInvalidInputs input:invalid {
		outline: 3px solid var(--error);
	}
	/* .editor.editor--highlightInvalidInputs input:not(:valid) {
		outline: 3px solid var(--error);
	} */
	.editor.editor--highlightInvalidInputs
		:global(.dropzoneFileInput.dropzoneFileInput--empty)
		:global(.dropzone) {
		border-color: var(--error);
	}
</style>
