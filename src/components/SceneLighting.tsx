export default function SceneLighting() {
  return (
    <>
      <ambientLight />

      <directionalLight color={0xfff9ba} position={[10, 0, 5]} />

      <directionalLight color={0xfff9ba} position={[-10, 0, -5]} />
    </>
  );
}
