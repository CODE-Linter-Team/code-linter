import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async (event) => {

	const Theme = {
		light: "light",
		dark: "dark",
	}

	const themeId = event.cookies.get("code-review-theme")

	// @ts-ignore
	const theme = Theme[themeId] ?? Theme.dark

	return {
		theme,
		theme,
		session: await event.locals.getSession()
	};
};
