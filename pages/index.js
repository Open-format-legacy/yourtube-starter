import { gql, request } from "graphql-request";
import { useEffect, useState } from "react";
import { Header, VideoGrid } from "../components";
import { useWalletStore } from "../stores";

export default function Home() {
  const { address } = useWalletStore();
  const [videos, setVideos] = useState();

  useEffect(fetchVideos, [address]);

  const FACTORY_ID = process.env.NEXT_PUBLIC_FACTORY_ID;

  if (!FACTORY_ID)
    throw new Error(
      "Please set the NEXT_PUBLIC_FACTORY_ID environment variable."
    );

  async function fetchVideos() {
    if (address) {
      const query = gql`
        query ($factory_id: String!) {
          mediaItems(where: { factory_id: $factory_id }) {
            id
            metadata {
              key
              value
            }
            creator {
              id
            }
          }
        }
      `;

      await request(
        "https://api.thegraph.com/subgraphs/name/tinypell3ts/music-factory",
        query,
        { factory_id: FACTORY_ID }
        // { release_type: "video" }
      ).then((data) => {
        if (data.mediaItems?.length) {
          setVideos(data.mediaItems);
        }
      });
    }
  }

  return (
    <div>
      <Header />
      {videos ? (
        <VideoGrid videos={videos} />
      ) : (
        <p>No videos found.</p>
      )}
    </div>
  );
}
