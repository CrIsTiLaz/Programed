import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";

export default function Model(props) {
  const groupRef = useRef();
  const { nodes, materials } = useGLTF("/teeth.gltf");

  // Adaugă o rotație continuă
  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.01; // Ajustează viteza de rotație
    }
  });

  return (
    <group ref={groupRef} {...props} dispose={null}>
      <mesh
        geometry={nodes.Object_2.geometry}
        material={materials.material}
        rotation={[-Math.PI / 2, 0, 0]}
      />
    </group>
  );
}

useGLTF.preload("/teeth.gltf");
