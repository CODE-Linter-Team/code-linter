<script>
	import SvelteMarkdown from 'svelte-markdown';

	const testArticle = {
		coverImgSrc: 'https://cdn.pixabay.com/photo/2017/02/20/18/03/cat-2083492__340.jpg',

		title: `Ab wann sind Klimaaktivisten eine "kriminelle Vereinigung"?`,
		description:
			'Sie kleben sich an Straßen und Gemälde oder blockieren Rollfelder. Doch das sind nicht die Gründe für die bundesweite Razzia gegen einige Aktivisten der "Letzten Generation".',
		tags: ['Technology'],
		author: {
			name: 'Linus Bolls',
			profilePictureSrc: 'https://randomuser.me/api/portraits/med/men/75.jpg'
		},
		articleUrl: '/articles/test',
		publishedDate: 0,
		id: 0,
		markdownText: `# 2021 Wrap-Up | Malik Piara

We are very excited to share today’s 2021 wrap-up which is dedicated to Malik Piara, #NextGeneration Product Management student.

This semester Malik decided to focus on philosophy and social psychology, believing product management and leading a company narrow down to decision-making. Malik is currently learning and absorbing everything from Aristotle and is working on the 5 Science, Technology, and Society (STS) modules. Malik’s free time is mostly spent writing on Moonwith. Moonwith is Malik’s blog about emotional intelligence and decision-making and building Earnest: cards for deeper conversations.

## What are you doing next?

I want to work on startup mentoring program anyone in Portugal can have access to, regardless of the city they live in, their connections or their income. I’m also currently planning ‘Fingerprint’, a conference for people who want to build the future. On my free time, I’ll keep honing software engineering skills and building new products every Sunday.

## A moment I almost lost hope…

Having to close Upframe after 5 years of work and after already having moved to Lisbon and sold some of my things to keep the boat afloat was rock bottom. I couldn’t leave my bed for a week.

## My biggest challenge this year/semester;

Keeping my mental health in check and realising the startup life is not everything. It’s okay to take breaks. And there are other paths that can be equated with success. Overworking should not be glorified.

## My greatest success…

One year ago I didn’t know Python, Flask or NoSQL. I had never built an app before. This year I worked on 4 apps and I launched a job board for startups in Portugal which is helping people every day. I’m so proud and I would not believe that would be possible if you told me. You can learn anything. I truly believe in that.

## I’m proud of myself because… 

I’m proud to have taken steps towards improving myself and letting go of my unhealthy obsession with work. This included seeking a coach, a therapist and a personal trainer that are here to keep me balanced. I know most people cannot afford this and I feel incredibly fortunate.

## People that really helped me this year…

Ben Bachem, Jonathan Freiberger, Moritz Eich, Hanno Grimm, Teodora Trposka, Johann Hemmann, Dennis Willmann and Lukas Müller kept me sane while I felt alone in Lisbon. And they helped accelerate my learning. That’s one of the things I love about CODE. I’m smiling thinking about how many people are there for me and with whom I can learn anything I want faster than I could ever before.
`
	};
</script>

<article>
	<img src={testArticle.coverImgSrc} class="headerImg" />
	<SvelteMarkdown source={testArticle.markdownText} />
</article>

<style>
	.headerImg {
		width: 100%;
		height: 14rem;

		object-fit: cover;
	}
	article {
		color: var(--vscode-text);

		max-width: 42rem;
	}

	article h1 {
		color: white;
	}

	article h2 {
		font-weight: bold;
		color: white !important;
	}

	article p {
	}
</style>
