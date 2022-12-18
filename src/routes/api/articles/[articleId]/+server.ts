import { error } from '@sveltejs/kit';
import ArticleController from '../../../../controllers/Article.controller';

import { v4 as getUuid } from 'uuid';

export async function GET(ding: any) {

    const { user } = await ding.locals.getSession()

    const { url } = ding

    const min = Number(url.searchParams.get('min') ?? '0');
    const max = Number(url.searchParams.get('max') ?? '1');

    // const clientIp = rest.getClientAddress()

    // await Article.updateOne({$where: { id: }})

    const d = max - min;

    if (isNaN(d) || d < 0) {
        throw error(400, 'min and max must be numbers, and min must be less than max');
    }

    const random = min + Math.random() * d;

    return new Response(String(random));
}