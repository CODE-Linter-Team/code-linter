// import bufferToDataUrl from "buffer-to-data-url"

import { readFile, writeFile } from 'fs/promises';
import { join } from 'path';
// import generateCommunityCard from "./generateCard"

const JSON_PATH = '/Users/linusbolls/downloads/Knowledge Space-People-db.json';
const ASSET_DIR = '/Users/linusbolls/downloads/code-people-imgs/';
const OUT_DIR = '/Users/linusbolls/projects/code-community-card-creator/out';

import connectToDatabase from '../modelss/connectToDatabase';
import UserController from '../controllers/User.controller';

type Status = string[] | undefined;

const isTechstartStatus = (s: Status) => ['Techstarter', 'Techstart Alumni'].includes(s?.[0] ?? '');

const isStaffStatus = (s: Status) =>
	[
		'Freelance staff member',
		'Permanent staff member',
		'Staff member on leave',
		'Working student (other university)'
	].includes(s?.[0] ?? '');

const isFacultyStatus = (s: Status) =>
	['Freelance faculty member', 'Permanent faculty member'].includes(s?.[0] ?? '');

const isStudentStatus = (s: string[] | undefined) =>
	[
		'Active student',
		'Student on leave',
		'Exchange Student',
		'Graduate (alumn*)',
		'Techstarter',
		'Techstart Alumni'
	].includes(s?.[0] ?? '');

const isAlumniStatus = (s: string[] | undefined) =>
	['Graduate (alumn*)', 'Techstart Alumni'].includes(s?.[0] ?? '');
// const isStatus = (s: Status) => [].includes(s?.[0] ?? "")

const status = [
	'Active student',
	'Student on leave',
	'Exchange Student',

	'Graduate (alumn*)',

	'Techstarter',

	'Techstart Alumni',

	'Freelance staff member',
	'Permanent staff member',
	'Staff member on leave',
	'Working student (other university)',

	'Freelance faculty member',
	'Permanent faculty member',

	'Member of the University Council',
	'CODE partner',
	'Honorary Community Member'
];

const getPersonClass = (classes: any, person: any) => {
	const studyProgram = Object.values(classes).filter((c) =>
		person.props.Labels?.some((l) => l === c.onNotion)
	)[0];

	if (studyProgram != null) return studyProgram;
	if (isFacultyStatus(person)) return classes.faculty;
	if (isStaffStatus(person)) return classes.staff;

	return classes.other;
};

const toPerson = () => async (i: any) => {
	let imgDataUrl = Buffer.from(
		'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD//gA7Q1JFQVRPUjogZ2QtanBlZyB2MS4wICh1c2luZyBJSkcgSlBFRyB2NjIpLCBxdWFsaXR5ID0gODUK/9sAQwAFAwQEBAMFBAQEBQUFBgcMCAcHBwcPCwsJDBEPEhIRDxERExYcFxMUGhURERghGBodHR8fHxMXIiQiHiQcHh8e/9sAQwEFBQUHBgcOCAgOHhQRFB4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4e/8IAEQgBfAF8AwEiAAIRAQMRAf/EABwAAQACAgMBAAAAAAAAAAAAAAAGBwIFAQQIA//EABYBAQEBAAAAAAAAAAAAAAAAAAABAv/aAAwDAQACEAMQAAABtgZoAAICgAAgAKAAAAAACAoICgAAAAgAAAAAAAAKCAAAAAAAAAAAAAAoIAAAAAAAAAAAAAACggAKCAAAAoAICggAKAAACAoIAAAAAAAACggAAAAKCAAoIAAAAAAAAAAACggAAAKCAAAAAAAAAAAAAAAAAAAAAAAoAAICggKAAAaauktzqUJ8a9D/AH847cvdAZ5GQUEBQAAAQFAAABAAAAAAAEN2VJ1zgUAAkMeHobsU3cmQAAAAAAAAAAAAAAAAA6BUMeNAAAAF00tOYtUQAAAAAAAACgAAgKCAoCNSWOJSg0AAAASOOSQuoZoAIACgAAgKCAAAAAAAOp2x5y4lcU0AAAAT6A3lG8EAAAAAAAAAAAAAAAoIBqqN9Dx2qTdvqUAAJofa1MM8gAAAAAAAAAAAAAAAUEYa+niZSqifrV/QHGdFOa30MPP++uLAjUnitckxklG5HoxX1gwAAAAAAAACgAAgKCArUdujbMOkUABse9oButV8gAAnsCHo5XthZAAoIAAAAAACggAAjxAIiaAAAAAAAAZXjRkni5xAAAAAKCAoIAAAAqK3PPddYUAAAAAAAABfO1gM+yAAAAAABQQFBAUE19A3rRVBQAAAAAAAAE3teoLfgIAAAAAABQQAFBOrA7GFbY2WKxxtBVXY2mKr4tUVVxawqnm1RVXNqCrebRFYZWaK1zscROWEAAAAAAAAAoIAACggAAKACAAAAAAAAAAAAoAIAAACggAAAAAAKCAAAAAAAAAoIAAAACggKACAAAAAAoIACggAKCAoIAAAACggAKCAAAAAAAAAAAAAAoICggKCAAAAoIAAAAAAAAAAAAACgAgAKCAoIAAAACggKCAAAAAAAAf/xAAnEAABAwMDBAIDAQAAAAAAAAAEAgMFAAEGFkBQERIUMBAgEzWQIf/aAAgBAQABBQL+K172Ta5YlqbeZc4yRkhQUm5AY9d1112/wLJHDVHZE25dCkrTw8/MWEpxanF/aHlHgHBnmyGeFnT7ABqUpSvRjsjcMnhcgL8uS9WNl+VG8HIvfgB9eHPdp3B5NfpDevG79Jrg8lT3Q3rxlPdM8GY1+cW9r2v6sNY6k8Jk4fjSHqgxPDjuElQ0HCEMuMPejF427zvDTMW3INljPCvfaEhHCboSlCOEcWltEhkaUrjJAc9ooZgps3Gr0/FSDNXYetTYZblCwB7tR0IIJe97WtI5FZsiMlBj7cFInMAsykkQeumnFtOR+RqtQpwhVvla0oSbPBMVJSpR3wlSkqhZ7v4GVPaAHMJeLf8Aq0cY1VpmTtS5WRXTjjjt/rj0zdq++MIbFGkC3TSdhi8p323uTSHlF7FKroVCm2OC3eQGeHHbPGzPFkd3lhP5ZHaRJHlR25v/AJYp275O0wx7qPuZJfZHbXDldJDczf6na4l+23JbPkC6XtWl71phdaYdrTD9aZIrTJNaZKrTJdaaLrTRdaaLrTRdaZLrTJVaZJrTD9aYerTDlaXVWl6iIa0eT/H3/8QAFBEBAAAAAAAAAAAAAAAAAAAAkP/aAAgBAwEBPwEQP//EABYRAAMAAAAAAAAAAAAAAAAAABFwgP/aAAgBAgEBPwFOCpP/xAA/EAABAgEFCgsIAQUAAAAAAAABAgMABBESITETIiMyNEBBUFGhIDAzUmFicYGR0eEQQnKCkqOxwZBDc4OT8f/aAAgBAQAGPwL+FackCK5UyPnEYN1CuxU+rMKudehAtiZmZhHRb4xSdcWs9Yz+3BShc3NNYgIliLmeemyApJCgbCNUGTyeYv6TzIK1qKlG0nhzVrZOMjyhLzSqSFWampDlV1IH7gqUZyayeJuThwDhr6p26mXMbxu8TxaaRv27w6kee0pQSOMcZ0LRP3jUj3TMN/GMdM43akf6Jjv4xnonO7UjrPPSRExqI4t6UaEpojv1KXEjBvXw7dPFobOOb5fbqVTKqjak7DCmXU0VpNY4kSx5ODRiDnHU8+I8nFV5wWn0FKvzww9KgUM6BpVAQkAJFgGpStaglItJijI2wsA1qVpik0ZljGQbRFzfbC09MUpG98q/OL6SuH4a/wARWy4Pli8kzyvkMYRKWU9YwFqF2c2q8onJmAgIkiEuITjKOnsjBqouaUKt1HdHlfCkWmMIaLfuoFg9gcbWUKFhEBEtRS66PKMC+hXRPX4cCktQSNpMENqu69ibPGJlqoN8xNnsCkkgiwiAxLiArQ5t7dQ3RdajiJ2wXnlTqO7hYOVPAbKUZUrwEVytzuqidxxaz1jPwkyWVqwdiFn3fTP1Pum9TvhT7vcNgzESF9V8OTV+s+uDZwLW85kFJMyhWDCXP6gqWOnPFFJwi71GaJSo4N29V+s8DIN6yN5zVl44xF9251PDrx99ROavsc1VId//ADOpQvY2r8Zs4jnN/vOpT/bObf4znTjBM1NJTPGW/b9Yy37frGWJ+j1jK0fTGVN+EZS14GMoZ3xy7O+OXY3xy7G+OXY3xy7G+OXY3xy7O+MoZ3xlDW+Mpb8IypH0xlafojLR/r9Yy37frBfu90vaM1Gb+H7/xAArEAEAAQEECQQDAQAAAAAAAAABEQAhMUHRQFBRYXGBkcHwIDCh8RCx4ZD/2gAIAQEAAT8h/wAVo4jasUrCW/Or4R7Vi+UE2l5U22av9btW+ZSr5/GM0gWPi/E0cZ95zl580BcpRI6oFSs2h/VJeeUSvrFTStG7fsNDzBKNTKFHnbJTN3yG1fZN3FSuwM2pmTI3JL3m+2hZn4sXPTUiHMcUIs+fcRt/aGS6kePi+L7jxftdSLG/iPuLD27r1ILvdUpkaiEcPbZgsXGU9vnUqQ5yDA78/aCWC+obx1xhysNSwtdl1Iogk9m1KVsc3gfvU8doK5v3blDhV2wbRx9d6d62ZJQC1gEAalCFsogKF34DDcDvViCLV9pvpjueWnBwqagTzsUkxhiI0ThDeqQjhlC47RTPQp4B4dhwozMCVWwpdCYU3c1QWDMk2mo7wx3h3VK4RtX2P4tMVrhKN4CreeSji67rqW+hsH3wii1PBfxNNuzNlzbfwzdpRCNE7tF2djjqFdg4W15U6u6GA2G7040fALax0oSDnP2o6D8Z+lb+5L+3qkSu0Oh8Rp8eoOawCmItbMPCDQUsCLZvPNmnI1pII5720Jq7YF40rYODtrnplgZyZb3kaIkQQ7IcXX96Y10h+R7aJwqeUweBY6UhFYFtIRb1V0WTG75CNKMVeo6tG2fK9BnpU7PRjyeGlFBOzExJTgKhwBU4dU4HU51sOppw6DzslePkrwslfeZK+8yV95kr7jJXh5K8DJR/Lp9voxOuoxuuzoxaQ2qU9KXgUpbfu/x+/9oADAMBAAIAAwAAABD777/777//AO++++++/wDv/vvvvv8A/wD/AP8A/wD/APfvf/fff/8A/wD/APf/AP8A+/8Af/8A/wD99/8A/wD/AP8A/wD7/wD+/wD/AP8A++/+/wD9vvnv/v8A/wD/AP8A/wD/AP8A7/8A/wD/AP7/AP8Av/8A/wD/AP8A/wD/AP8A/wD+/wD/AP8A+/8A/wD/AP8A/wD/AP8A/wD3/wD/AP8A/wD/AP8A/wD/APvvv9r1vvum5We/v/vvvv8A7777/wD/AP8A/v322DjTh/3/AN99/wD/AP3/AN9//wD/AP3+gAACAL//AP8A/f8A/wD/APvvr/v+vuwAAAABPvv/AP777/7/AP8A/wD/AP8A/wD+AAAAA7//AP8A/wD/AP8A/wD/AP8A/wD/AP8Av/3SACBH/wD/AP8A/wD/AP8A/wD/AP8A/wD/AN+/vTZNZFWz/wD/AP8A/wD/AP8A+++/+/8ArQAAEMAEAF//AL/f/wD/AP8A/wC//wD/AMwAAAAQgATL/wB//wD/AL/7/wD/AP8A/kAAAAAAAABDf/8A/wD/AP8A+/8Av/vywCAAAAAAAAFf/wD/AP8A/wD/AO//APv/AO/011231301/wD/AP8A/wD/AP8A/wC//wDfvf8A/wC+/wD/AP8A/wD/AP8A/wD/AP8A++//AP8A/wC//wD/AP8A/wD9P/8A33//AN//APv/AP8A/wD/AL/77/8A/wD/AP8A+/8A/P8A/wC/+/8A/wD/AP8Av/8A7/8A/wD/AP8A/wD/AP8A/wD/AP8A+/8Av/v/AP8A/wDv/wD/AP8A/wD/AP8A/wD/AP8A/wD77/8A+/8Av/8A/wD/APu/v/8A/wD/AP8A/wD/AP/EAB0RAAIBBAMAAAAAAAAAAAAAAAERMAAQQHAgUGD/2gAIAQMBAT8Q026eKfcOypdoJjkGMTLitOf/xAAdEQADAAICAwAAAAAAAAAAAAAAAREwQCBwECEx/9oACAECAQE/EOmoTwmolxamw9JcnsPTT4t3SSIe0UpKQmglhew1mWN5Vjf3LSspSlKUpWV9Mf/EACwQAQABAgQFBAICAwEAAAAAAAERACExQVFhMEBxgaEgUJGxEMFw8GDR8eH/2gAIAQEAAT8Q9hz9+n+WD/CJ/ldgN4iB3a2yoNovC+n1z7ZMcJH0LGTdjaal0lhBjcLdhSFTu/PCfwSAKJgldt0N0uh2hqECgTK9zq2dKEHYKFwRLJ7RcQqyElpMFmBgYuikOLZLmr61nJ+aMWfgwc9T7bWyEyRsmTzGfGR8Cq8QujQM7qGdMs7IlMquq8Fr8Q1cWHQwNl8j2Z6iAjaX7BnSNOGtCaVuATdYE5o8l88lIuO9Y8xUrdZatwsOR5rZeyMWULXRl+qtHDnREk6PAcucAzKezJ8TWXDZhINsA/acz24cRhHrgIB7MNK9IZChhHvw7i4hMZiNw8VdvR24Hb035LOmiyWC3+2f+HCQAVMAZtPFZ3wzwHYq/I35Nb8TyYRl0uiaLTM0ZRomolxzHgwjpOBD80+eh5/LgFIXcMNrHdiZZjnZ0E9gBuesJ4SaHlbHdxctQ8SYwRAAYHDngd+Sj/kOPVWxQlWRwhuKG+r4o2UhKm/pAt0bUhSXC46hdbiUBzbltNgL9w60Tfuj0y81tXQb9UTYOuPmIp2kbhh2nZ2UqHcKHn1vA7spk0+jg4AxVcCrldMdymBuHYi6VZIOA6uTeO4ext8UCp0w+1sUlvOW2F+x7QW/DSikKOpTtyQQDrtD1h0oAdaH1g8PRcjQAXVbUfLWMG7q0UDHklKmi8X1toH4JS5oFgiYNNccPusjKvhrGKIgjJr7AzRLikHwLS5dUKt1kC2XPIf+st/SSBFEwSilugHPcx4qaGf1FqoAP9Elb8Yh8p9TFIl2PAfwfpgIgjI4c9cW/BiLCzVtV1GwG28LXNl5GYVAvRGJcw7i2RPOyAVzLDbdDB3c+SKZFWBMiOo0uNhmSYDQQnVMucWb9MNwMPcZ1jlLYXJbh8KjoucmBFYNohfiPZ5QURUJcTKliE23/Oi9+LHFcUApcgpwTd+UiHYY5VHNiy4EgNpl35pkIeN7Hmi3KrJYE1YPhc1BmP0ctLDhe+earoWBJMJjOMayt6lp+71QWI6spn31Kjnvqf7oGL6h+qclO1Wm3Wr/AKlblN+Hvv3/AA/mZny1medWZPon6oUufRayb6P+6Tg+jVyA6OmF46BkfCBkLpbO/wDPGX+bW9VuZt/Dnb2g4c8Cafw1lU8J4f8A/9k=',
		'utf8'
	);

	try {
		const filename = i['Notion Id'] + '-cover.jpeg';

		imgDataUrl = await readFile(join(ASSET_DIR, filename));
	} catch (err) {
		console.error("failed to find picture for document '" + i.props.Name?.[0] + "'");
	}

	return {
		name: i.props.Name?.[0],
		email: i.props.Email?.[0],
		pronouns: i.props.Pronouns?.[0] || null,
		tags: i.props.Roles ?? [],
		image: imgDataUrl,
		isAlumni: isAlumniStatus(i.props.Status),
		isTechstart: isTechstartStatus(i.props.Status),
		isStudent: isStudentStatus(i.props.Status),
		isStaff: isStaffStatus(i.props.Status),
		isFaculty: isFacultyStatus(i.props.Status),
		studyProgram: i.props['Study program']?.[0]
	};
};

const isStudent = (i: any) =>
	isStudentStatus(i.props.Status) && i.props['Study program']?.length > 0;

export default async function main() {
	await connectToDatabase();

	const people = JSON.parse((await readFile(JSON_PATH, 'utf-8')).toString());

	const students = people.filter(isStudent);

	const persons = await Promise.all(students.map(toPerson()));

	const mogus = await Promise.all(persons.map(UserController.createFromNotionImport));
}
