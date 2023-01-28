<script lang="ts">
	import { faImage, faClose } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa/src/fa.svelte';
	import { toast } from '@zerodevx/svelte-toast';
	import Dropzone from 'svelte-file-dropzone';

	import ToastTheme from '../data/toastThemes';

	export let maxFiles = 1;

	export let maxSizeMb = 1;

	export let setFiles: (files: (File & { url: string })[]) => any;

	export let files: (File & { url: string })[];

	$: isFull = files.length >= maxFiles;

	$: hasFiles = files.length > 0;

	async function removeFile(idToBeRemoved: string) {
		setFiles(files.filter((i) => i.id !== idToBeRemoved));
	}

	async function handleFilesSelect(e: any) {
		const { acceptedFiles, fileRejections } = e.detail;

		const refinedAcceptedFiles = await Promise.all(
			acceptedFiles.map(async (i: File) => {
				const formData = new FormData();

				formData.append('data', i);
				formData.append('title', 'Das gute Bild');
				formData.append('alt', 'sus baker machen');

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
		setFiles([...files, ...refinedAcceptedFiles]);

		for (const fileRejection of fileRejections) {
			toast.push(
				`Failed to upload '${fileRejection.file.name}': ${fileRejection.errors[0].message}`,
				{
					theme: ToastTheme.error
				}
			);
		}

		//     createAsset: (payload: File) =>
		// rawmey.post<{ asset: Asset }>(`/assets`, payload, {
		//   headers: { "Content-Type": payload?.type },
		// }),

		// async function getPictureIds(fileState: FileState) {
		//   const oldImageIds = Object.values(fileState)
		//     .filter((i) => i.id != null)
		//     .map((i) => i.id);

		//   const promises = Object.values(fileState)
		//     .filter((i) => i.file != null)
		//     .map((i) => roomey.createAsset(i.file as File));

		//   const newImageIds = (await Promise.all(promises)).map(
		//     (i) => (i.data as any).id
		//   );

		//   return [...oldImageIds, ...newImageIds];
		// }
	}
</script>

<div class={'dropzoneFileInput' + (hasFiles ? '' : ' dropzoneFileInput--empty')}>
	{#if hasFiles}
		{#each files as file}
			<div class="uploadedImageContent">
				<button class="closeButton" title="Remove image" on:click={removeFile(file.id)}>
					<Fa icon={faClose} />
				</button>
			</div>
			<div style={`background-image: url('${file.url}')`} class="uploadedImage" />
		{/each}
	{/if}
	{#if !isFull}
		<Dropzone
			on:drop={handleFilesSelect}
			multiple={maxFiles > 1}
			disabled={isFull}
			maxSize={maxSizeMb * 1000000}
			accept="image/*"
		>
			<Fa icon={faImage} />
			<span>{`Click or drag and drop to add a hero image (max size is ${maxSizeMb}mb)`}</span>
		</Dropzone>
	{/if}
</div>

<!-- accept
maxSize
multiple


containerClasses -->

<!-- <label>
	<input type="file" multiple={maxFiles > 1} />

	<Fa icon={faImage} />
	<span>Click or drag and drop to add a hero image</span>
</label> -->

<!-- import { Flex, useToast } from "@chakra-ui/react";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import profileSettings from "../../data/profile.settings";

interface FileType {
  id?: string;
  file?: File;
  url: string;
}
type FileState = { [key: string]: FileType };

interface FileInputProps {
  useFormValue: any;
  field: string;

  maxBytes?: number;
  minFiles?: number;
  maxFiles?: number;
  type?: "standart" | "avatar";

  [key: string]: any;
}

function FileInput({
  maxBytes = profileSettings.maxFileSizeBytes,
  useFormValue,

  minFiles = 0,
  maxFiles = 1,
  children,
  field,
  type = "standart",
  ...props
}: FileInputProps) {
  const toast = useToast();

  const { watch, setValue } = useFormValue;

  const files: FileState = watch(field);

  const onDrop = useCallback((newFiles: File[]) => {
    const numFiles = newFiles.length + Object.values(files).length;

    const oversizedFiles = newFiles.filter((i) => i.size > maxBytes);

    if (numFiles < minFiles) {
      toast({
        title: "Not enough files",
        description: `You only selected ${newFiles.length} files, but have to at least upload ${minFiles}`,
        status: "error",
        duration: 9000,
        isClosable: true,
        position: "bottom-right",
      });
      return;
    }
    if (numFiles > maxFiles) {
      toast({
        title: "Too many files",
        description: `You selected ${newFiles.length} files, but can at most upload ${maxFiles}`,
        status: "error",
        duration: 9000,
        isClosable: true,
        position: "bottom-right",
      });
      return;
    }
    if (oversizedFiles.length) {
      toast({
        title: "File(s) to large",
        description: `Max file size is ${maxBytes / 1000000} mb, ${
          oversizedFiles.length
        } files exceed this limit`,
        status: "error",
        duration: 9000,
        isClosable: true,
        position: "bottom-right",
      });
      return;
    }

    (async () => {
      const processedNewFiles = await Promise.all(newFiles.map(addUrl));

      const newFilesObj: FileState = processedNewFiles.reduce(
        (prev, i) => ({ ...prev, [(i.file as any).path]: i }),
        {}
      );
      setValue(field, {
        ...files,
        ...newFilesObj,
      });
    })();

    // for (const file of newFiles) {
    //   const reader = new FileReader();

    //   reader.onabort = () => console.log("file reading was aborted");
    //   reader.onerror = () => console.log("file reading has failed");
    //   reader.onload = () => {
    //     const newFile: FileType = {
    //       file,
    //       url: reader.result as string,
    //     };

    //     setValue(field, {
    //       ...files,
    //       [(file as any).path]: newFile,
    //     });
    //   };
    //   reader.readAsDataURL(file);
    // }
  }, []);

  const addUrl = (file: any): Promise<FileType> =>
    new Promise((res) => {
      const reader = new FileReader();

      reader.onabort = () => console.log("file reading was aborted");
      reader.onerror = () => console.log("file reading has failed");

      reader.onload = () => {
        const newFile: FileType = {
          file,
          url: reader.result as string,
        };
        res(newFile);
      };
      reader.readAsDataURL(file);
    });

  const { getRootProps, getInputProps, isDragAccept } = useDropzone({ onDrop });

  const hasFiles = Object.keys(files).length > 0;

  const hasFilesStyle = {
    width: "10rem",
    height: "10rem",
    flex: "1 1 auto",
  };
  const noFilesStyle = {
    height: "3rem",
    width: "100%",
  };

  const standartStyle = {
    borderRadius: "2px",
  };
  const avatarStyle = {
    borderRadius: "50%",
    height: "100%",
  };

  return (
    <Flex
      {...getRootProps()}
      border={
        isDragAccept
          ? "2px dashed white"
          : "2px dashed var(--chakra-colors-chakra-border-color)"
      }
      {...(hasFiles ? hasFilesStyle : noFilesStyle)}
      {...(type === "avatar" ? avatarStyle : standartStyle)}
      align="center"
      justify="center"
      bg="whiteAlpha.50"
      _hover={{ bg: "whiteAlpha.100" }}
      transitionProperty="common"
      transitionDuration="normal"
    >
      <input {...getInputProps()} {...props} multiple={maxFiles > 1} />
      {children}
    </Flex>
  );
}
export default FileInput;
export type { FileInputProps, FileType, FileState }; -->
<style>
	.uploadedImage {
		position: absolute;

		width: 100%;
		height: 100%;

		object-fit: cover;
		background-size: 100%;

		box-shadow: 0 0 16px 0 rgba(0, 0, 0, 0.2);
	}
	.uploadedImageContent {
		position: absolute;

		z-index: 999;

		width: 100%;
		height: 100%;

		transition-duration: 0.2s;

		background: rgba(0, 0, 0, 0.2);

		filter: opacity(0);
	}
	.uploadedImageContent:hover {
		filter: opacity(1);
	}
	.closeButton {
		position: absolute;
		display: flex;
		align-items: center;
		justify-content: center;

		width: 3rem;
		height: 3rem;

		right: 0;
		top: 0;

		background: none;
		border: none;
		color: white;

		font-weight: bold;

		cursor: pointer;

		transition-duration: 0.2s;
		border-bottom-left-radius: 6px;
	}
	.closeButton:hover {
		background: rgba(0, 0, 0, 0.2);
	}
	*,
	:global(*) {
		box-sizing: border-box;
	}
	input {
		display: none;
	}
	.dropzoneFileInput {
		position: relative;

		width: 100%;
		height: 100%;

		border-radius: 6px;
		overflow: hidden;
	}
	.dropzoneFileInput :global(.dropzone) {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;

		width: 100%;
		height: 100%;

		background: var(--vscode-layer1);

		border-radius: 6px;

		transition: filter 0.2s;
		cursor: pointer;

		border: 2px dashed var(--vscode-layer2);
	}
	.dropzoneFileInput :global(.dropzone):hover {
		filter: brightness(1.1);
	}
	.dropzoneFileInput :global(.dropzone) :global(svg) {
		color: white;

		font-size: 2rem;
	}
	span {
		color: var(--vscode-text);

		margin-top: 1rem;
	}
</style>
