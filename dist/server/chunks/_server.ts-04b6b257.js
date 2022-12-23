import { A as ArticleController } from './Article.controller-9f6d2af7.js';
import './User-d88de691.js';
import 'mongoose';
import './User.controller-fe467c34.js';
import './public-4ac8c09d.js';

async function GET({ params, locals }) {
  const { user = null } = await locals.getSession() ?? {};
  const isSignedIn = user != null;
  const fingerPrint = Math.random().toString();
  const article = await ArticleController.read(params.articleId, isSignedIn, fingerPrint);
  return new Response(JSON.stringify({ article }), { headers: { "Content-Type": "application/json" } });
}

export { GET };
//# sourceMappingURL=_server.ts-04b6b257.js.map
