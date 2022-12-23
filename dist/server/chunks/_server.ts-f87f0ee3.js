import { c as connectToDatabase } from './connectToDatabase-cfaa281f.js';
import { A as AssetController } from './Asset.controller-80cd85b7.js';
import './User-d88de691.js';
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
//# sourceMappingURL=_server.ts-f87f0ee3.js.map
