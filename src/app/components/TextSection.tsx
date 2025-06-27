"use client";
import { Text } from "@react-three/drei";
import { fadeOnBeforeCompileFlat } from "../utils/fadeMaterial";

export const TextSection = ({
  text,
  anchorX,
  anchorY,
  font,
  position,
}: any) => {
  return (
    <group position={position}>
      (
      <Text
        color="white"
        anchorX={anchorX}
        anchorY={anchorY}
        fontSize={0.24}
        maxWidth={4}
        lineHeight={1.2}
        font={font}
        textAlign="center"
      >
        {text}
        <meshStandardMaterial
          color={"white"}
          emissive={"white"}
          emissiveIntensity={3}
          onBeforeCompile={fadeOnBeforeCompileFlat}
        />
      </Text>
      )
    </group>
  );
};
