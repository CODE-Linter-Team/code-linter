<script lang="ts">
	interface User {
		name: string;
		email: string;
		image: string;
	}
	interface Article {
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
	export let color: string;
	export let width: keyof typeof widthMap;

	export const widthMap = {
		FULL: '100%',
		TWO_THIRDS: 'calc(66% - 0.5rem)',
		HALF: 'calc(50% - 0.5rem)',
		ONE_THIRD: 'calc(34% - 0.5rem)'
	};
</script>

<a href={article.url} style={`width: ${widthMap[width]}`}>
	<img src={article.coverImgSrc} alt="dings" class="articleImg" />

	<div class="articleImg codeBlock infoOverlay" style={`background: ${color}`} />

	<div class="infoOverlay">
		<div class="authorInfo">
			<img src={article.author.image} alt="akwe" class="authorPb" />
			<div style="display:flex; flex-direction: column; height: 100%">
				<span class="authorName">{article.author.name}</span>
				<span class="authorDesc">#highfive SE student</span>
			</div>
		</div>
		<span class="contentTags">{article.contentTags[0]}</span>
		<h2>{article.title}</h2>
		<span class="description">{article.description}</span>
	</div>
</a>

<style>
	a:not(:hover) > .infoOverlay .authorName {
		/* transform: translateY(50%); */

		color: transparent;
	}
	a:not(:hover) > .infoOverlay .authorDesc {
		/* transform: translateY(-50%); */

		color: transparent;
	}

	a:not(:hover) > .infoOverlay .authorPb {
		/* transform: scale(0); */

		filter: opacity(0);
	}
	.authorInfo {
		margin-bottom: auto;

		display: flex;
		align-items: center;
	}
	.authorPb {
		width: 2.5rem;
		height: 2.5rem;

		border-radius: 50%;

		transition-duration: 0.3s;

		margin-right: 12px;
	}
	.authorName {
		display: inline-flex;
		transition-duration: 0.3s;

		color: white;
	}
	.authorDesc {
		display: inline-flex;
		transition-duration: 0.3s;

		color: #ddd;
	}
	* {
		box-sizing: border-box;
	}
	a {
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
		overflow: hidden;

		height: 14rem;
	}

	.articleImg {
		object-fit: cover;

		transition-duration: 0.3s;
		width: 100%;
		height: 100%;
	}
	a:hover .articleImg {
		filter: brightness(0.5);
	}

	a:hover .articleImg {
		transform: scale(1.1);
	}

	.contentTags {
		margin-bottom: -5px;

		color: white;
		font-size: 14px;
		text-decoration: none;
	}
	h2 {
		margin: 0;

		color: white;
		font-size: 22px;
		font-weight: bold;
		text-decoration: none;
	}
	.infoOverlay {
		position: absolute;
		display: flex;
		flex-direction: column;
		justify-content: flex-end;

		width: 100%;
		height: 100%;
		padding: 1rem;

		/* background: linear-gradient(0deg, #000000 0%, rgba(0, 0, 0, 0) 100%); */
	}
	.description {
		overflow: hidden;

		transition-duration: 0.3s;

		max-height: 7rem;

		color: #ddd;
	}
	a:not(:hover) .description {
		max-height: 0;
	}
	a:hover .codeBlock {
		background: none !important;
	}
	@media (max-width: 800px) {
		a {
			width: 100% !important;
		}
	}
</style>
