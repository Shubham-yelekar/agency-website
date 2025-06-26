"use client";
import React from "react";
import { Canvas } from "@react-three/fiber";
import { Experience } from "../components/Experience";
import { ScrollControls } from "@react-three/drei";
import {
  Bloom,
  DepthOfField,
  EffectComposer,
  Noise,
  Vignette,
} from "@react-three/postprocessing";

const page = () => {
  return (
    <>
      <Canvas
        camera={{
          position: [0, 0, 5],
          fov: 30,
        }}
        style={{ height: "100vh", width: "100%" }}
      >
        <color attach="background" args={["#ececec"]} />
        <ScrollControls pages={20} damping={0.5}>
          <Experience />
        </ScrollControls>
        <EffectComposer>
          <Noise opacity={0.02} />
        </EffectComposer>
      </Canvas>
    </>
  );
};

export default page;
