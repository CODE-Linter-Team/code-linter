import { c as connectToDatabase } from './connectToDatabase-bd178207.js';
import { b as AssetController } from './Asset.controller-c57bd65e.js';
import fs from 'fs';
import 'mongoose';
import './public-4ac8c09d.js';

async function GET({ locals, request, params }) {
  await connectToDatabase();
  const fileExtensionMatch = params.assetId.match(/^(.*).jpeg$/);
  if (fileExtensionMatch == null) {
    const asset2 = await AssetController.get(params.assetId);
    return new Response(JSON.stringify(asset2), {
      headers: { "Content-Type": "application/json" },
      status: 201
    });
  }
  const asset = await AssetController.get(fileExtensionMatch[1]);
  fs.writeFileSync("/users/linusbolls/amogus.jpeg", asset.data);
  return new Response(asset.data, { headers: { "Content-Type": "image/jpeg" }, status: 200 });
}

export { GET };
//# sourceMappingURL=_server.ts-23107e5a.js.map
