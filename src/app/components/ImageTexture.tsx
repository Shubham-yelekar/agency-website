import React from "react";
import { extend } from "@react-three/fiber";
import { Image, Plane } from "@react-three/drei";
import { easing, geometry } from "maath";
import * as THREE from "three";
import { fadeOnBeforeCompileFlat } from "../utils/fadeMaterial";

const ImageTexture = ({ src, position, scale, rotation }) => {
  return (
    <Plane position={position} scale={scale} rotation={rotation}>
      {/* <Image url={src} /> */}
      <meshStandardMaterial
        onBeforeCompile={fadeOnBeforeCompileFlat}
        map={new THREE.TextureLoader().load(src)}
      />
    </Plane>
  );
};

export default ImageTexture;
