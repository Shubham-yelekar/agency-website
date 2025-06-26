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
        fontSize={0.2}
        maxWidth={2}
        lineHeight={1.2}
        font={font}
        textAlign="center"
      >
        {text}
        <meshStandardMaterial
          color={"white"}
          onBeforeCompile={fadeOnBeforeCompileFlat}
        />
      </Text>
      )
    </group>
  );
};
