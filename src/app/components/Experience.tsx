"use client";
import {
  Float,
  OrbitControls,
  PerspectiveCamera,
  Text,
  useScroll,
} from "@react-three/drei";
import Background from "./Background";
import { Airplane } from "./Airplane";
import { Cloud } from "./Cloud";
import { useMemo, useRef } from "react";
import { Euler, Group, Vector3 } from "three";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import {
  fadeOnBeforeCompile,
  fadeOnBeforeCompileFlat,
} from "../utils/fadeMaterial";
import { TextSection } from "./TextSection";
import { Speed } from "./Speed";
import { CameraObj } from "./CameraObj";

const LINE_NB_POINTS = 10000;
const CURVE_DISTANCE = 2000;
const CURVE_AHEAD_CAMERA = 0.008;
const CURVE_AHEAD_AIRPLANE = 0.02;
const AIRPLANE_MAX_ANGLE = 35;

export const Experience = () => {
  const font = useMemo(() => {
    return "/fonts/Unbounded/Unbounded-Regular.ttf"; // Path to your font file
  }, []);

  const curvePoints = useMemo(
    () => [
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(0, 0, -10),
      new THREE.Vector3(0, 0, -20),
      new THREE.Vector3(0, 0, -30),
      new THREE.Vector3(0, 0, -40),
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

  const textSections = useMemo(() => {
    return [
      {
        position: new Vector3(0, 0, 0),
        anchorX: "center",
        anchorY: "bottom",
        text: "WELCOME TO OUR JOURNEY",
      },
      {
        position: new Vector3(1, 0, -10),
        anchorX: "right",
        anchorY: "bottom",
        text: "Year 2004",
      },
      {
        position: new Vector3(-1, 0, -20),
        anchorX: "right",
        anchorY: "bottom",
        text: "Year 2005",
      },
      {
        position: new Vector3(1, 0, -40),
        anchorX: "right",
        anchorY: "bottom",
        text: "Year 2006",
      },
      {
        position: new Vector3(-1, 0, -50),
        anchorX: "right",
        anchorY: "bottom",
        text: "Year 2007",
      },
      {
        position: new Vector3(1, 0, -60),
        anchorX: "right",
        anchorY: "bottom",
        text: "Year 2008",
      },
      {
        position: new Vector3(-1, 0, -70),
        anchorX: "right",
        anchorY: "bottom",
        text: "Year 2009",
      },
      {
        position: new Vector3(1, 0, -80),
        anchorX: "right",
        anchorY: "bottom",
        text: "Year 2010",
      },
      {
        position: new Vector3(-1, 0, -90),
        anchorX: "right",
        anchorY: "bottom",
        text: "Year 2011",
      },
    ];
  }, []);

  const linePoints = useMemo(() => {
    return curve.getPoints(LINE_NB_POINTS);
  }, [curve]);
  const shape = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(0, -1);
    shape.lineTo(0, 1); // Bottom-right corner
    return shape;
  }, [curve]);
  const cameraGroup = useRef<THREE.Group | null>(null);
  const scroll = useScroll();
  useFrame((_state, delta) => {
    const currPointIndex = Math.min(
      Math.round(scroll.offset * linePoints.length),
      linePoints.length - 1,
    );
    const curPoint = linePoints[currPointIndex] || new THREE.Vector3();
    const pointAhead =
      linePoints[Math.min(currPointIndex + 1, linePoints.length - 1)] ||
      new THREE.Vector3();

    const xDisplacement = (pointAhead.x - curPoint.x) * 80;

    const angleRotation =
      (xDisplacement < 0 ? 1 : -1) *
      Math.min(Math.abs(xDisplacement), Math.PI / 3);

    // const targetAirplaneQuaternion = new THREE.Quaternion().setFromEuler(
    //   new THREE.Euler(
    //     airplane.current.rotation.x,
    //     airplane.current.rotation.y,
    //     angleRotation,
    //   ),
    // );
    // const targetCameraQuaternion = new THREE.Quaternion().setFromEuler(
    //   new THREE.Euler(
    //     cameraGroup.current.rotation.x,
    //     angleRotation,
    //     cameraGroup.current.rotation.z,
    //   ),
    // );
    // airplane.current.quaternion.slerp(targetAirplaneQuaternion, delta * 2);
    // cameraGroup.current?.quaternion.slerp(targetCameraQuaternion, delta * 2);
    cameraGroup.current?.position.lerp(curPoint, delta * 50);
  });
  const airplane = useRef<THREE.Group | null>(null);
  return (
    <>
      {/* <OrbitControls enableZoom={false} /> */}
      <directionalLight position={[0, 3, 1]} intensity={0.1} />
      <Background />
      <group ref={cameraGroup}>
        <Speed />
        <PerspectiveCamera position={[0, 0, 5]} fov={30} makeDefault />
        {/* <group ref={airplane}>
          <Float floatIntensity={2} speed={1}>
            <Airplane rotation-y={Math.PI / 2} position-y={0.2} scale={0.2} />
          </Float>
        </group> */}
      </group>

      {textSections.map((textSection, index) => (
        <TextSection
          text={textSection.text}
          position={textSection.position}
          font={font}
          key={index}
        />
      ))}
      {/* <group position={[0, 0, 0]}>
        <Text
          color="white"
          anchorX={"left"}
          anchorY="bottom"
          fontSize={0.52}
          maxWidth={2.5}
          lineHeight={1}
          font={font}
        >
          New Text
          <meshStandardMaterial
            color={"white"}
            onBeforeCompile={fadeOnBeforeCompileFlat}
          />
        </Text>
      </group> */}
      {/* <group position-y={-0.5}>
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
          <meshStandardMaterial
            color={"white"}
            opacity={0.5}
            envMapIntensity={2}
            transparent
            onBeforeCompile={fadeOnBeforeCompile}
          />
        </mesh>
      </group> */}

      {/* <Cloud
        scale={[0.2, 0.2, 0.2]}
        position={[-1.5, 0.2, -50]}
        opacity={0.4}
      /> */}
      <Float
        floatIntensity={0.2}
        speed={1}
        rotationIntensity={0.2}
        floatingRange={[-1, 1]}
      >
        <CameraObj
          scale={[0.2, 0.2, 0.2]}
          position={[1.5, 0.0, -20]}
          opacity={0.4}
        />
      </Float>
    </>
  );
};
