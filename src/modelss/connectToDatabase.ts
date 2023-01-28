import mongoose from 'mongoose';

import { SECRET_MONGODB_CONNECTION_STRING } from '$env/static/private';

export default async function connectToDatabase() {
	await mongoose.connect(SECRET_MONGODB_CONNECTION_STRING, { autoIndex: false });
}
