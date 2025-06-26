import { useGLTF } from "@react-three/drei";

import * as THREE from "three";

export function CameraObj(props: any) {
  const { nodes, materials } = useGLTF("/models/camera/Camera.glb");

  return (
    <group {...props} dispose={null}>
      <mesh
        geometry={nodes.Camera_mesh.geometry}
        material={materials.Camera_mat1}
      />
    </group>
  );
}

useGLTF.preload("/models/camera/Camera.glb");
