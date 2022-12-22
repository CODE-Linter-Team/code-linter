import { error } from '@sveltejs/kit';

import connectToDatabase from '../../../../modelss/connectToDatabase';
import AssetController from '../../../../controllers/Asset.controller';
import UserController from '../../../../controllers/User.controller';
import Permission from '../../../../data/permissions';

import fs from "fs"

export async function GET({ locals, request, params }: any) {

    await connectToDatabase()

    const fileExtensionMatch = params.assetId.match(/^(.*).jpeg$/)

    if (fileExtensionMatch == null) {

        const asset = await AssetController.get(params.assetId)

        return new Response(JSON.stringify(asset), { headers: { "Content-Type": "application/json" }, status: 201 })
    }
    const asset = await AssetController.get(fileExtensionMatch[1])

    fs.writeFileSync("/users/linusbolls/amogus.jpeg", asset.data)

    return new Response(asset.data, { headers: { "Content-Type": "image/jpeg" }, status: 200 })
}