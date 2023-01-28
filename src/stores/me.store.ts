import { onMount } from 'svelte';
import { writable } from 'svelte/store';
import { page } from '$app/stores';
import type { Session } from '@auth/core';

import { PUBLIC_SERVICE_URL } from '$env/static/public';

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

	permissions: string[];
}
interface LoadingMe {
	isSignedIn: true;
	isLoading: true;

	permissions: string[];
}
type AdditionalFetchedInfo = SignedOutMe | SignedInMe | LoadingMe;

type Me = Session['user'] & AdditionalFetchedInfo;

const DEFAULT_PERMISSIONS: string[] = [];

const me = writable<Me>({ isSignedIn: true, isLoading: true, permissions: DEFAULT_PERMISSIONS });

export function watch() {
	page.subscribe(async (data) => {
		const isSignedIn = Object.keys(data.data.session || {}).length > 0;

		if (!isSignedIn) {
			me.set({
				isSignedIn: false,
				isLoading: false,
				permissions: DEFAULT_PERMISSIONS
			});
			return;
		}
		const res = await fetch(PUBLIC_SERVICE_URL + '/api/me');

		interface MeData {
			permissions: string[];

			articleInfo: {
				publishedCount: number;
				pendingCount: number;
				rejectedCount: number;
			};
		}

		const meData: MeData = await res.json();

		console.log('meData.', meData);

		me.set({
			isSignedIn: true,
			isLoading: false,
			...meData,
			permissions: meData.permissions ?? []
		});
	});
}
export default me;
