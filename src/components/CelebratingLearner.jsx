import React, { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, useGLTF, Environment, Center } from '@react-three/drei'

const Model = () => {
  const { scene } = useGLTF('/Scene/scene.gltf') // Place your model here (in public folder)
  return (
    <Center>
      <primitive object={scene} scale={0.25} /> {/* Adjust scale to fit your layout */}
    </Center>
  )
}

const CelebratingLearner = () => {
  return (
    <div className="w-full h-64 md:h-80 lg:h-96 relative">
      <Canvas camera={{ position: [3, 2, 5], fov: 45 }}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <Suspense fallback={null}>
          <Model />
          <OrbitControls enableZoom={false} enablePan={false} />
          <Environment preset="city" />
        </Suspense>
      </Canvas>
    </div>
  )
}

export default CelebratingLearner ;


