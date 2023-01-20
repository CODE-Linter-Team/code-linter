import type { LayoutServerLoad } from './$types';

import * as env from "$env/static/public"

console.log(".env:", env)

export const load: LayoutServerLoad = async (event) => {
	return {
		session: await event.locals.getSession()
	};
};
