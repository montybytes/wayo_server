import { GizmoHelper, GizmoViewport } from "@react-three/drei";

export default function SceneHelpers() {
  return (
    <>
      <gridHelper
        visible={true}
        args={[100, 50]}
        // rotation={[Math.PI / 2, 0, 0]}
      />

      <GizmoHelper alignment="top-right" children={<GizmoViewport />} />
    </>
  );
}
