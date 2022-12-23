import { e as error } from './index3-bebb4fa4.js';
import { c as connectToDatabase } from './connectToDatabase-cfaa281f.js';
import { A as AssetController } from './Asset.controller-80cd85b7.js';
import { U as UserController } from './User.controller-fe467c34.js';
import { P as Permission } from './permissions-bab9c681.js';
import 'mongoose';
import './public-4ac8c09d.js';
import './User-d88de691.js';

async function POST({ locals, request }) {
  await connectToDatabase();
  const { user } = await locals.getSession() ?? {};
  const isLoggedIn = user != null;
  if (!isLoggedIn)
    return new Response("{}", { headers: { "Content-Type": "application/json" }, status: 401 });
  const hasPermission = await UserController.hasPermissions(user.email, [
    Permission.SUBMIT_ARTICLES_FOR_REVIEW.id
  ]);
  if (!hasPermission)
    throw error(403, "missing permission: 'SUBMIT_ARTICLES_FOR_REVIEW'");
  const formData = await request.formData();
  const blobData = formData.get("data");
  const arrayBufferData = await blobData.arrayBuffer();
  const data = Buffer.from(arrayBufferData);
  const title = formData.get("title");
  const alt = formData.get("alt");
  const ownerId = user.email;
  const asset = await AssetController.create({ data, title, alt }, ownerId);
  return new Response(JSON.stringify(asset), {
    headers: { "Content-Type": "application/json" },
    status: 201
  });
}

export { POST };
//# sourceMappingURL=_server.ts-791544f9.js.map
