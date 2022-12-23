import { e as error } from './index3-bebb4fa4.js';
import { A as ArticleController } from './Article.controller-9f6d2af7.js';
import { U as UserController } from './User.controller-fe467c34.js';
import { P as Permission } from './permissions-bab9c681.js';
import './User-d88de691.js';
import 'mongoose';
import './public-4ac8c09d.js';

async function POST({ params, locals }) {
  await new Promise((res) => setTimeout(res, 1e3));
  const { user } = await locals.getSession();
  if (user == null)
    throw error(401, "login required");
  const hasPermission = await UserController.hasPermissions(user.email, [
    Permission.PUBLISH_ARTICLES.id
  ]);
  if (!hasPermission)
    throw error(403, "missing permission: 'PUBLISH_ARTICLES'");
  await ArticleController.publishArticle(params.articleId, user.email);
  return new Response("{ ok: true }");
}

export { POST };
//# sourceMappingURL=_server.ts-50760530.js.map
