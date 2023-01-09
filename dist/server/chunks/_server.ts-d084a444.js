import { A as ArticleController } from './Article.controller-d9b55e78.js';
import './Asset.controller-c57bd65e.js';
import 'mongoose';
import './public-4ac8c09d.js';
import './User.controller-435247ef.js';
import './permissions-bab9c681.js';

async function GET({ params, locals }) {
  const { user = null } = await locals.getSession() ?? {};
  const isSignedIn = user != null;
  const fingerPrint = Math.random().toString();
  const article = await ArticleController.read(params.articleId, isSignedIn, fingerPrint);
  return new Response(JSON.stringify({ article }), { headers: { "Content-Type": "application/json" } });
}

export { GET };
//# sourceMappingURL=_server.ts-d084a444.js.map
