import { useCursor } from "@react-three/drei";
import { MeshProps, ThreeEvent } from "@react-three/fiber";
import { useRef, useState } from "react";
import { BufferGeometry, Mesh, MeshStandardMaterial, Object3D } from "three";

export default function Room(props: MeshProps) {
  const ref = useRef<Mesh>(null);
  const [isHovered, setIsHovered] = useState(false);

  useCursor(isHovered);

  const onPointerOver = (event: ThreeEvent<PointerEvent>) => {
    event.stopPropagation();
    setIsHovered(true);
  };

  const onPointerOut = (event: ThreeEvent<PointerEvent>) => {
    event.stopPropagation();
    setIsHovered(false);
  };

  const material = new MeshStandardMaterial({ color: "#ff0000" });

  return (
    <mesh
      {...props}
      ref={ref}
      material={material}
      onPointerOver={onPointerOver}
      onPointerOut={onPointerOut}
    />
  );
}
