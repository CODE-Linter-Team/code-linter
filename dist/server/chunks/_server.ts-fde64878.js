import { e as error } from './index3-bebb4fa4.js';
import { A as ArticleController } from './Article.controller-d9b55e78.js';
import { U as UserController } from './User.controller-435247ef.js';
import { P as Permission } from './permissions-bab9c681.js';
import './Asset.controller-c57bd65e.js';
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
  await ArticleController.rejectArticle(params.articleId, user.email);
  return new Response("{ ok: true }");
}

export { POST };
//# sourceMappingURL=_server.ts-fde64878.js.map
