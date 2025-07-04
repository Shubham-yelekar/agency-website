/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import React, { useRef } from "react";
import * as THREE from "three";
const HELIX_SPEED = 9;
export function Airplane(props: any) {
  const { nodes, materials } = useGLTF("/models/airplane/model.glb");

  const helix = useRef<THREE.Mesh>(null);
  useFrame((_state, delta) => {
    if (helix.current) {
      helix.current.rotation.x += delta * HELIX_SPEED;
    }
  });
  return (
    <group {...props} dispose={null}>
      <mesh
        geometry={nodes.PUSHILIN_Plane_Circle000.geometry}
        material={materials.plane}
      />
      <mesh
        ref={helix}
        geometry={nodes.PUSHILIN_Plane_Helix.geometry}
        material={materials.plane}
        position={[1.09, 0.23, 0]}
      />
    </group>
  );
}

useGLTF.preload("/models/airplane/model.glb");
