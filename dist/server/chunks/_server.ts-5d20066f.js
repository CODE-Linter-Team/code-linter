import { U as UserController } from './User.controller-435247ef.js';
import { P as Permission } from './permissions-bab9c681.js';
import { c as connectToDatabase } from './connectToDatabase-bd178207.js';
import { U as User } from './Asset.controller-c57bd65e.js';
import 'mongoose';
import './public-4ac8c09d.js';

async function GET({ locals }) {
  const DEFAULT_PERMISSIONS = [Permission.SUBMIT_ARTICLES_FOR_REVIEW.id];
  await connectToDatabase();
  const { user } = await locals.getSession() ?? {};
  if (user == null) {
    return new Response(
      JSON.stringify({
        isSignedIn: false,
        wasJustCreated: false,
        me: null
      }),
      { headers: { "Content-Type": "application/json" } }
    );
  }
  const userDoc = await User.findOne({ email: user?.email });
  if (userDoc == null) {
    const newUser = new User({
      ...user,
      permissions: DEFAULT_PERMISSIONS
    });
    await newUser.save();
    const { permissions: permissions2, name: name2, email: email2, image: image2 } = newUser;
    const articleInfo2 = await UserController.getArticleInfo(email2);
    const me2 = { permissions: permissions2, name: name2, email: email2, image: image2, articleInfo: articleInfo2 };
    return new Response(JSON.stringify({ isSignedIn: true, wasJustCreated: true, me: me2 }), {
      headers: { "Content-Type": "application/json" }
    });
  }
  const { permissions, name, email, image } = userDoc;
  const articleInfo = await UserController.getArticleInfo(email);
  const me = { permissions, name, email, image, articleInfo };
  return new Response(JSON.stringify({ isSignedIn: true, wasJustCreated: false, me }), {
    headers: { "Content-Type": "application/json" }
  });
}

export { GET };
//# sourceMappingURL=_server.ts-5d20066f.js.map
