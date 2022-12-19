<script lang="ts">
	export let isToggled: boolean;
</script>

<label>
	<input type="checkbox" checked={isToggled} disabled />
	<div />
	<span />
</label>

<style>
	* {
		box-sizing: border-box;
	}
	*:hover > label > div {
		filter: brightness(1.1);
	}
	label {
		--padding: 5px;
		--height: 26px;
		--width: 58px;

		position: relative;

		width: var(--width);
		height: calc(var(--height) + 2 * var(--padding));

		cursor: pointer;
	}
	input {
		display: none;
	}
	div {
		width: 100%;
		height: 100%;

		border-radius: 99rem;

		transition-duration: 0.2s;
	}
	input:not(:checked) ~ div {
		background: var(--vscode-layer2);
	}
	input:checked ~ div {
		background: var(--primary);
	}

	span {
		position: absolute;

		width: var(--height);
		height: var(--height);

		border-radius: 50%;

		top: var(--padding);

		transition-duration: 0.2s;

		background: white;
	}
	input:not(:checked) ~ span {
		left: var(--padding);
	}
	input:checked ~ span {
		left: calc(var(--width) - var(--height) - var(--padding));
	}
</style>
