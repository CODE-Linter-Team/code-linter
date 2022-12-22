<script lang="ts">
	import { toast } from '@zerodevx/svelte-toast';

	import ToastTheme from '../../data/toastThemes';
	import Toggle from '../../components/Toggle.svelte';
	import Permission from '../../data/permissions';

	import {
		faCircleCheck,
		faCircleXmark,
		faClock,
		faExternalLinkAlt
	} from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa/src/fa.svelte';

	$: userInfo = {
		permissions: []
	};

	function togglePermission(userId: string, permissionId: string) {
		return function () {
			if (userInfo.permissions.includes(permissionId)) {
				userInfo.permissions = userInfo.permissions.filter((i) => i !== permissionId);
			} else {
				userInfo.permissions = [...userInfo.permissions, permissionId];
			}
		};
	}
</script>

<div class="userList">
	<div class="userCard">
		<div class="row">
			<div class="column">
				<div
					class="avatar"
					style="background-image: url('https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png'); background-size: cover"
				>
					<!-- <span style="background-image: url('{user.profilePictureSrc}')" /> -->
				</div>
			</div>
			<div class="column">
				<h2>Linus Bolls</h2>
				<span class="property" style="min-height: 1rem">linus.bolls@code.berlin</span>
			</div>
		</div>
		<div class="row">
			<div class="column">
				<h2>Permissions</h2>
				{#each Object.values(Permission) as permission, idx}
					<div
						class="booleanRow"
						title={permission.text}
						on:click={togglePermission('', permission.id)}
					>
						<span>{permission.text}</span>
						<Toggle isToggled={userInfo.permissions.includes(permission.id)} />
					</div>
				{/each}
			</div>
			<div class="column">
				<h2>Articles</h2>
				<span class="property">
					<Fa
						icon={faCircleCheck}
						style="padding-right: 0.7rem; color: var(--success); font-size: 1.4rem"
					/>
					0 published
				</span>

				<span class="property">
					<Fa
						icon={faClock}
						style="padding-right: 0.7rem; color: var(--neutral); font-size: 1.4rem"
					/>
					0 pending</span
				>

				<span class="property">
					<Fa
						icon={faCircleXmark}
						style="padding-right: 0.7rem; color: var(--error); font-size: 1.4rem"
					/>
					0 rejected
				</span>
			</div>
		</div>
	</div>
</div>

<style>
	.property {
		display: flex;
		align-items: center;

		color: var(--vscode-text);
		font-weight: bold;
		font-size: 1rem;

		min-height: 52px;
	}
	.userList {
		display: flex;
		flex-direction: column;

		width: 100%;

		max-width: 40rem;
		gap: 3rem;
		margin: auto;
	}
	h2 {
		color: white;
		font-weight: bold;
		font-size: 22px;

		margin: 0;
		margin-bottom: 0px;
	}
	.row {
		display: flex;
		justify-content: space-between;

		gap: 2rem;
	}
	.column {
		display: flex;
		flex-direction: column;
		align-items: start;

		width: 100%;
	}
	* {
		box-sizing: border-box;
	}
	.userCard {
		display: flex;
		flex-direction: column;

		padding: 2rem;
		gap: 2rem;

		background: var(--vscode-card-bg);
		border-radius: 6px;
	}
	.booleanRow {
		display: flex;
		align-items: center;
		justify-content: space-between;

		width: 100%;
		padding: 0.5rem 0rem;

		gap: 1rem;

		color: var(--vscode-text);
		font-weight: bold;
		font-size: 1rem;

		cursor: pointer;
	}
	.booleanRow:hover :global(div) {
		filter: brightness(1.1);
	}
	.avatar {
		--size: 4.5rem;

		display: flex;

		width: var(--size);
		height: var(--size);

		background-size: cover;

		border-radius: 50%;
	}
</style>
