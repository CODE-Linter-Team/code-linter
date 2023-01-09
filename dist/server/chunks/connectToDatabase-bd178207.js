import mongoose from 'mongoose';

const AUTH_SECRET = "amongobus";
const SECRET_GOOGLE_ID = "34788858697-r8ehr0qfe99md69sl3h2m8tmshgjhamh.apps.googleusercontent.com";
const SECRET_GOOGLE_SECRET = "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";
const SECRET_MONGODB_CONNECTION_STRING = "mongodb://localhost:27017/suuus";
const SECRET_SERVICE_AUTH_SECRET = "MY_STRONG_SECRET";
async function connectToDatabase() {
  await mongoose.connect(SECRET_MONGODB_CONNECTION_STRING, { autoIndex: false });
}

export { AUTH_SECRET as A, SECRET_GOOGLE_ID as S, SECRET_GOOGLE_SECRET as a, SECRET_SERVICE_AUTH_SECRET as b, connectToDatabase as c };
//# sourceMappingURL=connectToDatabase-bd178207.js.map
