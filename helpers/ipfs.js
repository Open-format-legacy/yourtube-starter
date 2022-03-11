import { File, NFTStorage } from "nft.storage";

const client = new NFTStorage({
  token: process.env.NEXT_PUBLIC_NFT_STORAGE_TOKEN,
});

export async function uploadToIPFS(data) {
  if (!data) throw Error("Data is invalid");
  return await client.store(data);
}

/**
 * The function builds up a metadata object in a format accepted
 * by the uploadToIPFS function above.
 * Name, description and Image are REQUIRED
 * You can add any metadata you want here. Each file will be uploaded
 * with it's own IPFS CID linking back to the generated metadata.json.
 */
export function buildMetadata(name, description, image, video) {
  const data = {
    name,
    description,
    image: new File([image], image.name, {
      type: image.type,
    }),
    video: new File([video], video.name, {
      type: video.type,
    }),
    release_type: "video",
    factory_id: "c9f7f4d1-bc0e-4533-a02d-5fbf5b052748",
  };

  return data;
}
