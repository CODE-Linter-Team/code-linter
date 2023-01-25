import SvelteKitAuth from '@auth/sveltekit';
import Google from '@auth/core/providers/google';
import connectToDatabase from './modelss/connectToDatabase';
import User from './modelss/User';
import Article from './modelss/Article';
import Asset from './modelss/Asset';
import Permission from './data/permissions';

import importNotionData from "./data/importNotionData"

import { SECRET_SERVICE_AUTH_SECRET, SECRET_GOOGLE_ID, SECRET_GOOGLE_SECRET } from '$env/static/private'

import { PUBLIC_SERVICE_URL } from "$env/static/public"

import { config } from "dotenv"

config()

export const handle = SvelteKitAuth({

	// hahaha :DDD
	trustHost: true,
	providers: [Google({ clientId: SECRET_GOOGLE_ID, clientSecret: SECRET_GOOGLE_SECRET })],
	secret: SECRET_SERVICE_AUTH_SECRET
});

async function seedDatabase() {

	await connectToDatabase()

	await User.deleteMany();
	await Article.deleteMany();
	await Asset.deleteMany()

	await importNotionData()

	const ALL_PERMISSIONS = Object.keys(Permission);

	const linus = new User({
		name: 'Linus Bolls',
		email: 'linus.bolls@code.berlin',
		image: 'https://lh3.googleusercontent.com/a/AEdFTp6PSy2Omni3BiexQvgjuZwIoUsnujabr6eVZvC0=s96-c',
		permissions: ALL_PERMISSIONS
	});
	await linus.save();

	const laurin = new User({
		name: 'Laurin Notemann',
		email: 'laurin.notemann@code.berlin',
		image: 'https://lh3.googleusercontent.com/a/AEdFTp4DZtIehcTa3BXJ0Wh-ykeGj43bWgVeT3DB0UMO=s96-c',
		permissions: ALL_PERMISSIONS
	});
	await laurin.save();

	const daniel = new User({
		name: 'Daniel Azomji',
		email: 'daniel.azomji@code.berlin',
		image:
			'https://lh3.googleusercontent.com/a-/AD5-WClbXchZjeOgyZG8IG8iojnarP5nvv18RJlHjHM3OAtlEdsFRX4SvQJWLUVJUeLn=s96-c',
		permissions: ALL_PERMISSIONS
	});
	await daniel.save();

	const testArticle = new Article({
		scope: 'PUBLIC',
		state: ['PUBLISHED'],

		authorId: 'linus.bolls@code.berlin',
		publisherId: 'linus.bolls@code.berlin',

		coverImgSrc: 'https://cdn.pixabay.com/photo/2017/02/20/18/03/cat-2083492__340.jpg',
		title: `Ab wann sind Klimaaktivisten eine "kriminelle Vereinigung"?`,
		description:
			'Sie kleben sich an Straßen und Gemälde oder blockieren Rollfelder. Doch das sind nicht die Gründe für die bundesweite Razzia gegen einige Aktivisten der "Letzten Generation".',
		contentTags: ['Technology'],
		submittedDate: 0,
		publishedDate: 0,
		markdownText: `## 2021 Wrap-Up | Malik Piara

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
	});
	testArticle.url = PUBLIC_SERVICE_URL + "/articles/" + testArticle._id
	await testArticle.save();
}
// seedDatabase();	