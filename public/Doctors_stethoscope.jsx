import React, { forwardRef } from "react";
import { useGLTF } from "@react-three/drei";

function Model(props, ref) {
  const { nodes, materials } = useGLTF("/doctors_stethoscope.gltf");
  return (
    <group ref={ref} {...props} dispose={null}>
      <group position={[-0.879, -0.627, 0]} scale={0.115}>
        <mesh
          geometry={nodes.Object_4.geometry}
          material={materials.Material}
        />
        <mesh
          geometry={nodes.Object_5.geometry}
          material={materials["Material.001"]}
        />
      </group>
    </group>
  );
}

export default forwardRef(Model);
