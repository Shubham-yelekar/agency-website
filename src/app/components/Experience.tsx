"use client";
import {
  Float,
  OrbitControls,
  PerspectiveCamera,
  Plane,
  Text,
  useScroll,
} from "@react-three/drei";
import Background from "./Background";
import { Airplane } from "./Airplane";
import { Cloud } from "./Cloud";
import { useMemo, useRef, useState, useEffect } from "react";
import { Euler, Group, Vector3 } from "three";
import * as THREE from "three";
import { useFrame, useThree } from "@react-three/fiber";
import {
  fadeOnBeforeCompile,
  fadeOnBeforeCompileFlat,
} from "../utils/fadeMaterial";
import { TextSection } from "./TextSection";
import { Speed } from "./Speed";
import { CameraObj } from "./CameraObj";
import { eventNames } from "process";
import VideoTexture from "./VideoTexture";
import ImageTexture from "./ImageTexture";

const LINE_NB_POINTS = 10000;
const CURVE_DISTANCE = 2000;
const CURVE_AHEAD_CAMERA = 0.008;
const CURVE_AHEAD_AIRPLANE = 0.02;
const AIRPLANE_MAX_ANGLE = 35;

export const Experience = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (event: MouseEvent) => {
    const { innerWidth, innerHeight } = window;
    const x = (event.clientX / innerWidth) * 2 - 1;
    const y = (event.clientY / innerHeight) * 2 + 1;
    setMousePosition({ x, y });
  };

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

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
      new THREE.Vector3(0, 2, -95),
      new THREE.Vector3(0, 2, -100),
    ],
    [],
  );

  const curve = useMemo(() => {
    return new THREE.CatmullRomCurve3(curvePoints, false, "catmullrom", 0.2);
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
      {
        position: new Vector3(0, 2, -95),
        anchorX: "center",
        anchorY: "bottom",
        text: "",
      },
      {
        position: new Vector3(0, 2, -100),
        anchorX: "center",
        anchorY: "bottom",
        text: "ARTFICIAL REALITY",
      },
    ];
  }, []);
  const elements = useMemo(
    () => [
      {
        type: "text",
        content: "WELCOME TO OUR JOURNEY",
        position: [0, 0, 0],
        anchorX: "center",
        anchorY: "bottom",
        fontSize: 0.5,
        color: "white",
      },
      {
        type: "image",
        src: "/assets/image-1.jpg",
        position: [-1.0, 0, -10],
        scale: [1.5, 1, 1],
        rotation: [0, 0.5, 0],
      },
      {
        type: "video",
        src: "/tomolot.mp4",
        position: [1.0, 0, -15],
        scale: [1.5, 1, 1],
        rotation: [0, -0.5, 0],
      },
      {
        type: "image",
        src: "/assets/image-2.jpg",
        position: [1, 0, -40],
        scale: [3, 2, 1],
        rotation: [0, Math.PI / 4, 0],
      },
    ],
    [],
  );
  const linePoints = useMemo(() => {
    return curve.getPoints(LINE_NB_POINTS);
  }, [curve]);
  const shape = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(0, -1);
    shape.lineTo(0, 1); // Bottom-right corner
    return shape;
  }, [curve]);
  const { scene } = useThree();
  const cameraGroup = useRef<THREE.Group | null>(null);
  const scroll = useScroll();
  useFrame((_state, delta) => {
    const currPointIndex = Math.min(
      Math.round(scroll.offset * (linePoints.length - 1)),
      linePoints.length - 1,
    );
    const curPoint = linePoints[currPointIndex];
    const pointAhead =
      linePoints[Math.min(currPointIndex + 1, linePoints.length - 1)] ||
      new THREE.Vector3();

    const xDisplacement = (pointAhead.x - curPoint.x) * 80;
    const direction = new THREE.Vector3()
      .subVectors(pointAhead, curPoint)
      .normalize();
    console.log(direction);

    const angleRotation =
      (xDisplacement < 0 ? 1 : -1) *
      Math.min(Math.abs(xDisplacement), Math.PI / 2);

    // const targetAirplaneQuaternion = new THREE.Quaternion().setFromEuler(
    //   new THREE.Euler(
    //     airplane.current.rotation.x,
    //     airplane.current.rotation.y,
    //     angleRotation,
    //   ),
    // );

    const targetCameraQuaternion = new THREE.Quaternion().setFromEuler(
      new THREE.Euler(
        Math.atan2(direction.y, Math.sqrt(direction.x ** 2 + direction.z ** 4)),
        Math.atan2(-direction.x, -direction.z),
        0,
      ),
    );
    const mouseOffset = new Vector3(
      mousePosition.x * 0.1,
      mousePosition.y * 0.02,
      0,
    );
    // airplane.current.quaternion.slerp(targetAirplaneQuaternion, delta * 2);
    cameraGroup.current?.quaternion.slerp(targetCameraQuaternion, delta * 2);
    cameraGroup.current?.position.lerp(
      curPoint.clone().add(mouseOffset),
      delta * 24,
    );

    // if (scene.environment) {
    //   const rotation = new THREE.Euler(
    //     mousePosition.y * 0.2,
    //     mousePosition.x * 0.2,
    //     0,
    //   );
    //   scene.environment.rotation.
    // }
  });
  const airplane = useRef<THREE.Group | null>(null);
  return (
    <>
      {/* <OrbitControls enableZoom={false} /> */}
      <directionalLight position={[0, 3, 1]} intensity={2} />
      <ambientLight intensity={0.5} />
      <Background />
      <group ref={cameraGroup}>
        {/* <Speed /> */}
        <PerspectiveCamera position={[0, 0, 5]} fov={30} makeDefault />
        {/* <group ref={airplane}>
          <Float floatIntensity={2} speed={1}>
            <Airplane rotation-y={Math.PI / 2} position-y={0.2} scale={0.2} />
          </Float>
        </group> */}
      </group>

      {/* {textSections.map((textSection, index) => (
        <TextSection
          text={textSection.text}
          position={textSection.position}
          font={font}
          key={index}
        />
      ))} */}
      {elements.map((element, index) => {
        switch (element.type) {
          case "text":
            return (
              <TextSection
                text={element.content}
                position={element.position}
                font={font}
                key={index}
              ></TextSection>
            );
          case "image":
            return (
              <ImageTexture
                src={element.src}
                key={index}
                position={element.position as [number, number, number]}
                scale={element.scale as [number, number, number]}
                rotation={element.rotation as [number, number, number]}
              />
            );
          case "video":
            return (
              <Plane
                key={index}
                position={element.position as [number, number, number]}
                scale={element.scale as [number, number, number]}
                rotation={element.rotation as [number, number, number]}
              >
                <VideoTexture src={element.src} />
              </Plane>
            );
          default:
            return null;
        }
      })}
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
      <group position-y={-0.5}>
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
      </group>

      {/* <Cloud
        scale={[0.2, 0.2, 0.2]}
        position={[-1.5, 0.2, -50]}
        opacity={0.4}
      /> */}
      {/* <Plane position={[0, 0, 0]} scale={[2, 1, 1]} rotation={[0, 0, 0]}>
        <VideoTexture src={"/tomolot.mp4"} />
      </Plane> */}
      {/* <Plane position={[0, 0, 0]} scale={[1, 1, 1]} rotation={[0, 0, 0]}>
        <ImageTexture src={"/assets/image-1.jpg"} />
      </Plane> */}

      {/* <Float
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
      </Float> */}
    </>
  );
};
