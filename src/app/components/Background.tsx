import { Environment, Sphere } from "@react-three/drei";
import { Gradient, LayerMaterial } from "lamina";
import React, { useMemo } from "react";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader";
import * as THREE from "three";
const Background = () => {
  const texture = useMemo(() => {
    const loader = new RGBELoader();
    return loader.load("/citrus_orchard_puresky_2k.hdr", (hdrTexture) => {
      hdrTexture.mapping = THREE.EquirectangularReflectionMapping; // Set mapping for HDRI
      return hdrTexture;
    });
  }, []);
  console.log(texture);

  return (
    <>
      <Sphere scale={[500, 500, 500]}>
        <meshStandardMaterial
          map={texture}
          envMapIntensity={2}
          side={THREE.BackSide}
        />
      </Sphere>
    </>
  );
};

export default Background;
