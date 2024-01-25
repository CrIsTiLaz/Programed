import React, { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows } from '@react-three/drei';
import Model from '../../../../public/Doctors_stethoscope'; // Asigurați-vă că calea este corectă
import '../../../../styles/global.css';

const AnimatedModel = () => {
    const ref = useRef();

    // Aceasta este funcția care va fi apelată la fiecare frame
    useFrame(() => {
        if (ref.current) {
            ref.current.rotation.y += 0.01; // Rotește modelul pe axa Y
        }
    });

    return <Model ref={ref} />; // Aplicați referința la model
};

export default function Animate() {
    return (
        <div>
            <Canvas>
                <ambientLight intensity={1.5} />
                <OrbitControls enableZoom={false} />
                <Suspense fallback={null}>
                    <AnimatedModel />
                </Suspense>
                <Environment preset='sunset' />
                <ContactShadows position={[0, -2, 0]} opacity={0.5} scale={10} blur={1} far={10} resolution={256} color="#000000" />
            </Canvas>
        </div>
    );
}
