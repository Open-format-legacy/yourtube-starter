import { Avatar, VideoPlayer } from "../components";

export default function VideoGrid({ videos }) {
  if (!videos?.length) return;

  return (
    <ul className="p-5 grid grid-cols-4 gap-5">
      {videos.map((video) => (
        <VideoItem key={video.id} video={video} />
      ))}
    </ul>
  );
}

function VideoItem({ video }) {
  /**
   * The metadata from the subgraph are stored as key/value pairs.
   * This function finds the correct piece of metadata and returns
   * the value.
   */
  function getMetadataValue(metadata, key) {
    if (!key) return new Error("formatMetadata: key not set");
    return metadata.find((m) => m.key === key)?.value;
  }

  /**
   * If a piece of metdata is stored on IPFS is it generally prefixed with ipfs://
   * Most browsers can't read this, so we need to use a IPFS gateway service and
   * replace the start of the URL.
   */

  function transformURL(url) {
    if (!url) return;
    return url.replace("ipfs://", "https://ipfs.infura.io/ipfs/");
  }

  const name = getMetadataValue(video.metadata, "name");
  const url = getMetadataValue(video.metadata, "video");
  const description = getMetadataValue(video.metadata, "description");
  const previewImage = getMetadataValue(video.metadata, "image");

  return url ? (
    <li>
      <div className="space-y-4">
        <div className="aspect-h-3 aspect-w-4">
          <VideoPlayer
            url={transformURL(url)}
            previewImage={transformURL(previewImage)}
          />
        </div>
        <div className="space-x-2 flex items-center">
          <Avatar creator={video.creator.id} />
          <div>
            <div className="text-lg leading-6 font-medium space-y-1">
              {name}
            </div>
            {/* <div className="text-lg leading-6 font-medium space-y-1">
            {description}
          </div> */}
          </div>
        </div>
      </div>
    </li>
  ) : null;
}
