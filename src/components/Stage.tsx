import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import SceneHelpers from "./SceneHelpers";
import SceneLighting from "./SceneLighting";

export default function Stage() {
  return (
    <>
      <SceneLighting />
      <SceneHelpers />
      <OrbitControls
        makeDefault
        minDistance={50}
        maxDistance={300}
        minPolarAngle={0}
        maxPolarAngle={Math.PI / 2.5}
      />
      <PerspectiveCamera makeDefault position={[0, 120, 120]} fov={20} />
    </>
  );
}
