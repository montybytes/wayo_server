"use client";

import {
  Bounds,
  Gltf,
  MapControls,
  OrthographicCamera,
  PerspectiveCamera,
  Sky,
  useGLTF,
} from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useEffect, useState } from "react";

useGLTF.preload("/models/model.gltf");

export default function MallViewerPage() {
  const { scenes } = useGLTF("/models/model.gltf");

  const [currentFloor, setCurrentFloor] = useState(0);
  const [show3D, setShow3D] = useState<boolean>(false);

  const toggleViewMode = () => setShow3D(!show3D);

  const onChangeFloor = (event: Event) => {
    let floor = (event as CustomEvent).detail["floor"];
    setCurrentFloor(floor);
  };

  useEffect(() => {
    window.addEventListener("toggleViewMode", toggleViewMode);
    window.addEventListener("changeFloor", onChangeFloor);

    return () => {
      window.removeEventListener("toggleViewMode", toggleViewMode);
      window.removeEventListener("changeFloor", onChangeFloor);
    };
  });

  return (
    <Canvas frameloop="demand">
      <ambientLight />

      <hemisphereLight color={0xfffffff} groundColor={0x000000} />

      {show3D ? (
        <PerspectiveCamera makeDefault position={[0, 120, 120]} fov={50} />
      ) : (
        <OrthographicCamera makeDefault position={[0, 120, 0]} />
      )}

      <MapControls
        makeDefault
        enableRotate={show3D == true}
        minDistance={95}
        minZoom={2}
        maxZoom={20}
        minPolarAngle={0}
        maxPolarAngle={Math.PI / 2.5}
      />

      <Bounds fit clip observe>
        <primitive object={scenes[currentFloor]} />
      </Bounds>
    </Canvas>
  );
}
