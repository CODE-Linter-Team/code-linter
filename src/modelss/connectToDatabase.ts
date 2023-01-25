import mongoose from 'mongoose';

import { SECRET_MONGODB_CONNECTION_STRING } from "$env/static/private"

export default async function connectToDatabase() {

	console.info(`connecting to mongodb at "${SECRET_MONGODB_CONNECTION_STRING}"`)

	await mongoose.connect(SECRET_MONGODB_CONNECTION_STRING, { autoIndex: false });
}
