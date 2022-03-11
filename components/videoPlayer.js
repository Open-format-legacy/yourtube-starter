import ReactPlayer from "react-player";
export default function VideoPlayer({ url, previewImage, ...rest }) {
  return (
    <ReactPlayer
      url={url}
      light={previewImage}
      width="100%"
      height="100%"
      controls
      {...rest}
    />
  );
}
