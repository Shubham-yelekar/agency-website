import { Environment, Sphere } from "@react-three/drei";
import { Gradient, LayerMaterial } from "lamina";
import React from "react";
import * as THREE from "three";
const Background = () => {
  return (
    <>
      <Environment
        resolution={1080}
        files="/citrus_orchard_puresky_2k.hdr"
        // preset="night"
        background
      />
      <Sphere scale={[100, 100, 100]} rotation-y={Math.PI / 2}>
        {/* <LayerMaterial color={"#ffffff"} side={THREE.BackSide}>
          <Gradient
            colorA={"#03001C"}
            colorB={"#2D033B"}
            axes={"y"}
            start={0}
            end={-0.5}
          />
        </LayerMaterial> */}
      </Sphere>
    </>
  );
};

export default Background;
