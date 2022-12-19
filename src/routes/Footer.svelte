<footer>
    <div class="impressum">
        <h3>Impressum</h3>
        <div class="impressumContent">
            <p>
                <strong>Address</strong>
                <br>
                CODE Education GmbH
                <br>
                Lohmühlenstrasse 65
                <br>
                12435 Berlin
                <br>
                Deutschland
                <br>
            </p>
            <p>
                <strong>Contact</strong>
                <br>
                Name: Daniel Azomji
                <br>
                Email: daniel.azomji@code.berlin
                <br>
                Tel.: +49 123 4567891
            </p>
        </div>
    </div>
    <nav>
        <a href="#">Privacy</a>
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

		height: 300px;

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

    .impressum strong  {
        color: white
    }
    .impressum h3{
        color : white;
        /* align-self: center; */
    }
    .impressumContent {
        display: flex;
        flex-direction: row;
    }

    .impressumContent p {
        min-width: 250px;
        align-self: center;
    }
</style>