import { error } from '@sveltejs/kit';

import connectToDatabase from '../../../modelss/connectToDatabase';
import AssetController from '../../../controllers/Asset.controller';
import UserController from '../../../controllers/User.controller';
import Permission from '../../../data/permissions';

async function readableStreamToBuffer(stream: any): Promise<Buffer> {
	return new Promise<Buffer>((resolve, reject) => {
		const _buf = Array<any>();

		stream.on('data', (chunk: any) => _buf.push(chunk));
		stream.on('end', () => resolve(Buffer.concat(_buf)));
		stream.on('error', (err: any) => reject(`error converting stream - ${err}`));
	});
}

export async function GET({ locals, url, request }: any) {
	await connectToDatabase();

	const types: string[] = url.searchParams.get('types')?.split(',') ?? [];
	const numResults: number = url.searchParams.get('results') ?? 10
	const page: number = url.searchParams.get('page') ?? 0

	const assets = await AssetController.getPaginated(numResults, page, types);

	return new Response(JSON.stringify({ assets }), {
		headers: { 'Content-Type': 'application/json' }
	});
}

export async function POST({ locals, request }: any) {
	await connectToDatabase();

	try {
		const { user } = (await locals.getSession()) ?? {};

		const isLoggedIn = user != null;

		if (!isLoggedIn)
			return new Response('{}', { headers: { 'Content-Type': 'application/json' }, status: 401 });

		const hasPermission = await UserController.hasPermissions(user.email, [
			Permission.SUBMIT_ARTICLES_FOR_REVIEW.id
		]);

		if (!hasPermission) throw error(403, "missing permission: 'SUBMIT_ARTICLES_FOR_REVIEW'");

		const formData = await request.formData();

		const blobData = formData.get('data');

		const arrayBufferData = await blobData.arrayBuffer();

		const data = Buffer.from(arrayBufferData);

		const title = formData.get('title');

		const alt = formData.get('alt');

		const ownerId = user.email;

		const asset = await AssetController.createArticleImage({ data, title, alt }, ownerId);

		return new Response(JSON.stringify(asset), {
			headers: { 'Content-Type': 'application/json' },
			status: 201
		});
	} catch (err) {
		console.error(`uncaught error inside POST /api/assets:`, err);

		return new Response(JSON.stringify({ ok: 0, message: 'failed to upload image' }), {
			headers: { 'Content-Type': 'application/json' },
			status: 500
		});
	}
}
