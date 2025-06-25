import { Float, OrbitControls } from "@react-three/drei";
import Background from "./Background";
import { Airplane } from "./Airplane";
import { Cloud } from "./Cloud";

export const Experience = () => {
  return (
    <>
      <OrbitControls />
      <mesh>
        <Background />
        <Float floatIntensity={2} speed={2}>
          <Airplane rotation-y={Math.PI / 2} position-y={0.2} scale={0.5} />
        </Float>
        <Cloud opacity={0.5} scale={[0.3, 0.3, 0.3]} position={[-2, 1, -3]} />
      </mesh>
    </>
  );
};
