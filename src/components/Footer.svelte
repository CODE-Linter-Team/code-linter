<footer>
	<div class="impressum">
		<div class="impressumContent">
			<p>
				<strong>Address</strong>
				<br />
				CODE Education GmbH
				<br />
				Lohmühlenstrasse 65
				<br />
				12435 Berlin, Deutschland
			</p>
			<p>
				<strong>Contact</strong>
				<br />
				Daniel Azomji
				<br />
				daniel.azomji@code.berlin
				<br />
				+49 123 4567891
			</p>
		</div>
	</div>
	<nav>
		<a href="/legal">Privacy</a>
		<a href="/about">About</a>
		<a href="/about">Dings</a>
	</nav>
</footer>

<style>
	footer {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 50px 0;

		background: var(--vscode-layer1);

		width: 100%;

		min-height: 300px;

		margin-top: 8rem;
	}

	footer a {
		font-weight: bold;
	}

	@media (min-width: 480px) {
		footer {
			padding: 12px 0;
		}
	}
	nav {
		display: flex;

		justify-content: center;
	}
	nav a {
		display: grid;
		place-content: center;

		height: 100%;
		padding: 0.5rem 3rem;
		text-decoration-line: underline;
		color: var(--vscode-text);
	}

	@media (max-width: 42rem) {
		nav {
			flex-direction: column;

			gap: 3rem;
		}
	}
	.impressum {
		color: var(--vscode-text);
		display: flex;
		flex-direction: column;
		justify-content: center;
	}

	.impressum strong {
		color: white;
	}
	.impressum h3 {
		color: white;
		/* align-self: center; */
	}
	.impressumContent {
		display: flex;
		flex-direction: row;

		gap: 7rem;
	}
	@media (max-width: 32rem) {
		.impressumContent {
			flex-direction: column;
			gap: 1rem;
		}
	}

	.impressumContent p {
	}
</style>
