import React, { useRef } from 'react';
import { Canvas, useFrame } from 'react-three-fiber';
import { Box } from 'drei';

const Cube = () => {
  const cubeRef = useRef();

  useFrame(() => {
    if (cubeRef.current) {
      cubeRef.current.rotation.x += 0.01;
      cubeRef.current.rotation.y += 0.01;
    }
  });

  return (
    <Box ref={cubeRef} args={[1, 1, 1]}>
      <meshStandardMaterial color="red" />
    </Box>
  );
};

const Cube2 = () => {
  return (
    <Canvas>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <Cube />
    </Canvas>
  );
};

export default Cube2;
