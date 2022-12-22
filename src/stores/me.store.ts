import { onMount } from 'svelte';
import { writable } from 'svelte/store';
import { page } from '$app/stores';
import type { Session } from '@auth/core';

import { PUBLIC_SERVICE_URL } from "$env/static/public"

interface SignedInMe {
	isSignedIn: true;
	isLoading: false;

	permissions: string[];

	articleInfo: {
		publishedCount: number;
		pendingCount: number;
		rejectedCount: number;
	};
}
interface SignedOutMe {
	isSignedIn: false;
	isLoading: false;
}
interface LoadingMe {
	isSignedIn: true;
	isLoading: true;
}
type AdditionalFetchedInfo = SignedOutMe | SignedInMe | LoadingMe;

type Me = Session['user'] & AdditionalFetchedInfo;

const me = writable<Me>({ isSignedIn: true, isLoading: true });

export function watch() {
	page.subscribe(async (data) => {
		const isSignedIn = Object.keys(data.data.session || {}).length > 0;

		if (!isSignedIn) {
			me.set({
				isSignedIn,
				isLoading: false
			});
			return;
		}
		const res = await fetch(PUBLIC_SERVICE_URL + '/api/me');

		const meData: {
			permissions: string[];

			articleInfo: {
				publishedCount: number;
				pendingCount: number;
				rejectedCount: number;
			};
		} = await res.json();

		me.set({
			isSignedIn,
			isLoading: false,
			...meData
		});
	});
}
export default me;
