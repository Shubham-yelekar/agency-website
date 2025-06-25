import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import React, { useRef } from "react";
import * as THREE from "three";
// import { fadeOnBeforeCompile } from "../utils/fadeMaterial";

export function Cloud({ opacity, ...props }: any) {
  const { nodes, materials } = useGLTF("./models/clouds/model.gltf");

  return (
    <group {...props} dispose={null}>
      <mesh geometry={nodes.Mball001.geometry}>
        <meshStandardMaterial envMapIntensity={2} transparent />
      </mesh>
    </group>
  );
}

useGLTF.preload("./models/clouds/models.gltf");
