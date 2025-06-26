import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import React, { useRef } from "react";
import * as THREE from "three";
import { fadeOnBeforeCompile } from "../utils/fadeMaterial";

export function Cloud({ opacity, ...props }: any) {
  const { nodes, materials } = useGLTF("./models/clouds/model.gltf");
  const materialRef = useRef<THREE.MeshStandardMaterial | null>(null);

  useFrame(() => {
    if (materialRef.current) {
      materialRef.current.opacity = 0.5; // Example usage
    }
  });

  return (
    <group {...props} dispose={null}>
      <mesh geometry={nodes.Mball001.geometry}>
        <meshStandardMaterial
          ref={materialRef}
          onBeforeCompile={fadeOnBeforeCompile}
          envMapIntensity={2}
          transparent
          opacity={opacity}
        />
      </mesh>
    </group>
  );
}

useGLTF.preload("./models/clouds/model.gltf");
