"use client";
import {
  Float,
  OrbitControls,
  PerspectiveCamera,
  useScroll,
} from "@react-three/drei";
import Background from "./Background";
import { Airplane } from "./Airplane";
import { Cloud } from "./Cloud";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";

const LINE_NB_POINTS = 10000;
const CURVE_DISTANCE = 2000;
const CURVE_AHEAD_CAMERA = 0.008;
const CURVE_AHEAD_AIRPLANE = 0.02;
const AIRPLANE_MAX_ANGLE = 35;

export const Experience = () => {
  const curvePoints = useMemo(
    () => [
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(0, 0, -10),
      new THREE.Vector3(5, 0, -20),
      new THREE.Vector3(2, 0, -30),
      new THREE.Vector3(-4, 0, -40),
      new THREE.Vector3(0, 0, -50),
      new THREE.Vector3(0, 0, -60),
      new THREE.Vector3(0, 0, -70),
      new THREE.Vector3(0, 0, -80),
      new THREE.Vector3(0, 0, -90),
      new THREE.Vector3(0, 0, -100),
    ],
    [],
  );

  const curve = useMemo(() => {
    return new THREE.CatmullRomCurve3(curvePoints, false, "catmullrom", 0.8);
  }, []);

  const linePoints = useMemo(() => {
    return curve.getPoints(LINE_NB_POINTS);
  }, [curve]);
  const shape = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(0, -0.05);
    shape.lineTo(0, 0.05); // Bottom-right corner
    return shape;
  }, [curve]);
  const cameraGroup = useRef<THREE.Group | null>(null);
  const scroll = useScroll();
  useFrame((_state, delta) => {
    const currPointIndex = Math.min(
      Math.round(scroll.offset * linePoints.length),
      linePoints.length,
    );
    const curPoint = linePoints[currPointIndex];
    const pointAhead =
      linePoints[(Math.min(currPointIndex + 1), linePoints.length - 1)];
    const xDisplacement = (pointAhead.x - curPoint.x) * 80;
    const angleRotation =
      (xDisplacement < 0 ? 1 : -1) *
      Math.min(Math.abs(xDisplacement), Math.PI / 3);

    const targetAirplaneQuaternion = new THREE.Quaternion().setFromEuler(
      new THREE.Euler(
        airplane.current.rotation.x,
        airplane.current.rotation.y,
        angleRotation,
      ),
    );
    const targetCameraQuaternion = new THREE.Quaternion().setFromEuler(
      new THREE.Euler(
        cameraGroup.current.rotation.x,
        angleRotation,
        cameraGroup.current.rotation.z,
      ),
    );
    airplane.current.quaternion.slerp(targetAirplaneQuaternion, delta * 2);
    // cameraGroup.current?.quaternion.slerp(targetCameraQuaternion, delta * 2);
    cameraGroup.current?.position.lerp(curPoint, delta * 50);
  });
  const airplane = useRef<THREE.Group | null>(null);
  return (
    <>
      {/* <OrbitControls enableZoom={false} /> */}
      <group ref={cameraGroup}>
        <Background />
        <PerspectiveCamera position={[0, 0, 5]} fov={30} makeDefault />
        <group ref={airplane}>
          <Float floatIntensity={2} speed={1}>
            <Airplane rotation-y={Math.PI / 2} position-y={0.2} scale={0.2} />
          </Float>
        </group>
      </group>

      <group position-y={-2}>
        <mesh>
          <extrudeGeometry
            args={[
              shape,
              {
                steps: LINE_NB_POINTS,
                bevelEnabled: false,
                extrudePath: curve,
              },
            ]}
          />
          <meshStandardMaterial color={"white"} opacity={0.7} transparent />
        </mesh>
      </group>

      <Cloud opacity={0.5} scale={[0.3, 0.3, 0.3]} position={[-2, 1, -3]} />
    </>
  );
};
