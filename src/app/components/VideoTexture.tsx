import { useVideoTexture } from "@react-three/drei";
import React from "react";
import { fadeOnBeforeCompileFlat } from "../utils/fadeMaterial";

const VideoTexture = ({ src }) => {
  const texture = useVideoTexture(src);
  return (
    <meshStandardMaterial
      onBeforeCompile={fadeOnBeforeCompileFlat}
      map={texture}
      toneMapped={false}
    />
  );
};

export default VideoTexture;
