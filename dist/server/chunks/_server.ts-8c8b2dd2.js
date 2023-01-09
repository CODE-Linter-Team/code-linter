import { e as error } from './index3-bebb4fa4.js';
import { c as connectToDatabase } from './connectToDatabase-bd178207.js';
import { A as ArticleController } from './Article.controller-d9b55e78.js';
import { U as UserController } from './User.controller-435247ef.js';
import { P as Permission } from './permissions-bab9c681.js';
import 'mongoose';
import './Asset.controller-c57bd65e.js';
import './public-4ac8c09d.js';

async function GET({ locals, url, ...rest }) {
  await connectToDatabase();
  const { user } = await locals.getSession() ?? {};
  const isLoggedIn = user != null;
  const contentTags = url.searchParams.get("tags")?.split(",");
  const authors = url.searchParams.get("authors")?.split(",");
  const states = url.searchParams.get("states")?.split(",");
  const articles = await ArticleController.get({
    includeInternal: isLoggedIn,
    contentTags,
    authors,
    states
  });
  return new Response(JSON.stringify({ articles }), {
    headers: { "Content-Type": "application/json" }
  });
}
async function POST({ locals, request }) {
  await new Promise((res) => setTimeout(res, 1e3));
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
  const body = await request.json();
  const authorId = user.email;
  await ArticleController.submitArticleForReview({
    ...body,
    authorId
  });
  return new Response("{}", { headers: { "Content-Type": "application/json" }, status: 201 });
}

export { GET, POST };
//# sourceMappingURL=_server.ts-8c8b2dd2.js.map
