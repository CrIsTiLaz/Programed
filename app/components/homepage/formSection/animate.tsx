import React, { Suspense, useRef } from 'react';
import { Canvas, useFrame, extend } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows } from '@react-three/drei';
import { Object3D } from 'three';
import Teeth from '../../../../public/Teeth.jsx';
import '../../../../styles/global.css';

const AnimatedTeeth = () => {
    const ref = useRef<Object3D>(null);

    useFrame(() => {
        if (ref.current) {
            ref.current.rotation.y += 0.01;
        }
    });

    return <Teeth ref={ref} />;
};

export default function Animate() {
    return (
        <div>
            <Canvas>
                <ambientLight intensity={1.5} />
                <OrbitControls enableZoom={false} />
                <Suspense fallback={null}>
                    <AnimatedTeeth />
                </Suspense>
                <Environment preset='sunset' />
                <ContactShadows position={[0, -2, 0]} opacity={0.5} scale={10} blur={1} far={10} resolution={256} color="#000000" />
            </Canvas>
        </div>
    );
}
