import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import ModelLoader from './ModelLoader';
import { Box, OrbitControls } from '@react-three/drei';
import { useModelStore } from '../Store/ModelStore';

const CanvasWrapper = () => {
  const currentModelUrl = useModelStore((state) => state.currentModelUrl);
  return (
    <Canvas>
      <OrbitControls />
      <ambientLight intensity={0.2} />
      <directionalLight intensity={0.7} position={[1, 1, 1]} />
      <Suspense fallback={null}>
        {/* <Box>
          <meshPhongMaterial color={'red'} />
        </Box> */}
        {currentModelUrl !== '' && <ModelLoader />}
      </Suspense>
    </Canvas>
  );
};

export default CanvasWrapper;
