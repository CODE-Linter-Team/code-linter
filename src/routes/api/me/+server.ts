import UserController from '../../../controllers/User.controller';
import Permission from '../../../data/permissions';
import connectToDatabase from '../../../modelss/connectToDatabase';
import User from '../../../modelss/User';

export async function GET({ locals }: any) {
	const DEFAULT_PERMISSIONS: string[] = [Permission.SUBMIT_ARTICLES_FOR_REVIEW.id];

	await connectToDatabase();

	interface SessionUser {
		name: string;
		email: string;
		image: string;
	}
	const { user } = (await locals.getSession()) ?? {};

	if (user == null) {
		return new Response(
			JSON.stringify({
				isSignedIn: false,
				wasJustCreated: false,
				me: null
			}),
			{ headers: { 'Content-Type': 'application/json' } }
		);
	}

	const userDoc = await User.findOne({ email: user?.email });

	if (userDoc == null) {
		const newUser = new User({
			...user,
			permissions: DEFAULT_PERMISSIONS
		});
		await newUser.save();

		const { permissions, name, email, image } = newUser;

		const articleInfo = await UserController.getArticleInfo(email!);

		const me = { permissions, name, email, image, articleInfo };

		return new Response(JSON.stringify({ isSignedIn: true, wasJustCreated: true, me }), {
			headers: { 'Content-Type': 'application/json' }
		});
	}

	// @ts-ignore
	const { permissions, name, email, image } = userDoc;

	console.log('fetched permissions', permissions);

	const articleInfo = await UserController.getArticleInfo(email!);

	const me = { permissions, name, email, image, articleInfo };

	return new Response(
		JSON.stringify({ isSignedIn: true, wasJustCreated: false, me, permissions }),
		{
			headers: { 'Content-Type': 'application/json' }
		}
	);
}
